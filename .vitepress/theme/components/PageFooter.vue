<script setup lang="ts">
import { site } from '../utils/content'

const year = new Date().getFullYear()

const links = [
  { name: '专题合集', path: '/collections/' },
  { name: '关于', path: '/about' },
  { name: '投稿', path: '/submit' },
]
</script>

<template>
  <footer class="page-footer">
    <span>© {{ year }} {{ site.name }}</span>
    <a v-for="link in links" :key="link.path" :href="link.path">
      {{ link.name }}
    </a>
  </footer>
</template>

<style scoped>
.page-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  padding: 28px 0 12px;
  border-top: 1px solid var(--td-border);
  font-size: 12.5px;
  color: var(--td-text-muted);
}

@media (max-width: 640px) {
  .page-footer {
    padding-top: 22px;
  }
}

.page-footer a {
  color: var(--td-text-muted);
}

.page-footer a:hover {
  color: var(--td-text);
}
</style>
