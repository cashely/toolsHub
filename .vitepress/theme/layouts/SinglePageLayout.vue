<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  categories,
  publishedTools,
  matchCategory,
} from '../utils/content'
import { searchState } from '../utils/searchState'
import SideNav from '../components/SideNav.vue'
import CategoryIcon from '../components/CategoryIcon.vue'
import ToolGrid from '../components/ToolGrid.vue'
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
      <section
        v-for="g in groups"
        :id="`cat-${g.id}`"
        :key="g.id"
        class="cat-section"
      >
        <header class="section-head">
          <span
            class="section-icon"
            :style="{ color: `hsl(var(--td-cat-${g.id}) 60% 48%)` }"
          >
            <CategoryIcon :name="g.icon" :size="20" />
          </span>
          <div class="heading">
            <h2>{{ g.name }}</h2>
            <p>{{ g.description }}</p>
          </div>
          <span class="section-count">{{ g.tools.length }} 个</span>
        </header>
        <ToolGrid :tools="g.tools" />
      </section>

      <PageFooter />
    </main>

    <SearchModal />
  </div>
</template>

<style scoped>
.home {
  padding: 40px 48px 0;
}

.cat-section {
  scroll-margin-top: 24px;
  padding-bottom: 64px;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--td-radius-md);
  background: var(--td-surface);
  border: 1px solid var(--td-border);
  flex-shrink: 0;
}

.heading h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.heading p {
  margin: 3px 0 0;
  font-size: 13px;
  color: var(--td-text-muted);
}

.section-count {
  margin-left: auto;
  font-size: 12.5px;
  color: var(--td-text-muted);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .home {
    padding: 28px 16px 0;
  }

  .cat-section {
    scroll-margin-top: 104px;
    padding-bottom: 44px;
  }
}
</style>
