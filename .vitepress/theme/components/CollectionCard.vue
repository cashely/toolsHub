<script setup lang="ts">
defineProps<{
  collection: {
    id: string
    name: string
    description: string
    path: string
    tools: string[]
  }
}>()
</script>

<template>
  <a :href="collection.path" class="collection-card">
    <div class="bar" />
    <h3 class="name">{{ collection.name }}</h3>
    <p class="desc">{{ collection.description }}</p>
    <span class="count">{{ collection.tools.length }} 个工具</span>
  </a>
</template>

<style scoped>
.collection-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--td-card-bg);
  border: var(--td-card-border);
  border-radius: var(--td-card-radius);
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.collection-card:hover {
  transform: translateY(-3px);
  border-color: var(--td-border-strong);
  box-shadow: var(--td-shadow-md);
}

.bar {
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--td-gradient-brand);
}

.name {
  margin: 4px 0 8px;
  font-size: 17px;
  font-weight: 700;
  color: var(--td-text);
}

.desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--td-text-secondary);
}

.count {
  margin-top: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--td-primary);
}
</style>
