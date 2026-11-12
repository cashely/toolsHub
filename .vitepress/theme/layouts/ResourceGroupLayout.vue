<script setup lang="ts">
import { useData } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import DocUpdated from '../components/DocUpdated.vue'

interface ResourceItem {
  name: string
  note: string
  url: string
}
interface ResourceGroup {
  name: string
  items: ResourceItem[]
}

const { frontmatter } = useData()
// 空的 items（只含注释）会被 YAML 解析为 null，统一补成 []
const groups = ((frontmatter.value.groups ?? []) as ResourceGroup[]).map((group) => ({
  name: group.name,
  items: group.items ?? [],
}))
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <nav class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <em>{{ frontmatter.title }}</em>
      </nav>

      <header class="page-head">
        <h1>{{ frontmatter.title }}</h1>
        <p>{{ frontmatter.description }}</p>
      </header>

      <DocUpdated />

      <section
        v-for="group in groups"
        :key="group.name"
        class="group-card"
      >
        <div class="group-head">
          <h2>{{ group.name }}</h2>
          <span class="group-count">{{ group.items.length }}</span>
        </div>

        <ul v-if="group.items.length" class="item-list">
          <li v-for="item in group.items" :key="item.url">
            <a :href="item.url" target="_blank" rel="noopener">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-note">{{ item.note }}</span>
              <svg class="item-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </li>
        </ul>
        <p v-else class="empty">暂无收录</p>
      </section>
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

.page-head {
  margin: 24px 0 32px;
}

.page-head h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.page-head p {
  margin: 10px 0 0;
  font-size: 15px;
  color: var(--td-text-muted);
}

.group-card {
  margin-bottom: 20px;
  padding: 24px 28px;
  background: var(--td-surface);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
}

.group-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.group-head h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
}

.group-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--td-text-muted);
  background: var(--td-bg-subtle);
  border-radius: var(--td-radius-pill);
  padding: 2px 9px;
}

.item-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item-list li + li {
  border-top: 1px solid var(--td-border);
}

.item-list a {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 4px;
}

.item-name {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--td-text);
  flex-shrink: 0;
}

.item-list a:hover .item-name {
  color: var(--td-primary);
}

.item-note {
  font-size: 13.5px;
  color: var(--td-text-muted);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-arrow {
  flex-shrink: 0;
  color: var(--td-text-muted);
  opacity: 0;
  transform: translate(-3px, 3px);
  transition: opacity 0.15s, transform 0.15s, color 0.15s;
}

.item-list a:hover .item-arrow {
  opacity: 1;
  transform: translate(0, 0);
  color: var(--td-primary);
}

.empty {
  margin: 6px 0 2px;
  font-size: 13.5px;
  color: var(--td-text-muted);
}

@media (max-width: 640px) {
  .group-card {
    padding: 20px;
  }
}
</style>
