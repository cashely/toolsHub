<script setup lang="ts">
import SiteChrome from '../components/SiteChrome.vue'
import CollectionCard from '../components/CollectionCard.vue'
import { collections } from '../utils/content'
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <header class="page-head">
        <h1>专题合集</h1>
        <p>人工整理的场景化工具集合，一次发现一组好工具</p>
      </header>

      <div class="grid">
        <CollectionCard
          v-for="col in collections"
          :key="col.id"
          :collection="col"
        />
      </div>
    </div>
  </SiteChrome>
</template>

<style scoped>
.page {
  padding-top: 48px;
}

.page-head h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.page-head p {
  margin: 8px 0 0;
  font-size: 14.5px;
  color: var(--td-text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
  margin-top: 32px;
}
</style>
