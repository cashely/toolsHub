<script setup lang="ts">
import { site, categories } from '../utils/content'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="td-container inner">
      <div class="col brand-col">
        <a href="/" class="brand">
          <span class="brand-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fff" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.45" />
            </svg>
          </span>
          <span class="brand-name">{{ site.name }}</span>
        </a>
        <p class="about-text">{{ site.description }}</p>
      </div>

      <div class="col">
        <h4>分类</h4>
        <a v-for="cat in categories.slice(0, 6)" :key="cat.id" :href="cat.path">
          {{ cat.name }}
        </a>
      </div>

      <div class="col">
        <h4>更多</h4>
        <a href="/tools/">全部工具</a>
        <a href="/collections/">专题合集</a>
        <a href="/submit">提交工具</a>
        <a href="/about">关于</a>
      </div>

      <div class="col">
        <h4>链接</h4>
        <a :href="site.github" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <div class="td-container copyright">
      © {{ year }} {{ site.name }} · 内容基于 Markdown 与 Git 维护
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 80px;
  border-top: 1px solid var(--td-border);
  background: var(--td-bg-subtle);
}

.inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-top: 56px;
  padding-bottom: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--td-gradient-brand);
}

.brand-name {
  font-weight: 700;
}

.about-text {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--td-text-muted);
  max-width: 320px;
}

.col h4 {
  margin: 4px 0 14px;
  font-size: 13px;
  font-weight: 700;
  color: var(--td-text);
}

.col a {
  display: block;
  padding: 5px 0;
  font-size: 13.5px;
  color: var(--td-text-secondary);
}

.col a:hover {
  color: var(--td-primary);
}

.copyright {
  padding-top: 20px;
  padding-bottom: 28px;
  font-size: 12.5px;
  color: var(--td-text-muted);
  border-top: 1px solid var(--td-border);
}

@media (max-width: 760px) {
  .inner {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .brand-col {
    grid-column: 1 / -1;
  }
}
</style>
