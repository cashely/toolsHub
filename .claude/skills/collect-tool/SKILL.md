---
name: collect-tool
description: 当用户给出一个资源/工具网址，希望把它收录、收藏或整理进本导航站（cc-nav）时使用。触发词：收录、收藏、添加工具/网站、整理这个网址、加到导航 + URL。
metadata:
  scope: project
---

# Collect Tool（收录网址到本站）

## 用途

把用户给的一个网址，变成本站一个**通过校验的工具条目**：用本地 `ego-browser` 打开网址、提取产品信息、归入现有分类、生成 `tools/<slug>.md`，并跑通内容校验。

**不要**用 curl / 内置 fetch 抓页面——必须走 ego-browser（可复用用户已登录态、能点开二级页面核实定价/GitHub）。

不适用：网址无法访问、非具体产品（纯文章/单页宣传）、或用户只是想读一下网页内容而不收录。

## 工作流程

1. **读权威数据（别信记忆）**：读 `data/categories.yaml`、`data/tags.yaml`；扫一眼 `tools/` 按域名/名称确认**未重复收录**。
2. **浏览器调研**：调用全局 `ego-browser` skill 获取当前版本用法，用一个 TaskSpace 打开目标网址，`snapshot()` + `evaluate()` 提取信息；必要时再访问 `/pricing`、`/about`、对应 GitHub 仓库核实收费与开源属性。
3. **归类判定**：选出分类（可多个，主分类放第一个）、标签、收费模式、平台、语言。
4. **生成文件**：按下方模板写 `tools/<slug>.md`，正文补齐介绍/功能/场景/资源。
5. **校验**：运行 `npm run validate`，必须通过；按报错改到通过为止。
6. **收尾**：向用户汇报文件路径、分类、收费、平台；让 ego TaskSpace 结束（`finish({ keep: [] })`，仅调用一次）。若用户指定了某个专题，再把该工具 `id` 追加进对应 `collections/*.md` 的 `tools` 列表。

信息不足以判定收费/平台时：要么 `handOff()` 请用户补充，要么先存 `status: draft`，不要编造。

## 需要收集的信息

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 是 | 固定 `tool` |
| `id` | 是 | kebab-case，全站唯一，通常 = `slug` |
| `name` | 是 | 产品名 |
| `slug` | 是 | kebab-case，文件名即 `<slug>.md` |
| `title` | 是 | `{name} - {一句中文卖点}` |
| `description` | 是 | 中文一句话，**10–120 字**（建议 50–100） |
| `website` | 是 | 给定网址，去掉 utm 等追踪参数 |
| `github` | 是 | 仓库 URL，没有则 `null` |
| `categories` | 是 | ≥1 个，格式 `顶级id/子类id`，必须存在于 `categories.yaml` |
| `tags` | 否 | 必须存在于 `tags.yaml` |
| `pricing.model` | 是 | 枚举见下 |
| `pricing.priceUrl` | 否 | 定价页 URL，没有则 `null` |
| `platforms` | 是 | 枚举子集，至少按实际形态给（网页端多为 `web`） |
| `openSource` | 是 | 布尔，依据是否有公开开源仓库 |
| `status` | 是 | 通常 `published`；信息不全用 `draft` |
| `featured` | 是 | 默认 `false`，除非用户要求推荐 |
| `developer` | 否 | 公司/团队名 |
| `language` | 否 | 界面语言代码，如 `zh`、`en` |
| `logo` | 否 | `public` 下路径（如 `/logos/xx.png`），需文件真实存在；无则省略 |
| `createdAt` / `updatedAt` | 是 | 今天，`YYYY-MM-DD` |

## 枚举速查

**pricing.model**
- `free` 完全免费 · `freemium` 免费额度+付费升级（最常见）· `paid` 仅付费
- `subscription` 订阅制 · `open-core` 开源核心+商业版 · `unknown` 无法确定

**platforms**：`web` `macos` `windows` `linux` `ios` `android` `cli` `api` `browser-extension`

**status**：`draft` `review` `published` `archived`

## 分类地图（速查，以 data/categories.yaml 为准）

| 顶级 | 子类 id |
| --- | --- |
| `ai` | ai-chat · ai-agent · ai-coding · ai-image · ai-video · ai-audio |
| `development` | ide · code-hosting · frontend · backend · database · api · devops |
| `design` | ui-design · prototyping · image · video · 3d · assets |
| `productivity` | notes · docs · project-management · collaboration · automation · time |
| `marketing` | seo · social-media · analytics · email · ads |
| `education` | courses · coding-learning · language · knowledge |
| `data` | viz · collection · search-engine · research |
| `infrastructure` | cloud · server · cdn · storage · monitoring · security |
| `utilities` | converter · calculator · maps · file · life |
| `business` | ecommerce · payments · crm · saas · finance |

可用标签（`data/tags.yaml`）：ai-coding、agent、code-editor、open-source、no-code、note-taking、automation、collaboration、cloud、api、design、free。

## ego-browser 信息提取（范例）

浏览器机制（TaskSpace/round/选择器/finish 规则）以 `ego-browser` skill 输出为准。下面是一次提取常用元信息的脚本（macOS 用 heredoc）：

```bash
ego-browser nodejs <<'EOF'
const URL = "https://example.com"; // 替换为目标网址
const task = await taskSpace("collect-tool");
const page = task.page("p1");
await page.goto(URL);
await page.waitForLoadState("load");

const meta = await page.evaluate(() => {
  const q = (s) => document.querySelector(s)?.getAttribute("content")?.trim() || null;
  const hrefs = [...document.querySelectorAll("a[href]")].map((a) => a.href);
  return {
    title: document.title,
    siteName: q('meta[property="og:site_name"]'),
    ogTitle: q('meta[property="og:title"]'),
    description: q('meta[name="description"]') ?? q('meta[property="og:description"]'),
    image: q('meta[property="og:image"]'),
    github: hrefs.find((h) => /github\.com\/[^/]+\/[^/]+/.test(h)) ?? null,
  };
});
console.log({ url: await page.url(), ...meta });
console.log(await page.snapshot()); // 看清产品形态/导航，再决定要不要点 pricing/about
EOF
```

沙箱拦截 heredoc 时改用 `ego-browser nodejs -e '...'`（单引号包裹）。脚本运行在 Node 而非页面内：`window`/`document` 只能出现在 `page.evaluate()` 里，文件路径用绝对路径。

## 工具文件模板

```markdown
---
layout: tool
title: 名称 - 一句中文卖点
type: tool
id: name
slug: name
description: 中文一句话介绍，10 到 120 字。
website: https://example.com
github: null
categories:
  - ai/ai-agent
tags:
  - agent
pricing:
  model: freemium
  priceUrl: https://example.com/pricing
platforms:
  - web
openSource: false
status: published
featured: false
developer: 公司名
language:
  - en
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

# 名称

> 一句话定位。

## 工具介绍

它是什么、解决什么问题。

## 核心功能

### 功能一

说明。

### 功能二

说明。

## 适用场景

- 场景一
- 场景二

## 相关资源

- [官方网站](https://example.com)
- [价格页面](https://example.com/pricing)
```

## 常见错误

- **凭记忆写分类/标签**：分类体系会变，必须先读两个 yaml，否则校验直接失败。
- **分类写中文名**：要写 `ai/ai-agent` 这样的 id，不是「AI/智能 Agent」。
- **description 越界**：超过 120 字或不足 10 字都会报错。
- **枚举拼错**：`platforms`/`pricing.model`/`status` 必须逐字命中枚举。
- **id 或 slug 与现有条目重复**：先查 `tools/`。
- **openSource 误判**：有公开仓库才为 `true`，并填 `github`；不确定就核实。
- **写完不校验**：必须 `npm run validate` 通过才算完成。
