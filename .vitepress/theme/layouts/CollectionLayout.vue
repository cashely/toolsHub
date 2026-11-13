<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import ToolGrid from '../components/ToolGrid.vue'
import { collections, publishedTools } from '../utils/content'
import DocUpdated from '../components/DocUpdated.vue'

const route = useRoute()

const collection = computed(
  () => collections.find((c: any) => c.path === route.path) ?? collections[0],
)

const list = computed(() => {
  const byId = new Map(publishedTools.map((t) => [t.id, t]))
  return collection.value.tools.map((id: string) => byId.get(id)).filter(Boolean)
})
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <nav class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/collections/">专题</a>
        <span>/</span>
        <em>{{ collection.name }}</em>
      </nav>

      <header class="col-hero">
        <h1>{{ collection.name }}</h1>
        <p>{{ collection.description }}</p>
        <span class="count">{{ list.length }} 个工具</span>
      </header>

      <DocUpdated class="col-updated" />

      <div class="td-doc content-card list-card">
        <h2>本合集包含</h2>
        <ol class="tool-order">
          <li v-for="(t, i) in list" :key="t.id">
            <span class="idx">{{ i + 1 }}</span>
            <a :href="t.path">{{ t.name }}</a>
          </li>
        </ol>
      </div>

      <ToolGrid class="full-grid" :tools="list" />
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

.col-hero {
  position: relative;
  margin-top: 24px;
  padding: 40px 36px;
  border-radius: var(--td-radius-xl);
  color: #fff;
  background: var(--td-gradient-brand);
  overflow: hidden;
}

.col-hero::after {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.col-hero h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.col-hero p {
  margin: 10px 0 0;
  font-size: 14.5px;
  opacity: 0.9;
  max-width: 560px;
}

.count {
  display: inline-block;
  margin-top: 18px;
  font-size: 12.5px;
  font-weight: 600;
  padding: 5px 13px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: var(--td-radius-pill);
}

.col-updated {
  margin: 14px 4px 0;
}

.list-card {
  margin-top: 24px;
}

.content-card {
  padding: 28px 32px;
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
}

.content-card h2 {
  margin-top: 0;
}

.tool-order {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: none;
}

.tool-order li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--td-border);
}

.tool-order li:last-child {
  border-bottom: none;
}

.idx {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  font-size: 12px;
  font-weight: 700;
  color: var(--td-primary);
  background: var(--td-primary-soft);
  border-radius: 50%;
}

.tool-order a {
  color: var(--td-text);
  font-weight: 500;
  font-size: 14px;
}

.tool-order a:hover {
  color: var(--td-primary);
}

.full-grid {
  margin-top: 40px;
}

</style>
