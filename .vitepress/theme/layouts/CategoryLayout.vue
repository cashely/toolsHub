<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, Content } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import ToolGrid from '../components/ToolGrid.vue'
import CategoryIcon from '../components/CategoryIcon.vue'
import DocUpdated from '../components/DocUpdated.vue'
import { categories, publishedTools, matchCategory, sortFeatured } from '../utils/content'

const route = useRoute()
const activeSub = ref<string | null>(null)

const category = computed(
  () => categories.find((c: any) => c.path === route.path) ?? categories[0],
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

      <div v-if="category.children.length" class="sub-row">
        <button
          class="sub-chip"
          :class="{ active: activeSub === null }"
          @click="activeSub = null"
        >
          全部
        </button>
        <button
          v-for="sub in category.children"
          :key="sub.id"
          class="sub-chip"
          :class="{ active: activeSub === sub.id }"
          @click="activeSub = activeSub === sub.id ? null : sub.id"
        >
          {{ sub.name }}
          <span class="sub-count">{{ sub.count }}</span>
        </button>
      </div>

      <article class="td-doc content-card cat-body">
        <Content />
        <DocUpdated />
      </article>

      <ToolGrid :tools="list" />
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

.sub-row {
  display: flex;
  gap: 8px;
  margin: 24px 0 28px;
  flex-wrap: wrap;
}

.sub-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--td-text-secondary);
  background: var(--td-surface);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-pill);
  transition: all 0.15s;
}

.sub-chip:hover {
  border-color: var(--td-border-strong);
}

.sub-chip.active {
  color: #fff;
  background: var(--td-gradient-brand);
  border-color: transparent;
}

.sub-chip.active .sub-count {
  color: rgba(255, 255, 255, 0.85);
}

.sub-count {
  font-size: 11.5px;
  color: var(--td-text-muted);
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
