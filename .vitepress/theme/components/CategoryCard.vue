<script setup lang="ts">
import CategoryIcon from './CategoryIcon.vue'

defineProps<{
  category: {
    id: string
    name: string
    description: string
    icon: string | null
    count: number
    path: string
  }
}>()
</script>

<template>
  <a :href="category.path" class="category-card">
    <div class="icon-wrap">
      <CategoryIcon :name="category.icon ?? ''" :size="24" />
    </div>
    <h3 class="name">{{ category.name }}</h3>
    <p class="desc">{{ category.description }}</p>
    <span class="count">{{ category.count }} 个工具</span>
  </a>
</template>

<style scoped>
.category-card {
  display: block;
  padding: 24px;
  background: var(--td-card-bg);
  border: var(--td-card-border);
  border-radius: var(--td-card-radius);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: var(--td-border-strong);
  box-shadow: var(--td-shadow-md);
}

.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--td-radius-md);
  color: #fff;
  background: var(--td-gradient-brand);
  margin-bottom: 14px;
}

.name {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 700;
  color: var(--td-text);
}

.desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--td-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.count {
  display: inline-block;
  margin-top: 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--td-primary);
}
</style>
