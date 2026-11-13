<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import {
  site,
  categories,
  publishedTools,
  matchCategory,
} from '../utils/content'
import { openSearch } from '../utils/searchState'
import CategoryIcon from './CategoryIcon.vue'

const props = withDefaults(
  defineProps<{
    /** 当前高亮分类 id */
    activeId?: string
    /** spy：同页滚动（首页）；link：跳回首页锚点（二级页） */
    mode?: 'spy' | 'link'
  }>(),
  { activeId: '', mode: 'link' },
)

const emit = defineEmits<{ (e: 'navigate', id: string): void }>()

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

const { isDark } = useData()

function onItem(id: string) {
  if (props.mode === 'spy') emit('navigate', id)
}

function toggleDark() {
  isDark.value = !isDark.value
}

/* ---------- 滑动玻璃高亮块：hover 与滚动激活共用 ---------- */
const navEl = ref<HTMLElement | null>(null)
const hoveredId = ref('')
const cursorReady = ref(false)
const cursorStyle = ref<Record<string, string>>({
  transform: 'translateY(0px)',
  height: '0px',
  opacity: '0',
})

/** 高亮跟随目标：hover 优先，否则当前激活项 */
const targetId = computed(() => hoveredId.value || props.activeId)

function moveCursor() {
  const nav = navEl.value
  if (!nav) return
  const target = targetId.value
    ? nav.querySelector<HTMLElement>(
        `.sn-cat-item[data-id="${targetId.value}"]`,
      )
    : null
  if (!target) {
    cursorStyle.value = { ...cursorStyle.value, opacity: '0' }
    return
  }
  cursorStyle.value = {
    transform: `translateY(${target.offsetTop}px)`,
    height: `${target.offsetHeight}px`,
    opacity: '1',
  }
}

function onNavOver(e: MouseEvent) {
  const item = (e.target as HTMLElement | null)?.closest<HTMLElement>(
    '.sn-cat-item',
  )
  if (item?.dataset.id) hoveredId.value = item.dataset.id
}

watch(targetId, () => nextTick(moveCursor))

onMounted(() => {
  nextTick(() => {
    moveCursor()
    cursorReady.value = true
  })
})
</script>

<template>
  <!-- 左侧导航 -->
  <aside class="sn-sidebar">
    <a href="/" class="sn-brand">
      <span class="sn-brand-mark">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fff" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.45" />
        </svg>
      </span>
      <span class="sn-brand-name">{{ site.name }}</span>
    </a>

    <nav
      ref="navEl"
      class="sn-cat-nav"
      @mouseover="onNavOver"
      @mouseleave="hoveredId = ''"
    >
      <span
        class="sn-cat-cursor"
        :class="{ ready: cursorReady }"
        :style="cursorStyle"
        aria-hidden="true"
      />
      <component
        :is="mode === 'link' ? 'a' : 'button'"
        v-for="g in groups"
        :key="g.id"
        :data-id="g.id"
        class="sn-cat-item"
        :class="{ active: activeId === g.id }"
        :href="mode === 'link' ? `/#${g.id}` : undefined"
        @click="onItem(g.id)"
      >
        <span class="sn-cat-icon">
          <CategoryIcon :name="g.icon" :size="17" />
        </span>
        <span class="sn-cat-name">{{ g.name }}</span>
        <span class="sn-cat-count">{{ g.tools.length }}</span>
      </component>
    </nav>

    <div class="sn-sidebar-bottom">
      <div class="sn-bottom-actions">
        <button class="sn-icon-btn" @click="toggleDark" aria-label="切换主题">
          <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
        <a :href="site.github" class="sn-icon-btn" aria-label="GitHub" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
          </svg>
        </a>
      </div>
    </div>
  </aside>

  <!-- 移动端顶栏 -->
  <header class="sn-mobile-header">
    <div class="sn-mobile-topbar">
      <a href="/" class="sn-brand">
        <span class="sn-brand-mark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fff" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.45" />
          </svg>
        </span>
        <span class="sn-brand-name">{{ site.name }}</span>
      </a>
      <div class="sn-mobile-actions">
        <button class="sn-icon-btn" @click="openSearch" aria-label="搜索">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
        <button class="sn-icon-btn" @click="toggleDark" aria-label="切换主题">
          <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="sn-mobile-chips">
      <component
        :is="mode === 'link' ? 'a' : 'button'"
        v-for="g in groups"
        :key="g.id"
        class="sn-chip"
        :class="{ active: activeId === g.id }"
        :href="mode === 'link' ? `/#${g.id}` : undefined"
        @click="onItem(g.id)"
      >
        {{ g.name }}
      </component>
    </div>
  </header>
</template>

<style>
/* 布局外壳：SideNav 全局样式（类名 sn- 前缀） */

.sn-main {
  margin-left: 260px;
  min-height: 100vh;
}

/* ---------------- Sidebar ---------------- */
.sn-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100vh;
  padding: 22px 14px 16px;
  background: var(--td-surface);
  backdrop-filter: var(--td-blur);
  -webkit-backdrop-filter: var(--td-blur);
  border-right: 1px solid var(--td-border);
}

.sn-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
}

.sn-brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--td-gradient-brand);
}

.sn-brand-name {
  font-size: 15.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.sn-cat-nav {
  position: relative;
  flex: 1;
  margin: 16px -14px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

/* 滑动玻璃高亮块：hover / scroll spy 共用同一块 */
.sn-cat-cursor {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: var(--td-blur-sm);
  -webkit-backdrop-filter: var(--td-blur-sm);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(99, 102, 241, 0.12);
}

.sn-cat-cursor.ready {
  transition:
    transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
}

.dark .sn-cat-cursor {
  background: rgba(255, 255, 255, 0.09);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}

.sn-cat-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 9px 12px 9px 26px;
  font-size: 14px;
  color: var(--td-text-secondary);
  background: transparent;
  border: none;
  border-radius: 0;
  text-align: left;
  text-decoration: none;
  transition: color 0.15s;
}

.sn-cat-item:hover {
  color: #3730a3;
}

.sn-cat-item.active {
  color: #3730a3;
  font-weight: 600;
}

.dark .sn-cat-item:hover,
.dark .sn-cat-item.active {
  color: #dbe2ff;
}

.sn-cat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--td-bg-subtle);
  color: var(--td-text-muted);
  flex-shrink: 0;
}

.sn-cat-item:hover .sn-cat-icon,
.sn-cat-item.active .sn-cat-icon {
  background: transparent;
  color: var(--td-primary);
}

.sn-cat-name {
  flex: 1;
}

.sn-cat-count {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--td-text-muted);
}

.sn-cat-item:hover .sn-cat-count,
.sn-cat-item.active .sn-cat-count {
  color: var(--td-primary);
}

.sn-sidebar-bottom {
  margin-top: 10px;
  padding-top: 12px;
  border-top: 1px solid var(--td-border);
}

.sn-bottom-actions {
  display: flex;
  gap: 2px;
}

.sn-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: var(--td-text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--td-radius-sm);
  transition: background 0.15s, color 0.15s;
}

.sn-icon-btn:hover {
  background: var(--td-bg-subtle);
  color: var(--td-text);
}

/* ---------------- Mobile header ---------------- */
.sn-mobile-header {
  display: none;
}

@media (max-width: 900px) {
  .sn-main {
    margin-left: 0;
  }

  .sn-sidebar {
    display: none;
  }

  .sn-mobile-header {
    display: block;
    position: sticky;
    top: 0;
    z-index: 40;
    background: color-mix(in srgb, var(--td-bg) 88%, transparent);
    backdrop-filter: saturate(180%) blur(14px);
    -webkit-backdrop-filter: saturate(180%) blur(14px);
    border-bottom: 1px solid var(--td-border);
  }

  .sn-mobile-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    padding: 0 14px;
  }

  .sn-mobile-actions {
    display: flex;
    gap: 2px;
  }

  .sn-mobile-chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 0 14px 10px;
    scrollbar-width: none;
  }

  .sn-mobile-chips::-webkit-scrollbar {
    display: none;
  }

  .sn-chip {
    flex-shrink: 0;
    padding: 6px 14px;
    font-size: 13px;
    color: var(--td-text-secondary);
    background: #ffffff;
    border: 1px solid var(--td-gray-200);
    border-radius: var(--td-radius-pill);
    text-decoration: none;
    transition: all 0.15s;
  }

  .dark .sn-chip {
    background: #1c2132;
    border-color: rgba(255, 255, 255, 0.08);
  }

  .sn-chip.active {
    color: var(--td-primary-contrast);
    background: var(--td-primary);
    border-color: var(--td-primary);
  }
}
</style>
