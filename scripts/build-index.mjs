/**
 * 内容索引构建脚本
 *
 * 扫描 tools/ categories/ collections/ 下的 Markdown，
 * 解析 Frontmatter → Zod 校验 → 建立关联 → 生成 JSON 索引到
 * .vitepress/theme/generated/（构建产物，禁止人工编辑）。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'
import { z } from 'zod'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, '.vitepress/theme/generated')
const PUBLIC_DIR = path.join(ROOT, 'public')

// ---------- Schemas ----------

const PRICING_MODELS = ['free', 'freemium', 'paid', 'open-core', 'subscription', 'unknown']
const PLATFORMS = ['web', 'macos', 'windows', 'linux', 'ios', 'android', 'cli', 'api', 'browser-extension']
const STATUSES = ['draft', 'review', 'published', 'archived']

const AGENT_KINDS = ['skill', 'mcp', 'plugin']
const AGENT_PLATFORMS = ['claude', 'openai', 'cursor', 'windsurf', 'generic']
const AGENT_DOMAINS = [
  'dev',
  'data',
  'browser',
  'productivity',
  'search',
  'automation',
  'communication',
]
const TRANSPORTS = ['stdio', 'sse', 'streamable-http']

/** gray-matter 会把 YAML 日期解析成 JS Date，统一转回 YYYY-MM-DD */
const yamlDate = z.preprocess((v) => {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  return v
}, z.string())

const toolSchema = z.object({
  type: z.literal('tool'),
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(10),
  logo: z.string().nullable().optional(),
  website: z.string().url(),
  github: z.string().url().nullable().optional(),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()).default([]),
  pricing: z.object({
    model: z.enum(PRICING_MODELS),
    priceUrl: z.string().url().nullable().optional(),
  }),
  platforms: z.array(z.enum(PLATFORMS)).default([]),
  openSource: z.boolean(),
  status: z.enum(STATUSES),
  featured: z.boolean().default(false),
  developer: z.string().optional(),
  language: z.array(z.string()).default([]),
  createdAt: yamlDate,
  updatedAt: yamlDate,
}).strip()

const categorySchema = z.object({
  type: z.literal('category'),
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
  sort: z.number().default(0),
}).strip()

const collectionSchema = z.object({
  type: z.literal('collection'),
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  cover: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  sort: z.number().default(0),
  createdAt: yamlDate,
  updatedAt: yamlDate,
  tools: z.array(z.string()).min(1),
}).strip()

/** Agent 生态条目（Skill / MCP Server / 插件） */
const agentItemSchema = z
  .object({
    type: z.literal('agent'),
    kind: z.enum(AGENT_KINDS),
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(10),
    logo: z.string().nullable().optional(),
    website: z.string().url(),
    github: z.string().url().nullable().optional(),
    platforms: z.array(z.enum(AGENT_PLATFORMS)).min(1),
    domain: z.enum(AGENT_DOMAINS),
    tags: z.array(z.string()).default([]),
    developer: z.string().optional(),
    official: z.boolean().default(false),
    featured: z.boolean().default(false),
    status: z.enum(STATUSES),
    createdAt: yamlDate,
    updatedAt: yamlDate,
    // MCP 专属
    transport: z.enum(TRANSPORTS).optional(),
    command: z.string().nullable().optional(),
    url: z.string().url().nullable().optional(),
    // Skill 专属
    install: z.string().optional(),
    // 插件专属
    host: z.string().optional(),
    marketplaceUrl: z.string().url().nullable().optional(),
  })
  .strip()
  .superRefine((item, ctx) => {
    if (item.kind === 'mcp') {
      if (!item.transport) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['transport'], message: 'MCP 条目必须声明 transport' })
      } else if (item.transport === 'stdio' && !item.command) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['command'], message: 'stdio 类型 MCP 必须提供 command' })
      } else if (item.transport !== 'stdio' && !item.url) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['url'], message: `${item.transport} 类型 MCP 必须提供 url` })
      }
    }
    if (item.kind === 'skill' && !item.install) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['install'], message: 'Skill 条目必须提供 install 安装方式' })
    }
    if (item.kind === 'plugin' && !item.host) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['host'], message: '插件条目必须提供 host 宿主' })
    }
  })

// ---------- Helpers ----------

function readYaml(rel) {
  return parseYaml(fs.readFileSync(path.join(ROOT, rel), 'utf-8'))
}

function scanMarkdown(dir) {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const raw = fs.readFileSync(path.join(abs, f), 'utf-8')
      const { data, content } = matter(raw)
      return { file: path.join(dir, f), data, content }
    })
}

let errors = []
function fail(file, msg) {
  errors.push(`${file}: ${msg}`)
}

// ---------- Load dictionaries ----------

const site = readYaml('data/site.yaml')
const categoryDict = readYaml('data/categories.yaml')
const tagDict = readYaml('data/tags.yaml')

const topIds = new Set(categoryDict.map((c) => c.id))
const subIndex = new Map() // subId -> parentId
for (const top of categoryDict) {
  for (const sub of top.children ?? []) {
    subIndex.set(sub.id, top.id)
  }
}
const tagIds = new Set(tagDict.map((t) => t.id))

// ---------- Validate & collect categories ----------

const categories = []
for (const { file, data } of scanMarkdown('categories')) {
  const parsed = categorySchema.safeParse(data)
  if (!parsed.success) {
    fail(file, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
    continue
  }
  const cat = parsed.data
  const dictEntry = categoryDict.find((c) => c.id === cat.id)
  if (!dictEntry) fail(file, `分类 id "${cat.id}" 未在 data/categories.yaml 中定义`)
  categories.push({ ...cat, ...(dictEntry ? { children: dictEntry.children } : {}) })
}
categories.sort((a, b) => a.sort - b.sort)

// ---------- Validate & collect tools ----------

const tools = []
const seenIds = new Set()
const seenSlugs = new Set()

for (const { file, data } of scanMarkdown('tools')) {
  const parsed = toolSchema.safeParse(data)
  if (!parsed.success) {
    fail(file, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
    continue
  }
  const tool = parsed.data

  if (seenIds.has(tool.id)) fail(file, `工具 id "${tool.id}" 重复`)
  seenIds.add(tool.id)
  if (seenSlugs.has(tool.slug)) fail(file, `slug "${tool.slug}" 重复`)
  seenSlugs.add(tool.slug)

  for (const ref of tool.categories) {
    const [top, sub] = ref.split('/')
    if (!topIds.has(top)) fail(file, `引用了不存在的一级分类 "${top}"`)
    else if (sub) {
      if (subIndex.get(sub) !== top) fail(file, `二级分类 "${sub}" 不属于一级分类 "${top}"`)
    }
  }
  for (const tag of tool.tags) {
    if (!tagIds.has(tag)) fail(file, `引用了未在 data/tags.yaml 中定义的标签 "${tag}"`)
  }
  if (tool.logo && !fs.existsSync(path.join(PUBLIC_DIR, tool.logo))) {
    fail(file, `logo 文件不存在 public${tool.logo}`)
  }
  if (tool.description.length > 120) {
    fail(file, `description 过长（${tool.description.length} 字），建议 50~100 字`)
  }

  if (tool.status !== 'draft') {
    tools.push({
      ...tool,
      github: tool.github ?? null,
      logo: tool.logo ?? null,
      path: `/tools/${tool.slug}`,
    })
  }
}

// ---------- Validate & collect collections ----------

const collections = []
for (const { file, data } of scanMarkdown('collections')) {
  const parsed = collectionSchema.safeParse(data)
  if (!parsed.success) {
    fail(file, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
    continue
  }
  const col = parsed.data
  for (const toolId of col.tools) {
    if (!seenIds.has(toolId)) fail(file, `合集引用了不存在的工具 id "${toolId}"`)
  }
  collections.push({ ...col, path: `/collections/${col.slug}` })
}
collections.sort((a, b) => a.sort - b.sort)

// ---------- Validate & collect agent items ----------

const AGENT_DIRS = [
  { kind: 'skill', dir: 'agent/skills', prefix: '/agent/skills' },
  { kind: 'mcp', dir: 'agent/mcps', prefix: '/agent/mcps' },
  { kind: 'plugin', dir: 'agent/plugins', prefix: '/agent/plugins' },
]

const agentItems = []
const agentSeenIds = new Set()
const agentSeenPaths = new Set()

for (const { kind, dir, prefix } of AGENT_DIRS) {
  for (const { file, data } of scanMarkdown(dir)) {
    const parsed = agentItemSchema.safeParse({ ...data, kind: data.kind ?? kind })
    if (!parsed.success) {
      fail(file, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
      continue
    }
    const item = parsed.data
    if (item.kind !== kind) fail(file, `kind "${item.kind}" 与所在目录 ${dir} 不匹配`)

    if (agentSeenIds.has(item.id)) fail(file, `Agent 条目 id "${item.id}" 重复`)
    agentSeenIds.add(item.id)
    const fullPath = `${prefix}/${item.slug}`
    if (agentSeenPaths.has(fullPath)) fail(file, `路径 "${fullPath}" 重复`)
    agentSeenPaths.add(fullPath)

    if (item.logo && !fs.existsSync(path.join(PUBLIC_DIR, item.logo))) {
      fail(file, `logo 文件不存在 public${item.logo}`)
    }
    if (item.description.length > 120) {
      fail(file, `description 过长（${item.description.length} 字），建议 50~100 字`)
    }

    if (item.status !== 'draft') {
      agentItems.push({
        ...item,
        github: item.github ?? null,
        logo: item.logo ?? null,
        command: item.command ?? null,
        url: item.url ?? null,
        install: item.install ?? null,
        host: item.host ?? null,
        marketplaceUrl: item.marketplaceUrl ?? null,
        path: fullPath,
      })
    }
  }
}

// ---------- Build enriched indexes ----------

const tagName = new Map(tagDict.map((t) => [t.id, t.name]))
const catName = new Map()
for (const top of categoryDict) {
  catName.set(top.id, top.name)
  for (const sub of top.children ?? []) catName.set(sub.id, sub.name)
}

const publicTools = tools.filter((t) => t.status === 'published')

// counts
const catCounts = {}
const tagCounts = {}
const bump = (m, k) => (m[k] = (m[k] ?? 0) + 1)
for (const t of publicTools) {
  // 同一工具可挂多个子类，顶级/子类计数各按工具去重，避免重复计数
  const tops = new Set()
  const subs = new Set()
  for (const ref of t.categories) {
    const [top, sub] = ref.split('/')
    tops.add(top)
    if (sub) subs.add(sub)
  }
  tops.forEach((k) => bump(catCounts, k))
  subs.forEach((k) => bump(catCounts, k))
  new Set(t.tags).forEach((k) => bump(tagCounts, k))
}

const categoriesOut = categories.map((c) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  description: c.description,
  icon: c.icon ?? null,
  sort: c.sort,
  path: `/categories/${c.slug}`,
  count: catCounts[c.id] ?? 0,
  children: (c.children ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    count: catCounts[s.id] ?? 0,
  })),
}))

const tagsOut = tagDict.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  count: tagCounts[t.id] ?? 0,
}))

const collectionsOut = collections.map((c) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  description: c.description,
  cover: c.cover ?? null,
  featured: c.featured,
  sort: c.sort,
  path: c.path,
  tools: c.tools,
}))

// ---------- Report ----------

if (errors.length) {
  console.error(`\n✗ 内容校验失败，共 ${errors.length} 个问题：\n`)
  for (const e of errors) console.error(`  - ${e}`)
  console.error('')
  process.exit(1)
}

const publicAgentItems = agentItems.filter((a) => a.status === 'published')

console.log(
  `\n校验通过：${publicTools.length} 个发布工具 / ${categoriesOut.length} 个分类 / ${collectionsOut.length} 个合集 / ${publicAgentItems.length} 个 Agent 条目`,
)

if (process.env.VALIDATE_ONLY) {
  console.log('')
  process.exit(0)
}

fs.mkdirSync(OUT_DIR, { recursive: true })
const write = (name, payload) => {
  fs.writeFileSync(path.join(OUT_DIR, name), JSON.stringify(payload, null, 2) + '\n')
  console.log(`  ✓ generated/${name}`)
}

console.log('\n生成内容索引：')
write('site.json', site)
write('categories.json', categoriesOut)
write('tags.json', tagsOut)
write('tools.json', tools)
write('collections.json', collectionsOut)
write('agent-items.json', agentItems)
console.log('')
