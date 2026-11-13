<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, Content } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import AgentCard from '../components/AgentCard.vue'
import TagBadge from '../components/TagBadge.vue'
import {
  publishedAgentItems,
  AGENT_KIND_LABELS,
  AGENT_PLATFORM_LABELS,
  AGENT_DOMAIN_LABELS,
  TRANSPORT_LABELS,
  initials,
  tagName,
} from '../utils/content'

const route = useRoute()
const item = computed(
  () => publishedAgentItems.find((a) => a.path === route.path) ?? publishedAgentItems[0],
)

const related = computed(() =>
  publishedAgentItems
    .filter((a) => a.id !== item.value.id && a.kind === item.value.kind && a.domain === item.value.domain)
    .slice(0, 3),
)

const hueByKind: Record<string, number> = {
  skill: 239,
  mcp: 262,
  plugin: 303,
}
</script>

<template>
  <SiteChrome>
    <div class="td-container page" :style="{ '--kind-h': hueByKind[item.kind] }">
      <nav class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/categories/ai">AI 与智能</a>
        <span>/</span>
        <em>{{ item.name }}</em>
      </nav>

      <header class="item-hero">
        <div class="logo-tile">
          <img v-if="item.logo" :src="item.logo" :alt="item.name" />
          <span v-else>{{ initials(item.name) }}</span>
        </div>
        <div class="title-block">
          <div class="title-line">
            <h1>{{ item.name }}</h1>
            <span class="kind-badge">{{ AGENT_KIND_LABELS[item.kind] }}</span>
            <span v-if="item.official" class="official">官方</span>
          </div>
          <p v-if="item.developer" class="developer">{{ item.developer }}</p>
        </div>
        <div class="hero-actions">
          <a
            :href="item.website"
            target="_blank"
            rel="noopener sponsored"
            class="btn-primary"
          >
            查看官方资源
          </a>
          <a
            v-if="item.github"
            :href="item.github"
            target="_blank"
            rel="noopener"
            class="btn-ghost"
          >
            GitHub
          </a>
          <a
            v-if="item.marketplaceUrl"
            :href="item.marketplaceUrl"
            target="_blank"
            rel="noopener"
            class="btn-ghost"
          >
            前往市场
          </a>
        </div>
      </header>

      <div class="layout">
        <article class="td-doc content-card">
          <Content />
        </article>

        <aside class="sidebar">
          <div class="side-card">
            <h4>基本信息</h4>
            <dl>
              <dt>类型</dt>
              <dd>{{ AGENT_KIND_LABELS[item.kind] }}</dd>
              <dt>功能分类</dt>
              <dd>{{ AGENT_DOMAIN_LABELS[item.domain] }}</dd>
              <dt v-if="item.developer">开发者</dt>
              <dd v-if="item.developer">{{ item.developer }}</dd>
              <dt>收录时间</dt>
              <dd>{{ item.createdAt }}</dd>
              <dt>更新时间</dt>
              <dd>{{ item.updatedAt }}</dd>
            </dl>
          </div>

          <div class="side-card">
            <h4>兼容平台</h4>
            <div class="platform-list">
              <span v-for="p in item.platforms" :key="p" class="platform">
                {{ AGENT_PLATFORM_LABELS[p] }}
              </span>
            </div>
          </div>

          <!-- MCP 专属信息 -->
          <div v-if="item.kind === 'mcp'" class="side-card">
            <h4>接入方式</h4>
            <dl class="mcp-dl">
              <dt>传输方式</dt>
              <dd>{{ TRANSPORT_LABELS[item.transport!] }}</dd>
            </dl>
            <div v-if="item.command" class="cmd-block">
              <div class="cmd-label">启动命令</div>
              <code>{{ item.command }}</code>
            </div>
            <div v-if="item.url" class="cmd-block">
              <div class="cmd-label">服务 URL</div>
              <code>{{ item.url }}</code>
            </div>
          </div>

          <!-- Skill 专属信息 -->
          <div v-if="item.kind === 'skill' && item.install" class="side-card">
            <h4>安装方式</h4>
            <p class="install-text">{{ item.install }}</p>
          </div>

          <!-- 插件专属信息 -->
          <div v-if="item.kind === 'plugin'" class="side-card">
            <h4>宿主信息</h4>
            <dl>
              <dt>宿主</dt>
              <dd>{{ item.host }}</dd>
            </dl>
            <a
              v-if="item.marketplaceUrl"
              :href="item.marketplaceUrl"
              target="_blank"
              rel="noopener"
              class="market-link"
            >
              在市场中打开 →
            </a>
          </div>

          <div v-if="item.tags.length" class="side-card">
            <h4>标签</h4>
            <div class="tag-list">
              <TagBadge v-for="t in item.tags" :key="t" :label="tagName(t)" />
            </div>
          </div>
        </aside>
      </div>

      <section v-if="related.length" class="related">
        <h2 class="td-section-title">同类推荐</h2>
        <div class="related-grid">
          <AgentCard v-for="r in related" :key="r.id" :item="r" />
        </div>
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

.item-hero {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  padding: 28px;
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
  box-shadow: var(--td-shadow-xs);
}

.logo-tile {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: var(--td-radius-lg);
  background: hsl(var(--kind-h) 62% 54%);
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

.title-block {
  min-width: 0;
}

.title-line {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.title-line h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.kind-badge {
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--td-radius-pill);
  color: hsl(var(--kind-h) 72% 45%);
  background: hsl(var(--kind-h) 72% 52% / 0.13);
}

:global(.dark) .kind-badge {
  color: hsl(var(--kind-h) 80% 72%);
}

.official {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--td-radius-pill);
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
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
  height: 40px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: hsl(var(--kind-h) 65% 54%);
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
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
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
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
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
  color: hsl(var(--kind-h) 70% 45%);
  background: hsl(var(--kind-h) 72% 52% / 0.1);
}

.cmd-block {
  margin-top: 12px;
}

.cmd-label {
  font-size: 12px;
  color: var(--td-text-muted);
  margin-bottom: 5px;
}

.cmd-block code {
  display: block;
  font-family: var(--td-font-mono);
  font-size: 12px;
  line-height: 1.6;
  padding: 9px 11px;
  border-radius: var(--td-radius-sm);
  background: var(--td-bg-subtle);
  color: var(--td-text-secondary);
  word-break: break-all;
}

.install-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--td-text-secondary);
}

.market-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: hsl(var(--kind-h) 70% 50%);
}

.related {
  margin-top: 56px;
}

.related h2 {
  margin-bottom: 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

@media (max-width: 920px) {
  .item-hero {
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
