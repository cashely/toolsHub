<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'
import { site } from '../utils/content'
import { openSearch } from '../utils/searchState'

const { isDark } = useData()
const route = useData()
const mobileOpen = ref(false)

function isActive(path: string): boolean {
  const current = route.page.value.relativePath
    .replace(/^index\.md$/, '')
    .replace(/\.md$/, '')
  const currentPath = `/${current}`
  if (path === '/') return currentPath === '/'
  return currentPath.startsWith(path)
}

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<template>
  <header class="app-header">
    <div class="td-container inner">
      <a href="/" class="brand">
        <span class="brand-mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fff" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.7" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#fff" opacity="0.45" />
          </svg>
        </span>
        <span class="brand-name">{{ site.name }}</span>
      </a>

      <nav class="nav-desktop">
        <a
          v-for="item in site.navigation"
          :key="item.path"
          :href="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.name }}
        </a>
      </nav>

      <div class="actions">
        <button class="search-trigger" @click="openSearch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span class="search-text">搜索工具</span>
          <kbd>⌘K</kbd>
        </button>

        <button class="icon-btn" @click="toggleDark" aria-label="切换主题">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>

        <a :href="site.github" class="icon-btn desktop-only" aria-label="GitHub" target="_blank" rel="noopener">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
          </svg>
        </a>

        <button class="icon-btn mobile-only" @click="mobileOpen = !mobileOpen" aria-label="菜单">
          <svg v-if="!mobileOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-if="mobileOpen" class="nav-mobile" @click="mobileOpen = false">
      <a
        v-for="item in site.navigation"
        :key="item.path"
        :href="item.path"
        class="mobile-link"
      >
        {{ item.name }}
      </a>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--td-bg) 82%, transparent);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid var(--td-border);
}

.inner {
  display: flex;
  align-items: center;
  gap: 20px;
  height: var(--td-header-height);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--td-gradient-brand);
  box-shadow: var(--td-shadow-sm);
}

.brand-name {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
}

.nav-desktop {
  display: flex;
  gap: 2px;
  margin-left: 12px;
}

.nav-link {
  padding: 7px 13px;
  font-size: 14px;
  font-weight: 500;
  color: var(--td-text-secondary);
  border-radius: var(--td-radius-sm);
  transition: color 0.15s, background 0.15s;
}

.nav-link:hover {
  color: var(--td-text);
}

.nav-link.active {
  color: var(--td-primary);
  background: var(--td-primary-soft);
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.search-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 10px 0 12px;
  font-size: 13px;
  color: var(--td-text-muted);
  background: var(--td-surface);
  border: 1px solid var(--td-border);
  border-radius: var(--td-radius-md);
  transition: border-color 0.15s;
}

.search-trigger:hover {
  border-color: var(--td-border-strong);
  color: var(--td-text-secondary);
}

.search-trigger kbd {
  font-family: var(--td-font-sans);
  font-size: 11px;
  padding: 2px 6px;
  border: 1px solid var(--td-border);
  border-radius: 5px;
  background: var(--td-bg-subtle);
  color: var(--td-text-muted);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--td-text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--td-radius-md);
  transition: background 0.15s, color 0.15s;
}

.icon-btn:hover {
  background: var(--td-bg-subtle);
  color: var(--td-text);
}

.nav-mobile {
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  border-bottom: 1px solid var(--td-border);
}

.mobile-link {
  padding: 12px 8px;
  font-size: 15px;
  font-weight: 500;
  color: var(--td-text-secondary);
  border-radius: var(--td-radius-sm);
}

.mobile-link:hover {
  background: var(--td-bg-subtle);
}

.mobile-only {
  display: none;
}

@media (max-width: 860px) {
  .nav-desktop {
    display: none;
  }
  .mobile-only {
    display: flex;
  }
  .search-text {
    display: none;
  }
}

@media (max-width: 560px) {
  .desktop-only {
    display: none;
  }
  .search-trigger kbd {
    display: none;
  }
}
</style>
