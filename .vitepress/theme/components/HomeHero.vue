<script setup lang="ts">
import { computed } from 'vue'
import {
  categories,
  collections,
  publishedTools,
  tags,
} from '../utils/content'
import { openSearch } from '../utils/searchState'

const hotTags = computed(() =>
  [...tags].sort((a: any, b: any) => b.count - a.count).slice(0, 8),
)
</script>

<template>
  <section class="hero">
    <div class="td-container hero-content">
      <div class="hero-badge">
        <span class="dot" />
        已收录 {{ publishedTools.length }}+ 优质工具
      </div>
      <h1 class="hero-title">
        发现真正好用的<br />
        <span class="gradient-text">数字工具</span>
      </h1>
      <p class="hero-sub">
        AI、开发、设计、办公、营销……全品类工具一站直达，<br class="desktop-break" />
        搜索、筛选、比较，快速找到适合你的那一个。
      </p>

      <button class="hero-search" @click="openSearch">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span>搜索工具、标签或分类…</span>
        <kbd>⌘ K</kbd>
      </button>

      <div class="hot-tags">
        <span class="hot-label">热门：</span>
        <a v-for="tag in hotTags" :key="tag.id" href="/tools/" class="hot-tag">
          {{ tag.name }}
        </a>
      </div>

      <div class="stats">
        <div class="stat">
          <strong>{{ publishedTools.length }}</strong>
          <span>工具</span>
        </div>
        <div class="stat">
          <strong>{{ categories.length }}</strong>
          <span>一级分类</span>
        </div>
        <div class="stat">
          <strong>{{ collections.length }}</strong>
          <span>专题合集</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 72px 0 56px;
  text-align: center;
  background: var(--td-gradient-hero);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--td-text-secondary);
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-pill);
  box-shadow: var(--td-shadow-xs);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
}

.hero-title {
  margin: 24px 0 16px;
  font-size: clamp(36px, 5.5vw, 56px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.gradient-text {
  background: var(--td-gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: var(--td-text-secondary);
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  height: 54px;
  margin: 32px auto 0;
  padding: 0 18px;
  font-size: 15px;
  color: var(--td-text-muted);
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-lg);
  box-shadow: var(--td-shadow-md);
  transition: box-shadow 0.2s, border-color 0.2s;
}

.hero-search:hover {
  border-color: var(--td-primary);
  box-shadow: var(--td-shadow-lg);
}

.hero-search span {
  flex: 1;
  text-align: left;
}

.hero-search kbd {
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid var(--td-border);
  border-radius: 6px;
  background: var(--td-bg-subtle);
  color: var(--td-text-muted);
}

.hot-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.hot-label {
  font-size: 13px;
  color: var(--td-text-muted);
}

.hot-tag {
  font-size: 12.5px;
  padding: 4px 12px;
  color: var(--td-text-secondary);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-pill);
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  transition: all 0.15s;
}

.hot-tag:hover {
  color: var(--td-primary);
  border-color: var(--td-primary);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 56px;
  margin-top: 44px;
}

.stat strong {
  display: block;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--td-gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat span {
  font-size: 13px;
  color: var(--td-text-muted);
}

@media (max-width: 640px) {
  .hero {
    padding: 48px 0 40px;
  }

  .stats {
    gap: 36px;
  }

  .desktop-break {
    display: none;
  }
}
</style>
