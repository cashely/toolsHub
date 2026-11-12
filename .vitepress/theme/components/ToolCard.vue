<script setup lang="ts">
import { computed } from 'vue'
import type { Tool } from '../utils/content'
import { initials, primaryCategory, tagName, PRICING_LABELS } from '../utils/content'
import TagBadge from './TagBadge.vue'

const props = defineProps<{ tool: Tool }>()

const hueVar = computed(() => `--td-cat-${primaryCategory(props.tool)}`)
</script>

<template>
  <a :href="tool.path" class="tool-card">
    <div class="card-top">
      <div class="logo-tile" :style="{ '--h': `var(${hueVar})` }">
        <img v-if="tool.logo" :src="tool.logo" :alt="tool.name" />
        <span v-else>{{ initials(tool.name) }}</span>
      </div>
      <div class="title-wrap">
        <h3 class="name">{{ tool.name }}</h3>
        <span v-if="tool.developer" class="developer">{{ tool.developer }}</span>
      </div>
      <svg
        v-if="tool.featured"
        class="featured"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="精选"
      >
        <path
          d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11 5.52.44c.5.04.7.66.32.99l-4.2 3.6 1.28 5.38c.12.49-.41.86-.84.61L12 17.03l-4.73 2.6c-.43.25-.96-.12-.84-.61l1.28-5.38-4.2-3.6c-.38-.33-.18-.95.32-.99l5.52-.44L11.48 3.5z"
        />
      </svg>
    </div>

    <p class="desc">{{ tool.description }}</p>

    <div class="meta-row">
      <span class="pricing" :class="tool.pricing.model">{{ PRICING_LABELS[tool.pricing.model] }}</span>
      <span class="spacer" />
      <TagBadge
        v-for="tag in tool.tags.slice(0, 2)"
        :key="tag"
        :label="tagName(tag)"
      />
    </div>
  </a>
</template>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--td-card-bg);
  border: var(--td-card-border);
  border-radius: var(--td-card-radius);
  box-shadow: var(--td-shadow-xs);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.tool-card:hover {
  transform: translateY(-3px);
  border-color: var(--td-border-strong);
  box-shadow: var(--td-shadow-md);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--td-radius-md);
  background: hsl(var(--h, 250) 62% 54%);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.02em;
  overflow: hidden;
}

.logo-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-wrap {
  min-width: 0;
}

.name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--td-text);
}

.developer {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: var(--td-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.featured {
  margin-left: auto;
  color: #f59e0b;
  flex-shrink: 0;
}

.desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--td-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 4px;
  flex-wrap: wrap;
}

.spacer {
  flex: 1;
}

.pricing {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--td-radius-pill);
}

.pricing.free {
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
}

.pricing.freemium,
.pricing.open-core {
  color: #2563eb;
  background: rgba(59, 130, 246, 0.12);
}

.pricing.paid,
.pricing.subscription {
  color: #d97706;
  background: rgba(245, 158, 11, 0.12);
}

.pricing.unknown {
  color: var(--td-text-muted);
  background: var(--td-bg-subtle);
}
</style>
