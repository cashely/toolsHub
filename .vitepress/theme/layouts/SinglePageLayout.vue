<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  categories,
  publishedTools,
  matchCategory,
} from '../utils/content'
import { searchState } from '../utils/searchState'
import SideNav from '../components/SideNav.vue'
import HomeHero from '../components/HomeHero.vue'
import CategorySection from '../components/CategorySection.vue'
import SearchModal from '../components/SearchModal.vue'
import PageFooter from '../components/PageFooter.vue'

/** 只展示有工具的分类，按 sort 排序 */
const groups = computed(() =>
  categories
    .map((cat: any) => ({
      ...cat,
      tools: publishedTools.filter((t) => matchCategory(t, cat.id)),
    }))
    .filter((g) => g.tools.length > 0)
    .sort((a, b) => a.sort - b.sort),
)

const activeId = ref(groups.value[0]?.id ?? '')

let observer: IntersectionObserver | null = null

onMounted(() => {
  const els = groups.value
    .map((g) => document.getElementById(`cat-${g.id}`))
    .filter((el): el is HTMLElement => !!el)

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id.replace('cat-', '')
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  els.forEach((el) => observer!.observe(el))

  // 从二级页经 /#id 跳回时，定位到对应分类
  const hash = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (hash && groups.value.some((g) => g.id === hash)) {
    setTimeout(() => {
      document.getElementById(`cat-${hash}`)?.scrollIntoView()
    }, 80)
  }

  window.addEventListener('keydown', onGlobalKey)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('keydown', onGlobalKey)
})

function scrollToCat(id: string) {
  document
    .getElementById(`cat-${id}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchState.open = !searchState.open
  }
}
</script>

<template>
  <div class="page">
    <SideNav mode="spy" :active-id="activeId" @navigate="scrollToCat" />

    <main class="sn-main home">
      <HomeHero />

      <div class="home-body">
        <CategorySection
          v-for="g in groups"
          :key="g.id"
          :group="g"
        />

        <PageFooter />
      </div>
    </main>

    <SearchModal />
  </div>
</template>

<style scoped>
.home-body {
  padding: 36px 48px 0;
}

@media (max-width: 900px) {
  .home-body {
    padding: 28px 16px 0;
  }
}
</style>
