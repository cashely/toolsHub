import toolsData from '../generated/tools.json'
import categoriesData from '../generated/categories.json'
import tagsData from '../generated/tags.json'
import siteData from '../generated/site.json'
import collectionsData from '../generated/collections.json'
import agentItemsData from '../generated/agent-items.json'

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  logo: string | null
  website: string
  github: string | null
  categories: string[]
  tags: string[]
  pricing: { model: string; priceUrl?: string | null }
  platforms: string[]
  openSource: boolean
  status: string
  featured: boolean
  developer?: string
  createdAt: string
  updatedAt: string
  path: string
}

export interface AgentItem {
  id: string
  kind: 'skill' | 'mcp' | 'plugin'
  name: string
  slug: string
  description: string
  logo: string | null
  website: string
  github: string | null
  platforms: string[]
  domain: string
  tags: string[]
  developer?: string
  official: boolean
  featured: boolean
  status: string
  createdAt: string
  updatedAt: string
  transport?: string
  command: string | null
  url: string | null
  install: string | null
  host: string | null
  marketplaceUrl: string | null
  path: string
}

export const tools = toolsData as Tool[]
export const publishedTools = tools.filter((t) => t.status === 'published')
export const categories = categoriesData
export const tags = tagsData
export const site = siteData
export const collections = collectionsData
export const agentItems = agentItemsData as AgentItem[]
export const publishedAgentItems = agentItems.filter((a) => a.status === 'published')

export const AGENT_KIND_LABELS: Record<string, string> = {
  skill: 'Skill',
  mcp: 'MCP Server',
  plugin: '插件',
}

export const AGENT_PLATFORM_LABELS: Record<string, string> = {
  claude: 'Claude',
  openai: 'ChatGPT',
  cursor: 'Cursor',
  windsurf: 'Windsurf',
  generic: '通用',
}

export const AGENT_DOMAIN_LABELS: Record<string, string> = {
  dev: '开发',
  data: '数据',
  browser: '浏览器',
  productivity: '办公',
  search: '搜索计算',
  automation: '自动化',
  communication: '团队协作',
}

export const TRANSPORT_LABELS: Record<string, string> = {
  stdio: 'stdio（本地进程）',
  sse: 'SSE（远程）',
  'streamable-http': 'Streamable HTTP（远程）',
}

export const PRICING_LABELS: Record<string, string> = {
  free: '完全免费',
  freemium: '免费增值',
  paid: '付费',
  'open-core': '开源核心',
  subscription: '订阅制',
  unknown: '价格未知',
}

export const PLATFORM_LABELS: Record<string, string> = {
  web: 'Web',
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  ios: 'iOS',
  android: 'Android',
  cli: 'CLI',
  api: 'API',
  'browser-extension': '浏览器插件',
}

export function tagName(id: string): string {
  return tags.find((t: any) => t.id === id)?.name ?? id
}

export function categoryName(id: string): string {
  return categories.find((c: any) => c.id === id)?.name ?? id
}

export function primaryCategory(tool: Tool): string {
  return tool.categories[0]?.split('/')[0] ?? ''
}

/** 名称首字母 / 前两字，用于无 logo 时的占位图标 */
export function initials(name: string): string {
  const trimmed = name.trim()
  if (/[一-鿿]/.test(trimmed)) return trimmed.slice(0, 2)
  const letters = trimmed.split(/\s+/).map((w) => w[0])
  return letters.slice(0, 2).join('').toUpperCase()
}

/** 工具按分类引用匹配（同时支持一级和二级匹配） */
export function matchCategory(tool: Tool, topId: string, subId?: string): boolean {
  return tool.categories.some((ref) => {
    const [top, sub] = ref.split('/')
    if (subId) return top === topId && sub === subId
    return top === topId
  })
}

export const sortLatest = (list: Tool[]) =>
  [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

export const sortFeatured = (list: Tool[]) =>
  [...list].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      (a.createdAt < b.createdAt ? 1 : -1),
  )

export const sortAgentItems = (list: AgentItem[]) =>
  [...list].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      (a.createdAt < b.createdAt ? 1 : -1),
  )
