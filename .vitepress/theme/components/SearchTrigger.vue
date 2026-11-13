<script setup lang="ts">
import { openSearch } from '../utils/searchState'
</script>

<template>
  <button class="st-trigger" @click="openSearch">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <span>搜索工具…</span>
    <kbd>⌘K</kbd>
  </button>
</template>

<style scoped>
.st-trigger {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 13px;
  color: var(--td-text-muted);
  background: var(--td-bg-subtle);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-md);
  transition: border-color 0.15s, color 0.15s;
}

.st-trigger:hover {
  border-color: var(--td-border-strong);
  color: var(--td-text-secondary);
}

.st-trigger span {
  flex: 1;
  text-align: left;
}

.st-trigger kbd {
  font-size: 11px;
  padding: 2px 6px;
  border: 1px solid var(--td-border);
  border-radius: 5px;
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  color: var(--td-text-muted);
}
</style>
