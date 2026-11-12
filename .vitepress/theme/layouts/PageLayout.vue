<script setup lang="ts">
import { Content } from 'vitepress'
import SiteChrome from '../components/SiteChrome.vue'
import DocUpdated from '../components/DocUpdated.vue'
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <article class="td-doc content-card">
        <Content />
        <DocUpdated />
      </article>
    </div>
  </SiteChrome>
</template>

<style scoped>
.page {
  padding-top: 48px;
}

.content-card {
  max-width: 780px;
  margin: 0 auto;
  padding: 40px 48px;
  background: var(--td-surface);
  border: var(--td-card-border);
  border-radius: var(--td-radius-xl);
}

@media (max-width: 640px) {
  .content-card {
    padding: 28px 22px;
  }
}
</style>
