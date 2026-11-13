<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import SideNav from './SideNav.vue'
import PageFooter from './PageFooter.vue'
import SearchModal from './SearchModal.vue'
import SearchTrigger from './SearchTrigger.vue'
import { searchState } from '../utils/searchState'
import { publishedTools, primaryCategory } from '../utils/content'

const route = useRoute()

/** 根据当前路径推断所属分类，用于侧栏高亮 */
const activeId = computed(() => {
  const p = route.path
  const cat = p.match(/^\/categories\/([^/]+)/)
  if (cat) return cat[1]
  // Skill/MCP/插件详情页已归入 AI 分类
  if (p.startsWith('/agent/')) return 'ai'
  if (p.startsWith('/tools/')) {
    const tool = publishedTools.find((t) => t.path === p)
    return tool ? primaryCategory(tool) : ''
  }
  return ''
})

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchState.open = !searchState.open
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <SideNav mode="link" :active-id="activeId" />
  <main class="sn-main">
    <div class="td-container sn-topbar">
      <SearchTrigger />
    </div>
    <slot />
    <div class="td-container">
      <PageFooter />
    </div>
  </main>
  <SearchModal />
</template>

<style scoped>
.sn-topbar {
  padding-top: 20px;
}

.sn-topbar :deep(.st-trigger) {
  max-width: 320px;
}

/* 移动端顶栏已有搜索入口，不重复展示 */
@media (max-width: 900px) {
  .sn-topbar {
    display: none;
  }
}
</style>
