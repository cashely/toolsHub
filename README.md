# Tools Directory

全品类数字工具导航平台：一个工具一个 Markdown 文件，构建时校验并生成索引，无数据库、无后端，部署到 Vercel。

## 技术栈

- [VitePress](https://vitepress.dev/) + Vue 3
- Markdown + YAML Frontmatter（内容事实来源）
- Zod 校验、gray-matter 解析
- MiniSearch 本地全文搜索

## 本地开发

```bash
npm install
npm run dev
```

启动前会自动扫描内容、校验并生成 JSON 索引到 `.vitepress/theme/generated/`。

## 内容组织

```text
tools/          一个工具一个 .md（Frontmatter + 正文）
categories/     一级分类页面
collections/    专题合集
data/           categories.yaml / tags.yaml / site.yaml
scripts/        索引构建与内容校验
```

### 新增工具

1. 在 `tools/` 下新建 `{slug}.md`，参考已有文件填写 Frontmatter
2. `categories` 使用 `一级/二级` 的分类 ID 引用，`tags` 使用标签 ID
3. 运行 `npm run validate` 校验
4. 提交 PR

## 构建与部署

```bash
npm run build      # 校验 + 生成索引 + VitePress 构建
npm run preview    # 本地预览构建产物
```

Vercel 配置见 `vercel.json`，主分支推送自动部署。
