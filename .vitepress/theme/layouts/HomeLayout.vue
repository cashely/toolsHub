<script setup lang="ts">
import { computed } from 'vue'
import SiteChrome from '../components/SiteChrome.vue'
import CategoryCard from '../components/CategoryCard.vue'
import ToolGrid from '../components/ToolGrid.vue'
import CollectionCardComponent from '../components/CollectionCard.vue'
import AgentCardComponent from '../components/AgentCard.vue'
import {
  site,
  categories,
  collections,
  publishedTools,
  publishedAgentItems,
  sortLatest,
  sortAgentItems,
  tags,
} from '../utils/content'
import { openSearch } from '../utils/searchState'

const featuredTools = computed(() =>
  publishedTools.filter((t) => t.featured).slice(0, 8),
)
const latestTools = computed(() => sortLatest(publishedTools).slice(0, 8))
const featuredCollections = computed(() =>
  collections.filter((c:any) => c.featured),
)
const featuredAgents = computed(() =>
  sortAgentItems(publishedAgentItems).slice(0, 3),
)
const hotTags = computed(() =>
  [...tags].sort((a: any, b: any) => b.count - a.count).slice(0, 8),
)
</script>

<template>
  <SiteChrome>
    <!-- Hero -->
    <section class="hero">
      <div class="td-container">
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

    <!-- Categories -->
    <section class="td-section td-container">
      <div class="td-section-head">
        <div>
          <h2 class="td-section-title">浏览分类</h2>
          <p class="td-section-sub">10 大领域，覆盖工作与创作的方方面面</p>
        </div>
        <a href="/categories/" class="td-link-more">查看全部 →</a>
      </div>
      <div class="category-grid">
        <CategoryCard v-for="cat in categories" :key="cat.id" :category="cat" />
      </div>
    </section>

    <!-- Agent ecosystem -->
    <section class="td-section section-tinted agent-section">
      <div class="td-container">
        <div class="td-section-head">
          <div>
            <h2 class="td-section-title">Agent 生态</h2>
            <p class="td-section-sub">Skill、MCP Server、插件——为 AI Agent 装上工具箱</p>
          </div>
          <a href="/agent/" class="td-link-more">进入 Agent 生态 →</a>
        </div>
        <div class="agent-grid-home">
          <AgentCardComponent
            v-for="item in featuredAgents"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section class="td-section">
      <div class="td-container">
        <div class="td-section-head">
          <div>
            <h2 class="td-section-title">精选工具</h2>
            <p class="td-section-sub">人工挑选，值得优先尝试</p>
          </div>
          <a href="/tools/" class="td-link-more">查看全部 →</a>
        </div>
        <ToolGrid :tools="featuredTools" />
      </div>
    </section>

    <!-- Latest -->
    <section class="td-section td-container">
      <div class="td-section-head">
        <div>
          <h2 class="td-section-title">最新收录</h2>
          <p class="td-section-sub">看看最近有什么新工具</p>
        </div>
        <a href="/tools/" class="td-link-more">查看全部 →</a>
      </div>
      <ToolGrid :tools="latestTools" />
    </section>

    <!-- Collections -->
    <section class="td-section section-tinted">
      <div class="td-container">
        <div class="td-section-head">
          <div>
            <h2 class="td-section-title">专题合集</h2>
            <p class="td-section-sub">按场景整理的一组好工具</p>
          </div>
          <a href="/collections/" class="td-link-more">查看全部 →</a>
        </div>
        <div class="collection-grid">
          <CollectionCardComponent
            v-for="col in featuredCollections"
            :key="col.id"
            :collection="col"
          />
        </div>
      </div>
    </section>
  </SiteChrome>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 92px 0 72px;
  text-align: center;
  background: var(--td-gradient-hero);
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
  margin: 26px 0 18px;
  font-size: clamp(38px, 6vw, 60px);
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
  font-size: 16.5px;
  line-height: 1.75;
  color: var(--td-text-secondary);
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  height: 56px;
  margin: 36px auto 0;
  padding: 0 18px;
  font-size: 15px;
  color: var(--td-text-muted);
  background: var(--td-surface);
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
  margin-top: 52px;
}

.stat strong {
  display: block;
  font-size: 30px;
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

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.section-tinted {
  background: var(--td-bg-subtle);
  border-top: 1px solid var(--td-border);
  border-bottom: 1px solid var(--td-border);
}

.section-tinted .td-container {
  /* keep width */
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.agent-grid-home {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 900px) {
  .agent-grid-home {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 56px 0 48px;
  }
  .stats {
    gap: 36px;
  }
  .desktop-break {
    display: none;
  }
}
</style>
