<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SiteChrome from '../components/SiteChrome.vue'
import AgentCard from '../components/AgentCard.vue'
import {
  publishedAgentItems,
  sortAgentItems,
  AGENT_KIND_LABELS,
  AGENT_PLATFORM_LABELS,
  AGENT_DOMAIN_LABELS,
} from '../utils/content'

type Kind = 'skill' | 'mcp' | 'plugin'

const KINDS = ['skill', 'mcp', 'plugin'] as const

// 初始固定 skill，保证 SSR 与首次 hydration 一致；
// hash 深链在 mounted 后再切换（VitePress 的 route 对象不含 hash）
const activeKind = ref<Kind>('skill')
const activePlatform = ref<string | null>(null)
const activeDomain = ref<string | null>(null)

const PLATFORMS = ['claude', 'openai', 'cursor', 'windsurf', 'generic']
const DOMAINS = Object.keys(AGENT_DOMAIN_LABELS)

const syncFromHash = () => {
  const kind = window.location.hash.replace('#', '') as Kind
  if (KINDS.includes(kind) && kind !== activeKind.value) {
    activeKind.value = kind
    activeDomain.value = null
  }
}

onMounted(() => {
  syncFromHash()
  window.addEventListener('hashchange', syncFromHash)
})
onUnmounted(() => window.removeEventListener('hashchange', syncFromHash))

function kindCount(kind: string) {
  return publishedAgentItems.filter((a) => a.kind === kind).length
}

const list = computed(() => {
  const result = publishedAgentItems.filter(
    (a) =>
      a.kind === activeKind.value &&
      (activePlatform.value === null || a.platforms.includes(activePlatform.value)) &&
      (activeDomain.value === null || a.domain === activeDomain.value),
  )
  return sortAgentItems(result)
})

function switchKind(kind: Kind) {
  activeKind.value = kind
  activeDomain.value = null
  history.replaceState(null, '', `#${kind}`)
}
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <nav class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <em>Agent 生态</em>
      </nav>

      <header class="hub-hero">
        <h1>Agent 生态</h1>
        <p>
          面向 AI Agent 的 Skill、MCP Server 与插件，
          覆盖 Claude、ChatGPT、Cursor、Windsurf 等主流平台。
        </p>
      </header>

      <!-- 类型 Tabs -->
      <div class="kind-tabs" role="tablist">
        <button
          v-for="kind in KINDS"
          :key="kind"
          class="kind-tab"
          :class="{ active: activeKind === kind }"
          role="tab"
          @click="switchKind(kind)"
        >
          {{ AGENT_KIND_LABELS[kind] }}
          <span class="tab-count">{{ kindCount(kind) }}</span>
        </button>
      </div>

      <!-- 平台筛选 -->
      <div class="filter-row">
        <span class="filter-label">平台</span>
        <button
          class="filter-chip"
          :class="{ active: activePlatform === null }"
          @click="activePlatform = null"
        >
          全部
        </button>
        <button
          v-for="p in PLATFORMS"
          :key="p"
          class="filter-chip"
          :class="{ active: activePlatform === p }"
          @click="activePlatform = activePlatform === p ? null : p"
        >
          {{ AGENT_PLATFORM_LABELS[p] }}
        </button>
      </div>

      <!-- 功能分类筛选 -->
      <div class="filter-row">
        <span class="filter-label">分类</span>
        <button
          class="filter-chip"
          :class="{ active: activeDomain === null }"
          @click="activeDomain = null"
        >
          全部
        </button>
        <button
          v-for="d in DOMAINS"
          :key="d"
          class="filter-chip"
          :class="{ active: activeDomain === d }"
          @click="activeDomain = activeDomain === d ? null : d"
        >
          {{ AGENT_DOMAIN_LABELS[d] }}
        </button>
      </div>

      <!-- 卡片网格 -->
      <div v-if="list.length" class="agent-grid">
        <AgentCard v-for="item in list" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty">
        当前筛选条件下暂无条目，换个平台或分类试试。
      </div>
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

.hub-hero {
  margin-top: 24px;
  padding: 36px 32px;
  border-radius: var(--td-radius-xl);
  color: #fff;
  background: var(--td-gradient-brand);
  position: relative;
  overflow: hidden;
}

.hub-hero::after {
  content: '';
  position: absolute;
  right: -70px;
  bottom: -90px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.hub-hero h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.hub-hero p {
  margin: 10px 0 0;
  font-size: 14.5px;
  opacity: 0.92;
  max-width: 560px;
}

.kind-tabs {
  display: flex;
  gap: 6px;
  margin: 28px 0 20px;
  padding: 5px;
  background: var(--td-bg-subtle);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-lg);
  width: fit-content;
}

.kind-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--td-text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--td-radius-md);
  transition: all 0.18s;
}

.kind-tab:hover {
  color: var(--td-text);
}

.kind-tab.active {
  color: #fff;
  background: var(--td-gradient-brand);
  box-shadow: var(--td-shadow-sm);
}

.tab-count {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.75;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--td-text-muted);
  width: 36px;
  flex-shrink: 0;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--td-text-secondary);
  background: var(--td-surface);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-pill);
  transition: all 0.15s;
}

.filter-chip:hover {
  border-color: var(--td-border-strong);
}

.filter-chip.active {
  color: #fff;
  background: var(--td-gradient-brand);
  border-color: transparent;
}

.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.empty {
  margin-top: 48px;
  padding: 48px 0;
  text-align: center;
  font-size: 14px;
  color: var(--td-text-muted);
}

@media (max-width: 640px) {
  .kind-tabs {
    width: 100%;
  }
  .kind-tab {
    flex: 1;
    justify-content: center;
    padding: 0 12px;
  }
}
</style>
