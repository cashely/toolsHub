<script setup lang="ts">
import { computed, ref } from 'vue'
import SiteChrome from '../components/SiteChrome.vue'
import ToolGrid from '../components/ToolGrid.vue'
import {
  publishedTools,
  categories,
  tags,
  tagName,
  PRICING_LABELS,
} from '../utils/content'

const keyword = ref('')
const cat = ref('')
const tag = ref('')
const pricing = ref('')
const sort = ref('latest')

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  let list = publishedTools.filter((t) => {
    if (cat.value && !t.categories.some((ref) => ref.startsWith(cat.value)))
      return false
    if (tag.value && !t.tags.includes(tag.value)) return false
    if (pricing.value && t.pricing.model !== pricing.value) return false
    if (kw) {
      const hay = [
        t.name,
        t.description,
        t.tags.map(tagName).join(' '),
      ]
        .join(' ')
        .toLowerCase()
      if (!hay.includes(kw)) return false
    }
    return true
  })

  if (sort.value === 'latest') {
    list = [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  } else if (sort.value === 'featured') {
    list = [...list].sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        (a.createdAt < b.createdAt ? 1 : -1),
    )
  } else if (sort.value === 'name') {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'zh'))
  }
  return list
})

function reset() {
  keyword.value = ''
  cat.value = ''
  tag.value = ''
  pricing.value = ''
}
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <header class="page-head">
        <h1>全部工具</h1>
        <p>共收录 {{ publishedTools.length }} 个工具，按分类、标签或收费模式筛选</p>
      </header>

      <div class="filter-bar">
        <div class="search-input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input v-model="keyword" type="text" placeholder="输入关键词筛选…" />
        </div>

        <select v-model="cat" class="select">
          <option value="">全部分类</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>

        <select v-model="tag" class="select">
          <option value="">全部标签</option>
          <option v-for="t in tags" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>

        <select v-model="pricing" class="select">
          <option value="">全部收费模式</option>
          <option v-for="(label, key) in PRICING_LABELS" :key="key" :value="key">
            {{ label }}
          </option>
        </select>

        <select v-model="sort" class="select">
          <option value="latest">最新收录</option>
          <option value="featured">精选优先</option>
          <option value="name">名称排序</option>
        </select>

        <button class="reset-btn" @click="reset">重置</button>
      </div>

      <p class="result-count">找到 {{ filtered.length }} 个工具</p>

      <ToolGrid :tools="filtered" />
    </div>
  </SiteChrome>
</template>

<style scoped>
.page {
  padding-top: 48px;
}

.page-head h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.page-head p {
  margin: 8px 0 0;
  font-size: 14.5px;
  color: var(--td-text-muted);
}

.filter-bar {
  display: flex;
  gap: 10px;
  margin: 28px 0 18px;
  flex-wrap: wrap;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 220px;
  height: 40px;
  padding: 0 14px;
  color: var(--td-text-muted);
  background: var(--td-surface);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-md);
}

.search-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--td-text);
  font-size: 14px;
  font-family: inherit;
}

.select {
  height: 40px;
  padding: 0 12px;
  font-size: 13.5px;
  font-family: inherit;
  color: var(--td-text-secondary);
  background: var(--td-surface);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-md);
  outline: none;
  cursor: pointer;
}

.select:focus,
.search-input:focus-within {
  border-color: var(--td-primary);
}

.reset-btn {
  height: 40px;
  padding: 0 16px;
  font-size: 13.5px;
  color: var(--td-text-secondary);
  background: transparent;
  border: 1px dashed var(--td-border-strong);
  border-radius: var(--td-radius-md);
}

.reset-btn:hover {
  color: var(--td-primary);
  border-color: var(--td-primary);
}

.result-count {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--td-text-muted);
}
</style>
