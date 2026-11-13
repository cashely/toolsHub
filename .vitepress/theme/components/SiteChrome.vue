<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import SideNav from './SideNav.vue'
import PageFooter from './PageFooter.vue'
import SearchModal from './SearchModal.vue'
import { searchState } from '../utils/searchState'
import { publishedTools, primaryCategory } from '../utils/content'

const route = useRoute()

/** 根据当前路径推断所属分类，用于侧栏高亮 */
const activeId = computed(() => {
  const p = route.path
  const cat = p.match(/^\/categories\/([^/]+)/)
  if (cat) return cat[1]
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
    <slot />
    <div class="td-container">
      <PageFooter />
    </div>
  </main>
  <SearchModal />
</template>
