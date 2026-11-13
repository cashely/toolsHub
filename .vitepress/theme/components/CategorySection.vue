<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  matchCategory,
  publishedAgentItems,
  sortAgentItems,
  AGENT_KIND_LABELS,
} from '../utils/content'
import CategoryIcon from './CategoryIcon.vue'
import ToolGrid from './ToolGrid.vue'
import AgentCard from './AgentCard.vue'

const props = defineProps<{ group: any }>()

/** 首页每个分类区块最多展示的卡片数，超出出现「更多」入口 */
const LIMIT = 8

/** 当前选中的二级 tab id，空串表示「全部」 */
const activeSub = ref('')

/** 仅保留当前确实有工具的二级分类（json count 可能滞后，运行时重算） */
const subs = computed(() =>
  (props.group.children ?? [])
    .map((ch: any) => ({
      ...ch,
      tools: props.group.tools.filter((t: any) =>
        matchCategory(t, props.group.id, ch.id),
      ),
    }))
    .filter((ch: any) => ch.tools.length > 0),
)

/** Agent 资源（Skill/MCP/插件）作为二级 tab 并入 AI 分类 */
const AGENT_KINDS = ['skill', 'mcp', 'plugin'] as const
const agentTabs = computed(() =>
  props.group.id === 'ai'
    ? AGENT_KINDS.map((kind) => ({
        id: kind,
        name: AGENT_KIND_LABELS[kind],
        items: sortAgentItems(
          publishedAgentItems.filter((a) => a.kind === kind),
        ),
      })).filter((t) => t.items.length > 0)
    : [],
)

/** 展示顺序：工具二级分类原序，AI 分类中 Agent tab 插在「AI 编程」之后 */
interface Tab {
  id: string
  name: string
  count: number
  agent?: boolean
}
const tabs = computed<Tab[]>(() => {
  const result: Tab[] = []
  let inserted = false
  for (const s of subs.value) {
    result.push({ id: s.id, name: s.name, count: s.tools.length })
    if (s.id === 'ai-coding') {
      result.push(
        ...agentTabs.value.map((t) => ({
          id: t.id,
          name: t.name,
          count: t.items.length,
          agent: true,
        })),
      )
      inserted = true
    }
  }
  if (!inserted)
    result.push(
      ...agentTabs.value.map((t) => ({
        id: t.id,
        name: t.name,
        count: t.items.length,
        agent: true,
      })),
    )
  return result
})

/** 只有一个二级 tab 时切换条无意义 */
const showTabs = computed(() => tabs.value.length >= 2)

const activeAgentTab = computed(() =>
  agentTabs.value.find((t) => t.id === activeSub.value),
)

const visibleTools = computed(() =>
  activeSub.value && !activeAgentTab.value
    ? props.group.tools.filter((t: any) =>
        matchCategory(t, props.group.id, activeSub.value),
      )
    : props.group.tools,
)

const cappedTools = computed(() => visibleTools.value.slice(0, LIMIT))
const hasMore = computed(() => visibleTools.value.length > LIMIT)
const moreHref = computed(
  () => props.group.path + (activeSub.value ? `#${activeSub.value}` : ''),
)

function selectSub(id: string) {
  activeSub.value = activeSub.value === id ? '' : id
}
</script>

<template>
  <section :id="`cat-${group.id}`" class="cat-section">
    <header class="section-head">
      <span
        class="section-icon"
        :style="{ color: `hsl(var(--td-cat-${group.id}) 60% 48%)` }"
      >
        <CategoryIcon :name="group.icon" :size="20" />
      </span>
      <div class="heading">
        <h2>{{ group.name }}</h2>
        <p>{{ group.description }}</p>
      </div>
      <span class="section-count">{{ group.tools.length }} 个</span>
    </header>

    <!-- 二级分类：整条圆角 segmented tabs，位于标题下方、卡片上方 -->
    <div v-if="showTabs" class="seg-tabs sub-nav-margin">
      <button
        class="seg-tab"
        :class="{ active: activeSub === '' }"
        @click="activeSub = ''"
      >
        全部
        <span class="tab-count">{{ group.tools.length }}</span>
      </button>
      <button
        v-for="t in tabs"
        :key="t.id"
        class="seg-tab"
        :class="{ active: activeSub === t.id }"
        @click="selectSub(t.id)"
      >
        {{ t.name }}
        <span class="tab-count">{{ t.count }}</span>
      </button>
    </div>

    <!-- Agent 资源 tab：直接展示对应条目 -->
    <div v-if="activeAgentTab" class="agent-grid">
      <AgentCard v-for="item in activeAgentTab.items" :key="item.id" :item="item" />
    </div>
    <ToolGrid v-else :tools="cappedTools">
      <a v-if="hasMore" :href="moreHref" class="more-card">
        <span class="more-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </span>
        <span class="more-text">查看更多</span>
        <span class="more-count">全部 {{ visibleTools.length }} 个</span>
      </a>
    </ToolGrid>
  </section>
</template>

<style scoped>
.cat-section {
  scroll-margin-top: 24px;
  padding-bottom: 64px;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--td-radius-md);
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border: 1px solid var(--td-border);
  flex-shrink: 0;
}

.heading h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.heading p {
  margin: 3px 0 0;
  font-size: 13px;
  color: var(--td-text-muted);
}

.section-count {
  margin-left: auto;
  font-size: 12.5px;
  color: var(--td-text-muted);
  flex-shrink: 0;
}

/* ---------------- 二级分类 tab 间距（样式见全局 .seg-tabs） ---------------- */
.sub-nav-margin {
  margin: -6px 0 20px;
}

/* Agent 资源网格与工具网格对齐 */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 18px;
}

/* ---------------- 「更多」卡片 ---------------- */
.more-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 168px;
  padding: 20px;
  border: 1.5px dashed var(--td-border-strong);
  border-radius: var(--td-card-radius);
  color: var(--td-text-secondary);
  text-decoration: none;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.more-card:hover {
  border-color: var(--td-primary);
  border-style: solid;
  color: var(--td-primary);
  background: var(--td-primary-soft);
}

.more-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--td-bg-subtle);
  transition: background 0.18s ease;
}

.more-card:hover .more-arrow {
  background: var(--td-primary-soft);
}

.more-text {
  font-size: 14px;
  font-weight: 700;
}

.more-count {
  font-size: 12px;
  color: var(--td-text-muted);
}

.more-card:hover .more-count {
  color: var(--td-primary);
}

@media (max-width: 900px) {
  .cat-section {
    scroll-margin-top: 104px;
    padding-bottom: 44px;
  }
}
</style>
