# 全品类工具导航平台 — 产品与技术方案

**项目名称：** ToolsHub Max  
**项目类型：** 静态工具收录与展示平台  
**核心技术：** VPress + Markdown + Vue + GitHub + Vercel  
**部署模式：** 静态网站部署  
**数据管理：** Git 仓库管理，不依赖数据库

---

# 一、产品方案

## 1.1 产品定位

建设一个面向开发者、设计师、产品经理、运营人员及普通互联网用户的全品类数字工具导航平台。

通过统一的工具收录规范，将互联网上有价值的软件、网站、开源项目、在线服务进行分类整理，为用户提供工具发现、搜索、筛选、比较和详情查看能力。

核心价值：

1. **工具发现：** 帮助用户快速发现不同领域的优质工具。
2. **分类导航：** 建立统一的工具分类体系，降低工具查找成本。
3. **信息聚合：** 统一展示工具介绍、官网、GitHub、价格、平台支持等信息。
4. **优质推荐：** 通过精选、专题和排行榜提高内容价值。
5. **持续收录：** 通过 GitHub + Markdown 实现低成本内容维护，并为后续 Agent 自动收录预留接口。

## 1.2 用户群体

| 用户群体 | 核心需求 |
|---|---|
| 开发者 | 寻找开发框架、SDK、开源项目、效率工具 |
| 产品经理 | 寻找产品设计、原型、项目管理工具 |
| 设计师 | 寻找 UI、图片、视频、素材工具 |
| 运营人员 | 寻找营销、SEO、社媒、数据分析工具 |
| 普通用户 | 寻找在线转换、办公、生活实用工具 |

## 1.3 产品功能规划

### P0：第一版必须实现

| 功能模块 | 功能说明 |
|---|---|
| 首页 | 搜索框、分类入口、精选工具、最新收录 |
| 分类导航 | 一级分类、二级分类及分类介绍 |
| 工具列表 | 工具卡片、分页或分批加载 |
| 工具详情 | 工具介绍、功能、价格、平台、官网链接 |
| 全局搜索 | 支持名称、描述、标签搜索 |
| 分类筛选 | 按工具所属分类筛选 |
| 标签筛选 | 按工具标签筛选 |
| 响应式布局 | PC、平板、移动端适配 |
| SEO | 页面标题、描述、Sitemap、Canonical |

### P1：第二阶段

| 功能模块 | 功能说明 |
|---|---|
| 工具收藏 | 浏览器 LocalStorage 收藏 |
| 工具对比 | 多个工具横向比较 |
| 专题合集 | 人工整理不同场景的工具集合 |
| 推荐排序 | 精选、最新、人工推荐 |
| 工具提交 | 通过 GitHub Issues 提交工具 |
| 多语言 | 中文、英文内容 |

### P2：后续扩展

| 功能模块 | 功能说明 |
|---|---|
| 自动采集 | Agent 自动发现和收集工具 |
| 自动更新 | 定期检测官网、GitHub、价格等变化 |
| 内容审核 | 自动生成草稿，人工审核后发布 |
| 用户评价 | 用户评分、评论 |
| 访问统计 | 工具点击量、分类热度 |
| 后端管理 | 需要时再引入管理服务 |

第一版不引入用户系统、数据库和后端服务。

---

# 二、网站信息架构

## 2.1 页面结构

采用四层页面结构：

```text
首页 /
│
├── 分类页面
│   ├── /categories/ai
│   ├── /categories/development
│   ├── /categories/design
│   └── /categories/productivity
│
├── 工具详情
│   ├── /tools/claude-code
│   ├── /tools/cursor
│   ├── /tools/notion
│   └── /tools/figma
│
├── 专题合集
│   ├── /collections/ai-coding
│   ├── /collections/developer-tools
│   └── /collections/productivity
│
└── 关于页面
    ├── /about
    ├── /submit
    └── /contribute
```

## 2.2 首页设计

首页采用工具导航网站的展示形式，而不是传统文档目录形式。

页面区域：

1. Header：Logo、分类入口、关于、提交工具。
2. Hero：网站介绍、全局搜索。
3. Categories：热门工具分类。
4. Featured：精选工具。
5. Latest：最新收录。
6. Collections：专题合集。
7. Footer：版权、GitHub、联系方式。

首页不应该展示过多内容，重点是搜索和工具发现。

## 2.3 分类体系

采用一级分类 + 二级分类结构。

第一版建议设置以下一级分类：

| 一级分类 | 分类标识 | 二级分类 |
|---|---|---|
| AI 与智能 | ai | AI 对话、AI Agent、AI 编程、AI 绘画、AI 视频、AI 音频 |
| 开发与技术 | development | IDE、代码托管、前端框架、后端框架、数据库、API、DevOps |
| 设计与创意 | design | UI 设计、原型设计、图片处理、视频剪辑、3D、素材资源 |
| 办公与效率 | productivity | 笔记、文档、项目管理、协作、自动化、时间管理 |
| 营销与运营 | marketing | SEO、社媒管理、数据分析、邮件营销、广告投放 |
| 学习与教育 | education | 在线课程、编程学习、语言学习、知识管理 |
| 数据与研究 | data | 数据可视化、数据采集、搜索引擎、科研工具 |
| 云服务与基础设施 | infrastructure | 云平台、服务器、CDN、存储、监控、安全 |
| 生活与实用 | utilities | 在线转换、计算器、地图、文件处理、生活服务 |
| 商业与创业 | business | 电商、支付、CRM、SaaS、财务管理 |

分类管理原则：

- 一个工具可以属于多个分类。
- 工具只能有一个主分类，其余为辅助分类。
- 二级分类必须归属于一个一级分类。
- 分类 ID 一经确定尽量不修改。
- 分类允许扩展，不要把分类体系设计成不可变的枚举。

## 2.4 标签体系

分类与标签必须分离。

分类用于确定工具属于什么领域，标签用于描述工具的具体属性。

例如：

```text
工具：Cursor

分类：
- AI 与智能 / AI 编程
- 开发与技术 / IDE

标签：
- AI Coding
- Code Editor
- VS Code
- Agent
- 多模型
```

标签可以跨分类使用。

---

# 三、核心设计：Markdown 内容组织规范

这一部分是整个项目最重要的设计。

不建议将所有工具写在一个 Markdown 文件中，也不建议把所有数据都放进 JSON。

推荐采用：

**一个工具一个 Markdown 文件，Frontmatter 存储结构化元数据，Markdown 正文存储详细内容。**

这样既方便人工维护，也方便后续 Agent 自动生成和更新。

## 3.1 Markdown 文件的职责划分

Markdown 文件分为四种类型：

| 类型 | 存储内容 | 作用 |
|---|---|---|
| Tool | 单个工具信息 | 工具详情、工具元数据 |
| Category | 分类信息 | 分类介绍、分类展示 |
| Collection | 专题合集 | 多个工具的组合推荐 |
| Page | 普通页面 | 关于、提交指南等 |

不同类型使用不同的 Frontmatter Schema。

## 3.2 目录结构

建议将内容目录与网站程序目录分开。

```text
toolshub-max/
│
├── docs/
│   ├── index.md
│   ├── about.md
│   ├── submit.md
│   │
│   ├── tools/
│   │   ├── claude-code.md
│   │   ├── cursor.md
│   │   ├── notion.md
│   │   ├── figma.md
│   │   └── ...
│   │
│   ├── categories/
│   │   ├── ai.md
│   │   ├── development.md
│   │   ├── design.md
│   │   ├── productivity.md
│   │   └── ...
│   │
│   └── collections/
│       ├── ai-coding.md
│       ├── developer-tools.md
│       └── productivity.md
│
├── data/
│   ├── categories.yaml
│   ├── tags.yaml
│   └── site.yaml
│
├── public/
│   ├── logos/
│   ├── images/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   └── utils/
│
├── scripts/
│   ├── build-index.js
│   ├── validate-content.js
│   └── generate-sitemap.js
│
├── package.json
└── README.md
```

说明：

- `docs/tools/`：所有工具的 Markdown 内容。
- `docs/categories/`：分类页面的 Markdown 内容。
- `docs/collections/`：专题合集内容。
- `data/`：全局配置和分类、标签字典。
- `public/`：Logo、图片等静态资源。
- `src/`：网站展示层组件和业务代码。
- `scripts/`：构建前的数据处理和校验脚本。

注：具体的 VPress 配置目录、入口和组件接入方式沿用当前项目的实际框架规范；上述目录是逻辑组织方案，不要求替换 VPress 自身的约定目录。

---

# 四、工具 Markdown 规范

## 4.1 Frontmatter 设计

每个工具文件都必须包含 YAML Frontmatter。

推荐 Schema：

```yaml
---
type: tool
id: cursor
name: Cursor
slug: cursor

description: AI 驱动的代码编辑器，帮助开发者更高效地编写和理解代码。

logo: /logos/cursor.svg
website: https://cursor.com
github: https://github.com/getcursor/cursor

categories:
  - ai/ai-coding
  - development/ide

tags:
  - ai-coding
  - code-editor
  - agent

pricing:
  model: freemium
  priceUrl: https://cursor.com/pricing

platforms:
  - web
  - macos
  - windows
  - linux

openSource: false

status: published
featured: true

developer: Anysphere

language:
  - en

createdAt: 2026-11-11
updatedAt: 2026-11-11
---
```

### 字段定义

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| type | string | 是 | 固定为 tool |
| id | string | 是 | 工具唯一 ID |
| name | string | 是 | 工具名称 |
| slug | string | 是 | URL 标识 |
| description | string | 是 | 工具简短描述 |
| logo | string | 否 | Logo 路径 |
| website | string | 是 | 官方网站 |
| github | string | 否 | GitHub 地址 |
| categories | string[] | 是 | 所属分类 ID |
| tags | string[] | 否 | 标签 ID |
| pricing | object | 是 | 收费模式 |
| platforms | string[] | 否 | 支持平台 |
| openSource | boolean | 是 | 是否开源 |
| status | string | 是 | 内容发布状态 |
| featured | boolean | 否 | 是否精选 |
| developer | string | 否 | 开发商 |
| language | string[] | 否 | 产品支持语言 |
| createdAt | date | 是 | 收录日期 |
| updatedAt | date | 是 | 最近更新时间 |

注意：

1. `id` 是数据唯一标识，不应该随意变化。
2. `slug` 用于 URL，发布后修改需要考虑旧 URL 兼容。
3. `categories` 引用分类 ID，不直接写中文分类名称。
4. `tags` 引用统一标签 ID，避免同义标签重复。
5. `description` 应控制在适合卡片展示的长度，建议 50～100 个中文字符。
6. `website` 必须是官方产品网址，不使用第三方介绍页代替。
7. `updatedAt` 表示内容最后一次实质性更新，不应在每次构建时自动修改。

## 4.2 收费模式

建议统一枚举：

```yaml
pricing:
  model: free
  priceUrl: null
```

支持：

| model | 含义 |
|---|---|
| free | 完全免费 |
| freemium | 免费增值 |
| paid | 付费 |
| open-core | 开源核心 + 商业功能 |
| subscription | 订阅收费 |
| unknown | 暂未确认 |

这里要注意：`openSource` 和 `pricing` 是两个不同维度。

开源软件不一定免费，免费软件也不一定开源。

## 4.3 平台枚举

建议统一使用：

```yaml
platforms:
  - web
  - macos
  - windows
  - linux
  - ios
  - android
  - cli
  - api
  - browser-extension
```

不要出现 `Mac`、`macOS`、`Mac OS` 等多种写法混用。

## 4.4 Markdown 正文结构

正文不应该完全自由发挥。

建议制定统一模板，保证所有工具详情页的信息结构一致。

```markdown
# Cursor

> AI 驱动的代码编辑器，帮助开发者更高效地编写和理解代码。

## 工具介绍

Cursor 是一款基于 AI 能力的代码编辑器，
支持代码生成、代码补全、代码理解和 Agent 编程等能力。

## 核心功能

### AI 代码生成

通过自然语言描述需求，生成对应代码。

### Agent 模式

支持 Agent 理解项目结构、执行代码修改和完成开发任务。

### 代码理解

可以结合项目上下文分析代码，回答开发问题。

## 适用场景

- 日常软件开发
- AI 辅助编程
- 代码重构
- 项目代码理解

## 优势与特点

- AI 能力与编辑器深度结合
- 支持多种模型
- 具备项目级上下文理解能力

## 价格信息

提供免费额度和付费订阅方案，具体价格以官方网站为准。

## 相关资源

- [官方网站](https://cursor.com)
- [价格页面](https://cursor.com/pricing)
- [GitHub](https://github.com/getcursor/cursor)
```

### 正文规范

| 内容 | 规范 |
|---|---|
| H1 | 工具名称，必须与 Frontmatter name 一致 |
| 引言 | 简短说明工具的核心价值 |
| 工具介绍 | 描述产品定位及主要用途 |
| 核心功能 | 使用 H3 拆分功能点 |
| 适用场景 | 使用列表说明 |
| 优势与特点 | 描述产品差异化特点 |
| 价格信息 | 简要说明收费模式 |
| 相关资源 | 官网、GitHub、文档、价格页 |

不是每个工具都必须有所有章节，但工具介绍和核心功能应作为主要内容。

不要为了填满模板而生成没有价值的文字。

## 4.5 完整工具文件示例

建议最终一个工具文件的形式如下：

```markdown
---
type: tool
id: cursor
name: Cursor
slug: cursor
description: AI 驱动的代码编辑器，帮助开发者更高效地编写和理解代码。
logo: /logos/cursor.svg
website: https://cursor.com
github: null
categories:
  - ai/ai-coding
  - development/ide
tags:
  - ai-coding
  - code-editor
  - agent
pricing:
  model: freemium
  priceUrl: https://cursor.com/pricing
platforms:
  - macos
  - windows
  - linux
openSource: false
status: published
featured: true
developer: Anysphere
language:
  - en
createdAt: 2026-11-11
updatedAt: 2026-11-11
---

# Cursor

> AI 驱动的代码编辑器，帮助开发者更高效地编写和理解代码。

## 工具介绍

Cursor 是一款 AI 驱动的代码编辑器。

## 核心功能

### AI 代码生成

通过自然语言描述需求生成代码。

### Agent 模式

支持理解项目上下文并执行代码修改。

## 适用场景

- 日常软件开发
- AI 辅助编程
- 代码重构

## 相关资源

- [官方网站](https://cursor.com)
- [价格页面](https://cursor.com/pricing)
```

---

# 五、分类 Markdown 规范

分类文件负责描述分类本身，不负责存储该分类下所有工具。

工具与分类通过 Frontmatter 中的分类 ID 建立关联。

## 5.1 分类 Frontmatter

例如 `docs/categories/ai.md`：

```yaml
---
type: category
id: ai
slug: ai
name: AI 与智能
description: 收集人工智能领域的优质工具、模型、平台和应用。
icon: brain
parent: null
sort: 1
status: published
---
```

二级分类例如 `docs/categories/ai-coding.md`：

```yaml
---
type: category
id: ai-coding
slug: ai-coding
name: AI 编程
description: AI 驱动的代码编辑器、编程 Agent 和代码生成工具。
icon: code
parent: ai
sort: 1
status: published
---
```

## 5.2 分类正文

```markdown
# AI 编程

AI 编程工具通过大模型和 Agent 技术，
帮助开发者完成代码生成、代码理解、调试和软件开发任务。

## 分类介绍

本分类收录 AI IDE、编程 Agent、代码补全和代码生成工具。

## 适用场景

- AI 辅助编码
- 自动化软件开发
- 代码审查
- 代码重构
```

## 5.3 分类与工具的关系

例如：

```yaml
# Cursor

categories:
  - ai/ai-coding
  - development/ide
```

构建时通过 `categories` 关联分类文件。

分类页面不需要手工维护工具列表，工具列表由索引自动生成。

这样新增工具时，不需要同时修改分类文件。

---

# 六、专题合集 Markdown 规范

专题合集用于人工整理一组具有共同主题的工具。

例如：

- 最值得尝试的 AI 编程工具
- 开发者必备工具
- 设计师常用工具
- 高质量免费在线工具

## 6.1 Frontmatter

`docs/collections/ai-coding.md`

```yaml
---
type: collection
id: ai-coding
slug: ai-coding
name: AI 编程工具合集
description: 精选当前值得关注的 AI 编程工具。
cover: /images/collections/ai-coding.png
tags:
  - ai
  - development
status: published
featured: true
sort: 1
createdAt: 2026-11-11
updatedAt: 2026-11-11
tools:
  - cursor
  - claude-code
  - windsurf
---
```

## 6.2 正文

```markdown
# AI 编程工具合集

整理值得关注的 AI 编程工具，
帮助开发者选择适合自己的 AI 开发环境。

## 如何选择 AI 编程工具

根据使用场景、开发习惯和预算进行选择。

## 工具推荐

### Cursor

适合希望使用 AI IDE 提升开发效率的开发者。

### Claude Code

适合希望通过终端 Agent 执行复杂开发任务的开发者。

## 总结

不同工具具有不同的定位，可以根据项目需求选择。
```

工具列表通过 Frontmatter 中的 `tools` 引用，避免在正文中重复维护工具的基础信息。

---

# 七、标签和全局配置

## 7.1 标签字典

`data/tags.yaml`

```yaml
- id: ai-coding
  name: AI Coding
  description: AI 辅助编程相关工具

- id: agent
  name: Agent
  description: 智能 Agent 和自主执行工具

- id: open-source
  name: 开源
  description: 开源软件和项目

- id: no-code
  name: No Code
  description: 无代码和低代码工具
```

标签字典的作用：

- 统一标签名称。
- 防止重复标签。
- 提供标签描述。
- 为标签页面生成提供数据来源。

## 7.2 站点配置

`data/site.yaml`

```yaml
name: ToolsHub Max

description: Discover useful digital tools for work, development and creativity.

url: https://example.com

language: zh-CN

github: https://github.com/cashely/toolsHub

navigation:
  - name: 首页
    path: /

  - name: 分类
    path: /categories/

  - name: 专题
    path: /collections/

  - name: 关于
    path: /about
```

---

# 八、Markdown 内容管理的核心机制

这是技术实现中非常关键的一部分。

不应该让前端组件直接遍历文件系统，也不应该在首页直接读取全部 Markdown 并进行复杂解析。

推荐采用构建阶段生成统一的数据索引。

## 8.1 内容处理流程

```text
Markdown 文件
    |
    v
扫描 docs/tools、docs/categories、docs/collections
    |
    v
解析 Frontmatter
    |
    v
执行 Schema 校验
    |
    v
建立工具、分类、标签之间的关联
    |
    v
生成统一内容索引
    |
    +------ tools.json
    |
    +------ categories.json
    |
    +------ collections.json
    |
    +------ search-index.json
    |
    v
VPress 页面组件读取索引
    |
    v
生成静态页面
```

## 8.2 构建生成的数据结构

例如 `tools.json`：

```json
[
  {
    "id": "cursor",
    "name": "Cursor",
    "slug": "cursor",
    "description": "AI 驱动的代码编辑器",
    "logo": "/logos/cursor.svg",
    "website": "https://cursor.com",
    "categories": [
      "ai/ai-coding",
      "development/ide"
    ],
    "tags": [
      "ai-coding",
      "agent"
    ],
    "pricing": {
      "model": "freemium"
    },
    "openSource": false,
    "featured": true,
    "path": "/tools/cursor"
  }
]
```

这里需要注意：

- 工具详情正文继续由 Markdown 页面负责渲染。
- JSON 只保存列表展示和筛选所需的信息。
- 不要把 Markdown 正文再次完整复制到 JSON。
- 搜索索引可以只保留名称、描述、标签和分类名称。

## 8.3 构建校验

建议构建时强制检查以下内容：

| 校验项 | 错误处理 |
|---|---|
| 工具 ID 重复 | 构建失败 |
| slug 重复 | 构建失败 |
| 缺少 name | 构建失败 |
| 缺少 description | 构建失败 |
| 分类 ID 不存在 | 构建失败 |
| 标签 ID 不存在 | 构建失败 |
| 官网 URL 格式错误 | 构建失败 |
| logo 文件不存在 | 构建失败 |
| 不支持的 pricing 枚举 | 构建失败 |
| status 非法 | 构建失败 |

对于非必填字段，例如 GitHub 地址不存在，不应导致构建失败。

另外，`status: draft` 的文件只参与内容管理和校验，不应该进入正式页面和公开搜索索引。

---

# 九、技术架构

## 9.1 技术选型

| 模块 | 技术 | 用途 |
|---|---|---|
| 静态网站框架 | VPress | Markdown 解析和静态页面生成 |
| 前端框架 | Vue | 页面和组件开发 |
| 样式 | CSS / Tailwind CSS | UI 实现 |
| 内容格式 | Markdown + YAML | 工具内容管理 |
| 数据校验 | Zod | Frontmatter Schema 校验 |
| YAML 解析 | gray-matter 或框架原生解析器 | 元数据解析 |
| 搜索 | MiniSearch | 本地全文检索 |
| 内容索引 | Node.js 脚本 | 构建前生成 JSON |
| 版本管理 | GitHub | 内容和代码管理 |
| 自动部署 | Vercel | 构建和发布 |

具体依赖版本应以现有 VPress 项目的兼容性为准，不在方案阶段锁定未经验证的版本。

## 9.2 网站架构

```text
                    GitHub
                       |
              Push / Pull Request
                       |
                       v
                 Vercel Build
                       |
                       v
              Node.js Content Pipeline
                       |
             +---------+----------+
             |                    |
             v                    v
        Markdown Parser      Schema Validator
             |                    |
             +---------+----------+
                       |
                       v
                Content Index
                       |
                       v
                  VPress
                       |
             +---------+----------+
             |         |          |
             v         v          v
           首页     分类页面    工具详情
             |         |          |
             +---------+----------+
                       |
                       v
                Static HTML / CSS / JS
                       |
                       v
                   Vercel CDN
```

## 9.3 前端组件划分

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── SearchBox.vue
│   │
│   ├── tools/
│   │   ├── ToolCard.vue
│   │   ├── ToolGrid.vue
│   │   ├── ToolMeta.vue
│   │   ├── ToolFilters.vue
│   │   └── ToolDetail.vue
│   │
│   ├── categories/
│   │   ├── CategoryCard.vue
│   │   └── CategoryNav.vue
│   │
│   └── collections/
│       ├── CollectionCard.vue
│       └── CollectionGrid.vue
│
├── pages/
│   ├── Home.vue
│   ├── Category.vue
│   ├── Tool.vue
│   └── Collection.vue
│
├── layouts/
│   └── MainLayout.vue
│
├── utils/
│   ├── search.ts
│   ├── filters.ts
│   └── content.ts
│
└── types/
    ├── tool.ts
    ├── category.ts
    └── collection.ts
```

组件仅为逻辑划分示例，实际路由和页面入口由 VPress 的机制决定。

## 9.4 搜索实现

第一版采用 MiniSearch。

索引字段：

```typescript
interface SearchDocument {
  id: string;
  name: string;
  description: string;
  tags: string[];
  categories: string[];
}
```

搜索字段权重：

| 字段 | 权重 |
|---|---:|
| name | 5 |
| tags | 3 |
| categories | 2 |
| description | 1 |

搜索能力：

- 名称模糊搜索。
- 描述全文搜索。
- 标签搜索。
- 分类搜索。
- 搜索结果排序。

搜索索引在构建时生成，浏览器端加载并查询，不需要搜索服务器。

注意：MiniSearch 的中文分词效果需要单独验证。第一版可以通过名称、标签和关键词匹配实现基础搜索，后续再根据实际搜索体验引入中文分词方案。

---

# 十、SEO 与静态部署

## 10.1 SEO

每个工具详情页生成独立的 SEO 信息：

- Title：工具名称 + 工具导航平台。
- Description：工具简短介绍。
- Canonical：规范 URL。
- Open Graph：社交分享信息。
- Sitemap：自动生成页面清单。
- Robots：控制搜索引擎抓取。

## 10.2 Vercel 部署

部署流程：

```text
GitHub Push
    |
    v
Vercel 自动触发构建
    |
    v
npm install
    |
    v
npm run validate
    |
    v
npm run build
    |
    v
生成静态网站
    |
    v
Vercel 部署
```

建议配置：

- Production：主分支自动部署。
- Preview：Pull Request 自动生成预览地址。
- 域名：绑定自定义域名。
- 环境变量：第一版尽量不需要。

具体 Build Command 和 Output Directory 应根据现有 VPress 项目的实际配置填写。

---

# 十一、内容维护与协作机制

## 11.1 人工收录流程

```text
发现工具
   |
   v
创建 Markdown 文件
   |
   v
填写 Frontmatter
   |
   v
编写工具介绍
   |
   v
执行内容校验
   |
   v
提交 GitHub
   |
   v
Pull Request 审核
   |
   v
合并主分支
   |
   v
自动部署上线
```

## 11.2 内容质量标准

收录工具至少满足：

1. 有明确的产品或项目名称。
2. 有可访问的官方网站或官方项目地址。
3. 有清晰的产品用途。
4. 能够归入现有分类体系。
5. 介绍内容具有实际信息价值。
6. 收费模式和开源属性尽可能经过核实。

避免：

- 仅仅因为工具使用了 AI 就收录。
- 重复收录同一产品的不同宣传页面。
- 使用没有来源的功能介绍。
- 将未核实的收费信息写成确定事实。
- 大量生成没有实际价值的 SEO 内容。

## 11.3 内容状态

建议使用以下状态：

| 状态 | 说明 |
|---|---|
| draft | 草稿，不公开 |
| review | 等待审核 |
| published | 正式发布 |
| archived | 已归档，不进入默认列表 |

---

# 十二、后续 Agent 自动收录能力

考虑到未来可以利用 Agent 自动浏览网站和整理知识，建议第一版就遵循机器可读的 Markdown 规范。

未来可以建设如下工作流：

```text
Agent 发现新工具
      |
      v
访问官方网站 / GitHub
      |
      v
提取工具信息
      |
      v
分析分类与标签
      |
      v
生成 Markdown 草稿
      |
      v
Schema 校验
      |
      v
人工审核
      |
      v
GitHub Pull Request
      |
      v
合并发布
```

Agent 不应该直接随意修改已经发布的工具内容。

建议采用：

- 新工具：生成新的 Markdown 文件。
- 信息更新：生成字段变更建议。
- 分类调整：生成分类变更建议。
- 无法确认的信息：保留原内容，不自动覆盖。
- 所有修改通过 Git Diff 审核。

Markdown Frontmatter Schema 是 Agent 与内容系统之间的契约，应该保持稳定。

---

# 十三、实施计划

建议分为三个阶段。

## 第一阶段：静态网站基础建设

1. 初始化 VPress 项目。
2. 建立网站基础布局。
3. 实现首页。
4. 实现工具列表和详情页。
5. 实现分类页面。
6. 建立 Markdown 内容规范。
7. 建立工具数据校验脚本。
8. 实现构建时索引生成。
9. 实现基础搜索。
10. 部署至 Vercel。

交付结果：一个能够正常收录、展示、搜索工具的静态网站。

## 第二阶段：内容体系完善

1. 完善一级、二级分类。
2. 建立标签字典。
3. 建立专题合集。
4. 实现高级筛选。
5. 实现本地收藏。
6. 实现工具对比。
7. 完善 SEO。
8. 建立 GitHub 工具提交流程。

交付结果：具备较完整工具发现和内容管理能力的平台。

## 第三阶段：自动化收录

1. Agent 自动发现工具。
2. Agent 浏览官方网站。
3. 提取工具结构化信息。
4. 自动生成 Markdown。
5. 执行 Schema 校验。
6. 自动生成 Pull Request。
7. 人工审核发布。

交付结果：形成半自动化的工具发现与内容运营体系。

---

# 十四、最终技术决策

第一版建议明确以下约束：

| 决策项 | 最终方案 |
|---|---|
| 内容事实来源 | Markdown |
| 工具数据组织 | 一个工具一个 Markdown |
| 结构化字段 | YAML Frontmatter |
| 正文内容 | 标准 Markdown |
| 分类关系 | 分类 ID 引用 |
| 标签管理 | 统一标签字典 |
| 内容索引 | 构建时生成 JSON |
| 搜索引擎 | MiniSearch |
| 数据库 | 不需要 |
| 后端服务 | 不需要 |
| 内容管理 | GitHub |
| 网站框架 | VPress |
| 部署 | Vercel |
| 后续自动化 | Agent + GitHub PR |

**最重要的架构原则：**

1. Markdown 是唯一内容事实来源，不维护第二份工具数据库。
2. Frontmatter 是结构化数据契约，字段必须统一。
3. Markdown Body 是展示内容，不承担分类、搜索等核心关系数据的维护职责。
4. 分类和标签采用 ID 关联，避免重复维护名称。
5. JSON 是构建产物，可以随时重新生成，不允许人工编辑。
6. 所有内容必须通过 Schema 校验后才能进入正式构建。
7. 网站展示层与内容存储层解耦，未来即使更换 VPress，也不需要重写全部内容。

最终形成一套轻量、可维护、可扩展，并且适合 Agent 自动化参与的静态工具导航平台。