<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import MiniSearch from 'minisearch'
import {
  publishedTools,
  publishedAgentItems,
  tagName,
  categoryName,
  AGENT_KIND_LABELS,
  AGENT_PLATFORM_LABELS,
  AGENT_DOMAIN_LABELS,
} from '../utils/content'
import type { Tool, AgentItem } from '../utils/content'
import { searchState } from '../utils/searchState'

const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const selected = ref(0)

interface SearchEntry {
  id: string
  path: string
  name: string
  description: string
  tags: string
  categories: string
  featured: boolean
  entryType: 'tool' | 'agent'
  kind: string
}

let mini: MiniSearch | null = null

/** 英文/数字单词 + 中文按字二元切分，兼顾中文匹配 */
function cjkTokenize(text: string): string[] {
  const tokens: string[] = []
  const latin = text.toLowerCase().match(/[a-z0-9]+/g) ?? []
  tokens.push(...latin)
  const chars = text.match(/[一-鿿]/g) ?? []
  for (let i = 0; i < chars.length; i++) {
    tokens.push(chars[i])
    if (i < chars.length - 1) tokens.push(chars[i] + chars[i + 1])
  }
  return tokens
}

function ensureIndex() {
  if (mini) return
  mini = new MiniSearch({
    idField: 'id',
    fields: ['name', 'tags', 'categories', 'description'],
    fieldOptions: {
      name: { weight: 5 },
      tags: { weight: 3 },
      categories: { weight: 2 },
      description: { weight: 1 },
    },
    tokenize: cjkTokenize,
    searchOptions: {
      prefix: true,
      boost: { featured: 1.5 },
      combineWith: 'AND',
    },
  })

  const toolDocs: SearchEntry[] = publishedTools.map((t) => ({
    id: `tool:${t.id}`,
    path: t.path,
    name: t.name,
    description: t.description,
    tags: t.tags.map(tagName).join(' '),
    categories: t.categories
      .map((ref) => ref.split('/').map(categoryName).join(' '))
      .join(' '),
    featured: t.featured,
    entryType: 'tool',
    kind: '',
  }))

  const agentDocs: SearchEntry[] = publishedAgentItems.map((a) => ({
    id: `agent:${a.id}`,
    path: a.path,
    name: a.name,
    description: a.description,
    tags: a.tags.join(' '),
    categories: [
      AGENT_KIND_LABELS[a.kind],
      AGENT_DOMAIN_LABELS[a.domain],
      ...a.platforms.map((p) => AGENT_PLATFORM_LABELS[p]),
    ].join(' '),
    featured: a.featured,
    entryType: 'agent',
    kind: a.kind,
  }))

  mini.addAll([...toolDocs, ...agentDocs])
  entryIndex = new Map(
    [...toolDocs, ...agentDocs].map((d) => [d.id, d]),
  )
}

let entryIndex: Map<string, SearchEntry> = new Map()
const results = ref<SearchEntry[]>([])

function search() {
  if (!query.value.trim()) {
    results.value = []
    return
  }
  ensureIndex()
  const ids = mini!.search(query.value, { fuzzy: 0.15 }).slice(0, 12).map((r) => r.id)
  results.value = ids.map((id) => entryIndex.get(id)!).filter(Boolean)
  selected.value = 0
}

watch(
  () => searchState.open,
  async (open) => {
    if (open) {
      query.value = ''
      results.value = []
      await nextTick()
      inputEl.value?.focus()
    }
  },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    searchState.open = false
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    selected.value = Math.min(selected.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selected.value = Math.max(selected.value - 1, 0)
  } else if (e.key === 'Enter' && results.value[selected.value]) {
    window.location.href = results.value[selected.value].path
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="searchState.open" class="overlay" @click.self="searchState.open = false">
      <div class="panel" @keydown="onKeydown">
        <div class="input-row">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            placeholder="搜索工具、Skill、MCP、插件…"
            @input="search"
          />
          <button class="close" @click="searchState.open = false">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div class="result-list">
          <a
            v-for="(entry, i) in results"
            :key="entry.id"
            :href="entry.path"
            class="result-item"
            :class="{ selected: i === selected }"
            @mouseenter="selected = i"
          >
            <div class="r-title">
              {{ entry.name }}
              <span v-if="entry.entryType === 'agent'" class="r-kind">
                {{ AGENT_KIND_LABELS[entry.kind] }}
              </span>
            </div>
            <div class="r-desc">{{ entry.description }}</div>
          </a>
          <div v-if="query && !results.length" class="no-result">
            没有找到与「{{ query }}」相关的工具或 Agent 资源
          </div>
          <div v-if="!query" class="hint">
            支持名称、描述、标签和分类搜索，按 <kbd>ESC</kbd> 关闭
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(10, 12, 20, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12vh 20px 20px;
}

.panel {
  width: 100%;
  max-width: 620px;
  background: #ffffff;
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-lg);
  box-shadow: var(--td-shadow-lg);
  overflow: hidden;
}

.dark .panel {
  background: #171b28;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--td-border);
  color: var(--td-text-muted);
}

.input-row input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--td-text);
  font-size: 15px;
  font-family: inherit;
}

.close {
  display: flex;
  border: none;
  background: transparent;
  color: var(--td-text-muted);
  padding: 4px;
  border-radius: 6px;
}

.close:hover {
  background: var(--td-bg-subtle);
}

.result-list {
  max-height: 420px;
  overflow-y: auto;
  padding: 8px;
}

.result-item {
  display: block;
  padding: 10px 12px;
  border-radius: var(--td-radius-md);
}

.result-item.selected {
  background: var(--td-primary-soft);
}

.r-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--td-text);
}

.r-kind {
  margin-left: 7px;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: var(--td-radius-pill);
  color: var(--td-primary);
  background: var(--td-primary-soft);
  vertical-align: 1px;
}

.r-desc {
  margin-top: 3px;
  font-size: 12.5px;
  color: var(--td-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-result,
.hint {
  padding: 28px 12px;
  text-align: center;
  font-size: 13px;
  color: var(--td-text-muted);
}

.hint kbd {
  font-size: 11px;
  padding: 1px 6px;
  border: 1px solid var(--td-border);
  border-radius: 5px;
  background: var(--td-bg-subtle);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.18s ease;
}

.modal-enter-active .panel,
.modal-leave-active .panel {
  transition: transform 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .panel,
.modal-leave-to .panel {
  transform: translateY(-14px) scale(0.98);
}
</style>
