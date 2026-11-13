---
name: collect-tool
description: 当用户给出一个资源/工具网址，希望把它收录、收藏或整理进本导航站（cc-nav）时使用。触发词：收录、收藏、添加工具/网站、整理这个网址、加到导航 + URL。
metadata:
  scope: project
---

# Collect Tool（收录网址到本站）

## 用途

把用户给的一个网址，变成本站一个**通过校验的条目**：用本地 `ego-browser` 打开网址、提取产品信息、判定条目类型、归入对应目录，并跑通内容校验。

**不要**用 curl / 内置 fetch 抓页面——必须走 ego-browser（可复用用户已登录态、能点开二级页面核实定价/GitHub）。

不适用：网址无法访问、非具体产品（纯文章/单页宣传）、或用户只是想读一下网页内容而不收录。

## 站点有两大收录区（先判定，再动笔）

| 收录区 | 目录 | 条目类型 | 典型对象 |
| --- | --- | --- | --- |
| 工具库 | `tools/` | `type: tool` | 独立产品/服务：SaaS、App、网站、开源项目 |
| Agent 生态 | `agent/skills/` | `type: agent, kind: skill` | Agent 技能包（SKILL.md、可装进编程 Agent） |
| Agent 生态 | `agent/mcps/` | `type: agent, kind: mcp` | MCP Server（Model Context Protocol） |
| Agent 生态 | `agent/plugins/` | `type: agent, kind: plugin` | Agent 插件（ChatGPT plugin、各平台插件市场扩展） |

### 类型路由信号（按页面实际文案判定，优先级从上到下）

- **Skill**：自称 "agent skill"、出现 `SKILL.md`、安装命令为 `npx skills add`、`/plugin install`、`claude plugin`、要求放入 `.claude/skills/`、`.cursor/skills/` 等目录；交付物是"装进 Agent 的指令包"而非独立 App。
- **MCP**：出现 "MCP Server"、"Model Context Protocol"、`mcpServers` 配置 JSON、`claude mcp add`、stdio/SSE/streamable-http 等传输方式；交付物是 Agent 通过协议调用的 Server。
- **Plugin**：自称插件且依赖特定宿主（ChatGPT plugin、某 IDE/平台插件市场条目），交付物是宿主平台的扩展。
- **Tool（默认）**：有独立界面/服务的产品，不满足以上信号即归此类。

信号冲突时：核心交付物是什么就归什么。拿不准归类时，向用户确认或先存 `status: draft`，不要硬塞。

## 工作流程

1. **读权威数据（别信记忆）**：读 `data/categories.yaml`、`data/tags.yaml`。
2. **浏览器调研**：调用全局 `ego-browser` skill 获取当前版本用法，用一个 TaskSpace 打开目标网址，`snapshot()` + `evaluate()` 提取信息，**重点识别上节的类型信号**；必要时再访问 `/pricing`、`/about`、对应 GitHub 仓库核实收费、开源与安装方式。
3. **类型与归类判定**：先定 tool / skill / mcp / plugin，再按对应规则定分类或 domain、标签、平台。
4. **分区查重**：按判定类型在对应目录查重（命令见下），同时确认 `id`、`slug` 不冲突。
5. **生成文件**：按对应模板写入正确目录，正文补齐内容。
6. **校验**：运行 `npm run validate`，必须通过；按报错改到通过为止。
7. **收尾**：向用户汇报文件路径、类型、分类/domain、收费（仅 tool）、平台；让 ego TaskSpace 结束（`finish({ keep: [] })`，仅调用一次）。若用户指定了某个专题，**仅 tool 条目**可把其 `id` 追加进对应 `collections/*.md` 的 `tools` 列表（合集校验只认 tool id，agent 条目加入会报错）。

信息不足以判定收费/平台/安装方式时：要么 `handOff()` 请用户补充，要么先存 `status: draft`，不要编造。

### 分区查重命令

```bash
# Tool：查 tools/ 和 collections/
grep -ril "域名关键词\|产品名" tools/ collections/ data/
# Agent 条目：查 agent/ 全部三个子目录
grep -ril "域名关键词\|产品名" agent/
```

注意 id 体系：tool 的 id 通常 = slug；agent 条目 id 带 kind 前缀（`skill-xxx` / `mcp-xxx` / `plugin-xxx`），slug 不带前缀（文件名仍是 `<slug>.md`）。tool 与 agent 的 id 在构建脚本中分开去重，但各自体系内必须唯一；同 kind 内 slug 路径也不可重复。

## A. Tool 条目字段（tools/）

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `layout` | 是 | `tool` |
| `type` | 是 | 固定 `tool` |
| `id` | 是 | kebab-case，工具内唯一，通常 = `slug` |
| `name` | 是 | 产品名 |
| `slug` | 是 | kebab-case，文件名即 `<slug>.md` |
| `title` | 是 | `{name} - {一句中文卖点}` |
| `description` | 是 | 中文一句话，**10–120 字**（建议 50–100） |
| `website` | 是 | 给定网址，去掉 utm 等追踪参数 |
| `github` | 是 | 仓库 URL，没有则 `null` |
| `categories` | 是 | ≥1 个，格式 `顶级id/子类id`，主分类放第一个，必须存在于 `categories.yaml` |
| `tags` | 否 | **必须命中 `tags.yaml` 的 id**，受控不可自造 |
| `pricing.model` | 是 | 枚举见下 |
| `pricing.priceUrl` | 否 | 定价页 URL，没有则 `null` |
| `platforms` | 是 | Tool 平台枚举子集，按实际形态给（网页端多为 `web`） |
| `openSource` | 是 | 布尔，有公开开源仓库才为 `true` 并填 `github` |
| `status` | 是 | 通常 `published`；信息不全用 `draft` |
| `featured` | 是 | 默认 `false`，除非用户要求推荐 |
| `developer` | 否 | 公司/团队名 |
| `language` | 否 | 界面语言代码，如 `zh`、`en` |
| `logo` | 否 | `public` 下路径（如 `/logos/xx.png`），需文件真实存在；无则省略 |
| `createdAt` / `updatedAt` | 是 | 今天，`YYYY-MM-DD` |

## B. Agent 条目字段（agent/）

Agent 条目**没有** `categories`、`pricing`、`openSource`、`language` 字段（schema 会 strip，多写无效）；开源属性通过 `github` 有无体现。

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `layout` | 是 | `agent-item` |
| `type` | 是 | 固定 `agent` |
| `kind` | 是 | `skill` / `mcp` / `plugin`，**必须与所在目录一致** |
| `id` | 是 | 带前缀：`skill-<slug>` / `mcp-<slug>` / `plugin-<slug>` |
| `name` | 是 | 产品名 |
| `slug` | 是 | kebab-case，不带前缀，文件名即 `<slug>.md` |
| `title` | 是 | 产品名即可（范例不带卖点后缀） |
| `description` | 是 | 中文一句话，**10–120 字**（建议 50–100） |
| `website` | 是 | 产品/仓库页 URL，去掉追踪参数 |
| `github` | 否 | 仓库 URL，没有则 `null` |
| `platforms` | 是 | **Agent 平台枚举** ≥1：`claude` `openai` `cursor` `windsurf` `generic`（其余宿主如 Gemini CLI/Cline 用 `generic`） |
| `domain` | 是 | `dev` `data` `browser` `productivity` `search` `automation` `communication` |
| `tags` | 否 | **自由中文短词**（如「浏览器自动化」「截图」），不受 tags.yaml 约束 |
| `developer` | 否 | 公司/团队/作者名 |
| `official` | 是 | 是否平台官方出品，默认 `false` |
| `featured` | 是 | 默认 `false` |
| `status` | 是 | 通常 `published`；信息不全用 `draft` |
| `logo` | 否 | `public` 下路径，需文件真实存在；无则写 `null` 或省略 |
| `install` | Skill 必填 | 安装方式（命令或目录复制说明） |
| `transport` | MCP 必填 | `stdio` / `sse` / `streamable-http` |
| `command` | MCP（stdio）必填 | 启动命令，如 `npx -y @xxx/server`；非 stdio 写 `null` |
| `url` | MCP（sse/streamable-http）必填 | Server URL；stdio 写 `null` |
| `host` | Plugin 必填 | 宿主名，如 `ChatGPT` |
| `marketplaceUrl` | Plugin 否 | 插件市场/接入页 URL，没有则 `null` |
| `createdAt` / `updatedAt` | 是 | 今天，`YYYY-MM-DD` |

## 枚举速查

**Tool · pricing.model**
- `free` 完全免费 · `freemium` 免费额度+付费升级（最常见）· `paid` 仅付费
- `subscription` 订阅制 · `open-core` 开源核心+商业版 · `unknown` 无法确定

**Tool · platforms**：`web` `macos` `windows` `linux` `ios` `android` `cli` `api` `browser-extension`

**Agent · platforms**：`claude`（Claude Code）· `openai`（ChatGPT/Codex 生态）· `cursor` · `windsurf` · `generic`（其它宿主/通用）

**Agent · domain**：`dev` 开发 · `data` 数据 · `browser` 浏览器 · `productivity` 办公 · `search` 搜索 · `automation` 自动化 · `communication` 沟通

**MCP · transport**：`stdio`（本地进程，配 `command`）· `sse` / `streamable-http`（远程，配 `url`）

**status（两类通用）**：`draft` `review` `published` `archived`

## 分类地图（Tool 用，以 data/categories.yaml 为准）

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

Tool 可用标签（`data/tags.yaml`）：ai-coding、agent、code-editor、open-source、no-code、note-taking、automation、collaboration、cloud、api、design、free。

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
console.log(await page.snapshot()); // 看清产品形态/导航，识别类型信号，再决定要不要点 pricing/install 锚点
EOF
```

沙箱拦截 heredoc 时改用 `ego-browser nodejs -e '...'`（单引号包裹）。脚本运行在 Node 而非页面内：`window`/`document` 只能出现在 `page.evaluate()` 里，文件路径用绝对路径。

## 文件模板

### Tool（tools/&lt;slug&gt;.md）

```markdown
---
layout: tool
title: 名称 - 一句中文卖点
type: tool
id: name
name: 名称
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

### Skill（agent/skills/&lt;slug&gt;.md）

```markdown
---
layout: agent-item
title: 名称
type: agent
kind: skill
id: skill-name
name: 名称
slug: name
description: 中文一句话介绍，10 到 120 字。
logo: null
website: https://example.com
github: https://github.com/owner/repo
platforms:
  - claude
domain: dev
tags:
  - 自由中文短词
developer: 作者或公司
official: false
featured: false
status: published
install: npx skills add owner/repo（或目录复制说明）
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

## 简介

它是什么 Skill、装进 Agent 后改变什么能力。

## 能做什么

- **能力一**：说明。
- **能力二**：说明。

## 使用方式

安装后用自然语言下达任务，给一句真实示例 prompt。
```

### MCP（agent/mcps/&lt;slug&gt;.md）

```markdown
---
layout: agent-item
title: 名称
type: agent
kind: mcp
id: mcp-name
name: 名称
slug: name
description: 中文一句话介绍，10 到 120 字。
logo: null
website: https://example.com
github: https://github.com/owner/repo
platforms:
  - claude
  - generic
domain: data
tags:
  - 自由中文短词
developer: 作者或公司
official: false
featured: false
status: published
transport: stdio
command: npx -y @scope/server-name
url: null
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

## 简介

Server 提供什么资源、通过什么协议与 Agent 通信。

## 提供的能力

- **能力一**：说明。
- **能力二**：说明。

## 接入配置

给出 mcpServers 配置块或远程 URL 接入方式。
```

### Plugin（agent/plugins/&lt;slug&gt;.md）

```markdown
---
layout: agent-item
title: 名称
type: agent
kind: plugin
id: plugin-name
name: 名称
slug: name
description: 中文一句话介绍，10 到 120 字。
logo: null
website: https://example.com
github: null
platforms:
  - openai
domain: automation
tags:
  - 自由中文短词
developer: 公司名
official: true
featured: false
status: published
host: ChatGPT
marketplaceUrl: https://example.com/marketplace
createdAt: 2026-11-12
updatedAt: 2026-11-12
---

## 简介

插件把什么能力接入宿主、授权后 Agent 能直接执行什么。

## 能做什么

- **能力一**：说明。
- **能力二**：说明。

## 使用方式

安装/授权步骤，加一句真实示例 prompt。
```

## 常见错误

- **不判类型直接写 tool**：Skill / MCP / Plugin 必须进 `agent/` 对应目录，字段集完全不同；先看类型信号。
- **kind 与目录不匹配**：`kind: skill` 的文件只能放 `agent/skills/`，放错目录校验报错。
- **两套 platforms 混用**：tool 用 `web/cli/...`，agent 用 `claude/openai/cursor/windsurf/generic`，混用必报错。
- **Agent 条目写 categories/pricing/openSource**：这些字段不属于 agent schema，改用 `domain`；开源与否看 `github`。
- **Skill 漏 install / MCP 漏 transport / Plugin 漏 host**：三者各有必填项；stdio MCP 必须给 `command`，远程 MCP 必须给 `url`。
- **tags 规则用反**：tool 的 tag 必须命中 `tags.yaml`，agent 的 tag 是自由中文短词。
- **凭记忆写分类**：分类体系会变，Tool 分类必须先读 `categories.yaml`。
- **分类写中文名**：要写 `ai/ai-agent` 这样的 id，不是「AI/智能 Agent」。
- **description 越界**：超过 120 字或不足 10 字都会报错。
- **查重只扫 tools/**：agent 条目必须扫 `agent/`；id 带 kind 前缀，slug 不带。
- **把 agent id 加进 collections**：合集只引用 tool id，会报「引用了不存在的工具 id」。
- **openSource 误判**：有公开仓库才为 `true`，并填 `github`；不确定就核实。
- **写完不校验**：必须 `npm run validate` 通过才算完成。
