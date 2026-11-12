<script setup lang="ts">
import SiteChrome from '../components/SiteChrome.vue'
import CategoryCard from '../components/CategoryCard.vue'
import { categories } from '../utils/content'
</script>

<template>
  <SiteChrome>
    <div class="td-container page">
      <header class="page-head">
        <h1>全部分类</h1>
        <p>{{ categories.length }} 个一级分类，找到你感兴趣的工具领域</p>
      </header>

      <div class="grid">
        <div v-for="cat in categories" :key="cat.id" class="wrap">
          <CategoryCard :category="cat" />
          <div v-if="cat.children.length" class="subs">
            <a
              v-for="sub in cat.children"
              :key="sub.id"
              :href="cat.path"
              class="sub"
            >
              {{ sub.name }}
            </a>
          </div>
        </div>
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

.subs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  padding: 0 6px;
}

.sub {
  font-size: 12px;
  color: var(--td-text-muted);
  padding: 3px 10px;
  border-radius: var(--td-radius-pill);
  background: var(--td-bg-subtle);
  border: 1px solid var(--td-border);
}

.sub:hover {
  color: var(--td-primary);
}
</style>
