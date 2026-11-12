<script setup lang="ts">
import type { Tool } from '../utils/content'
import ToolCard from './ToolCard.vue'

defineProps<{ tools: Tool[] }>()
</script>

<template>
  <div v-if="tools.length" class="tool-grid">
    <ToolCard v-for="tool in tools" :key="tool.id" :tool="tool" />
  </div>
  <div v-else class="empty">没有符合条件的工具</div>
</template>

<style scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  gap: 18px;
}

.empty {
  padding: 64px 0;
  text-align: center;
  color: var(--td-text-muted);
  font-size: 14px;
}
</style>
