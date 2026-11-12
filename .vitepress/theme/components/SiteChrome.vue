<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import SearchModal from './SearchModal.vue'
import { searchState } from '../utils/searchState'

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
  <AppHeader />
  <main>
    <slot />
  </main>
  <AppFooter />
  <SearchModal />
</template>
