<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, Content } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import ToolGrid from '../components/ToolGrid.vue'
import TagBadge from '../components/TagBadge.vue'
import {
  publishedTools,
  matchCategory,
  primaryCategory,
  tagName,
  categoryName,
  initials,
  PRICING_LABELS,
  PLATFORM_LABELS,
} from '../utils/content'

const route = useRoute()
const tool = computed(
  () => publishedTools.find((t) => t.path === route.path) ?? publishedTools[0],
)

const related = computed(() => {
  const top = primaryCategory(tool.value)
  return publishedTools
    .filter((t) => t.id !== tool.value.id && matchCategory(t, top))
    .slice(0, 4)
})
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <nav class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <a :href="`/categories/${primaryCategory(tool)}`">
          {{ categoryName(primaryCategory(tool)) }}
        </a>
        <span>/</span>
        <em>{{ tool.name }}</em>
      </nav>

      <!-- 工具头部 -->
      <header class="tool-hero">
        <div class="logo-tile">
          <img v-if="tool.logo" :src="tool.logo" :alt="tool.name" />
          <span v-else>{{ initials(tool.name) }}</span>
        </div>
        <div class="title-block">
          <h1>{{ tool.name }}</h1>
          <p v-if="tool.developer" class="developer">{{ tool.developer }}</p>
        </div>
        <div class="hero-actions">
          <a
            :href="tool.website"
            target="_blank"
            rel="noopener sponsored"
            class="btn-primary"
          >
            访问官网
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <a
            v-if="tool.github"
            :href="tool.github"
            target="_blank"
            rel="noopener"
            class="btn-ghost"
          >
            GitHub
          </a>
          <a
            v-if="tool.pricing.priceUrl"
            :href="tool.pricing.priceUrl"
            target="_blank"
            rel="noopener"
            class="btn-ghost"
          >
            查看价格
          </a>
        </div>
      </header>

      <div class="layout">
        <!-- 正文 -->
        <article class="td-doc content-card">
          <Content />
        </article>

        <!-- 侧边信息 -->
        <aside class="sidebar">
          <div class="side-card">
            <h4>基本信息</h4>
            <dl>
              <dt>收费模式</dt>
              <dd>{{ PRICING_LABELS[tool.pricing.model] }}</dd>
              <dt>是否开源</dt>
              <dd>{{ tool.openSource ? '开源' : '闭源' }}</dd>
              <dt v-if="tool.developer">开发商</dt>
              <dd v-if="tool.developer">{{ tool.developer }}</dd>
              <dt>收录时间</dt>
              <dd>{{ tool.createdAt }}</dd>
              <dt>更新时间</dt>
              <dd>{{ tool.updatedAt }}</dd>
            </dl>
          </div>

          <div v-if="tool.platforms.length" class="side-card">
            <h4>支持平台</h4>
            <div class="platform-list">
              <span v-for="p in tool.platforms" :key="p" class="platform">
                {{ PLATFORM_LABELS[p] }}
              </span>
            </div>
          </div>

          <div v-if="tool.tags.length" class="side-card">
            <h4>标签</h4>
            <div class="tag-list">
              <TagBadge v-for="t in tool.tags" :key="t" :label="tagName(t)" />
            </div>
          </div>
        </aside>
      </div>

      <section v-if="related.length" class="related">
        <h2 class="td-section-title">相关工具</h2>
        <ToolGrid :tools="related" />
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

.tool-hero {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  padding: 28px;
  background: var(--td-surface);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
  box-shadow: var(--td-shadow-xs);
}

.logo-tile {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: var(--td-radius-lg);
  background: var(--td-gradient-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  overflow: hidden;
}

.logo-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-block h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.developer {
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--td-text-muted);
}

.hero-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
  flex-shrink: 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--td-gradient-brand);
  border-radius: var(--td-radius-md);
  box-shadow: var(--td-shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s;
}

.btn-primary:hover {
  box-shadow: var(--td-shadow-lg);
  transform: translateY(-1px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--td-text-secondary);
  background: var(--td-bg-subtle);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-md);
}

.btn-ghost:hover {
  border-color: var(--td-border-strong);
  color: var(--td-text);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 24px;
  margin-top: 24px;
  align-items: start;
}

.content-card {
  padding: 32px 36px;
  background: var(--td-surface);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
}

.sidebar {
  position: sticky;
  top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.side-card {
  padding: 20px 22px;
  background: var(--td-surface);
  border: var(--td-card-border);
  border-radius: var(--td-radius-lg);
}

.side-card h4 {
  margin: 0 0 12px;
  font-size: 13.5px;
  font-weight: 700;
}

.side-card dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  margin: 0;
  font-size: 13.5px;
}

.side-card dt {
  color: var(--td-text-muted);
}

.side-card dd {
  margin: 0;
  text-align: right;
  color: var(--td-text-secondary);
  font-weight: 500;
}

.platform-list,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.platform {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--td-radius-pill);
  color: var(--td-primary);
  background: var(--td-primary-soft);
}

.related {
  margin-top: 56px;
}

.related h2 {
  margin-bottom: 20px;
}

@media (max-width: 920px) {
  .tool-hero {
    flex-wrap: wrap;
  }
  .hero-actions {
    margin-left: 0;
    width: 100%;
  }
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
  }
}

@media (max-width: 560px) {
  .content-card {
    padding: 24px 20px;
  }
  .hero-actions {
    flex-wrap: wrap;
  }
}
</style>
