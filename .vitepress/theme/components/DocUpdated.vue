<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

// 优先取 frontmatter.updated 手动覆盖，否则用 VitePress 从 git 读取的最后提交时间
const dateText = computed(() => {
  const raw = frontmatter.value.updated ?? page.value.lastUpdated
  if (!raw) return null
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return null
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
})
</script>

<template>
  <p v-if="dateText" class="doc-updated">文档更新时间：{{ dateText }}</p>
</template>

<style scoped>
.doc-updated {
  margin: 20px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--td-border);
  font-size: 12.5px;
  color: var(--td-text-muted);
}
</style>
