<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="tag-badge">{{ label }}</span>
</template>

<style scoped>
.tag-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  font-size: 12px;
  font-weight: 500;
  color: var(--td-text-secondary);
  background: var(--td-gray-100);
  border: 1px solid var(--td-gray-200);
  border-radius: var(--td-radius-pill);
  white-space: nowrap;
}

.dark .tag-badge {
  background: #202536;
  border-color: rgba(255, 255, 255, 0.07);
}
</style>
