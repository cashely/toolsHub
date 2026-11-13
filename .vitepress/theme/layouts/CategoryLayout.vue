<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, Content } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import ToolGrid from '../components/ToolGrid.vue'
import CategoryIcon from '../components/CategoryIcon.vue'
import DocUpdated from '../components/DocUpdated.vue'
import {
  categories,
  publishedTools,
  publishedAgentItems,
  matchCategory,
  sortFeatured,
  sortAgentItems,
  AGENT_KIND_LABELS,
} from '../utils/content'
import AgentCard from '../components/AgentCard.vue'

const route = useRoute()
const activeSub = ref<string | null>(null)

const category = computed(
  () => categories.find((c: any) => c.path === route.path) ?? categories[0],
)

/** Agent 资源（Skill/MCP/插件）作为二级 tab 并入 AI 分类 */
const AGENT_KINDS = ['skill', 'mcp', 'plugin'] as const
const agentTabs = computed(() =>
  category.value.id === 'ai'
    ? AGENT_KINDS.map((kind) => ({
        id: kind,
        name: AGENT_KIND_LABELS[kind],
        items: sortAgentItems(
          publishedAgentItems.filter((a) => a.kind === kind),
        ),
      })).filter((t) => t.items.length > 0)
    : [],
)

/** 运行时重算工具数（json count 可能滞后），仅保留有工具的二级分类 */
const toolSubs = computed(() =>
  (category.value.children ?? [])
    .map((ch: any) => ({
      ...ch,
      count: publishedTools.filter((t) =>
        matchCategory(t, category.value.id, ch.id),
      ).length,
    }))
    .filter((ch: any) => ch.count > 0),
)

/** 展示顺序：AI 分类中 Agent tab 插在「AI 编程」之后 */
const tabs = computed(() => {
  const result: any[] = []
  let inserted = false
  for (const s of toolSubs.value) {
    result.push(s)
    if (category.value.id === 'ai' && s.id === 'ai-coding') {
      result.push(...agentTabs.value.map((t) => ({ id: t.id, name: t.name })))
      inserted = true
    }
  }
  if (!inserted)
    result.push(...agentTabs.value.map((t) => ({ id: t.id, name: t.name })))
  return result
})

/** 首页「更多」带 #tab-id 跳入时，直接选中对应二级 tab */
onMounted(() => {
  const h = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (h && tabs.value.some((t) => t.id === h)) {
    activeSub.value = h
  }
})

function selectSub(id: string | null) {
  activeSub.value = activeSub.value === id ? null : id
  history.replaceState(null, '', activeSub.value ? `#${activeSub.value}` : route.path)
}

const activeAgentTab = computed(() =>
  agentTabs.value.find((t) => t.id === activeSub.value),
)

const list = computed(() => {
  const result = publishedTools.filter((t) =>
    matchCategory(t, category.value.id, activeSub.value ?? undefined),
  )
  return sortFeatured(result)
})
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <nav class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/categories/">分类</a>
        <span>/</span>
        <em>{{ category.name }}</em>
      </nav>

      <header class="cat-hero">
        <div class="icon-wrap">
          <CategoryIcon :name="category.icon ?? ''" :size="28" />
        </div>
        <div class="text">
          <h1>{{ category.name }}</h1>
          <p>{{ category.description }}</p>
        </div>
        <span class="count">{{ list.length }} 个工具</span>
      </header>

      <div v-if="tabs.length" class="seg-tabs sub-row">
        <button
          class="seg-tab"
          :class="{ active: activeSub === null }"
          @click="selectSub(null)"
        >
          全部
        </button>
        <button
          v-for="t in tabs"
          :key="t.id"
          class="seg-tab"
          :class="{ active: activeSub === t.id }"
          @click="selectSub(t.id)"
        >
          {{ t.name }}
          <span v-if="t.count != null" class="tab-count">{{ t.count }}</span>
        </button>
      </div>

      <article class="td-doc content-card cat-body">
        <Content />
        <DocUpdated />
      </article>

      <div v-if="activeAgentTab" class="agent-grid">
        <AgentCard v-for="item in activeAgentTab.items" :key="item.id" :item="item" />
      </div>
      <ToolGrid v-else :tools="list" />
    </div>
  </SiteChrome>
</template>

<style scoped>
.page {
  padding-top: 32px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--td-text-muted);
}

.breadcrumb a:hover {
  color: var(--td-primary);
}

.breadcrumb em {
  font-style: normal;
  color: var(--td-text-secondary);
}

.cat-hero {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  padding: 32px;
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
}

.icon-wrap {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--td-radius-lg);
  color: #fff;
  background: var(--td-gradient-brand);
  box-shadow: var(--td-shadow-sm);
}

.text h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.text p {
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--td-text-secondary);
}

.count {
  margin-left: auto;
  font-size: 13px;
  font-weight: 600;
  color: var(--td-primary);
  background: var(--td-primary-soft);
  padding: 7px 14px;
  border-radius: var(--td-radius-pill);
  white-space: nowrap;
}

/* tab 视觉为全局 .seg-tabs，此处只保留区块间距 */
.sub-row {
  margin: 24px 0 28px;
}

/* Agent 资源网格与工具网格对齐 */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 18px;
}

.cat-body {
  margin-bottom: 28px;
  padding: 24px 32px;
}

.cat-body :deep(h1) {
  display: none;
}

@media (max-width: 640px) {
  .cat-hero {
    flex-wrap: wrap;
  }
  .count {
    margin-left: 0;
  }
}
</style>
