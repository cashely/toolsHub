<script setup lang="ts">
import type { AgentItem } from '../utils/content'
import {
  initials,
  AGENT_KIND_LABELS,
  AGENT_PLATFORM_LABELS,
  AGENT_DOMAIN_LABELS,
} from '../utils/content'

const props = defineProps<{ item: AgentItem }>()

const hueByKind: Record<string, number> = {
  skill: 239,
  mcp: 262,
  plugin: 303,
}
</script>

<template>
  <a
    :href="item.path"
    class="agent-card"
    :style="{ '--kind-h': hueByKind[item.kind] }"
  >
    <div class="badge-row">
      <span class="kind-badge">{{ AGENT_KIND_LABELS[item.kind] }}</span>
      <span v-if="item.official" class="official">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        官方
      </span>
      <span class="domain">{{ AGENT_DOMAIN_LABELS[item.domain] }}</span>
    </div>

    <div class="card-top">
      <div class="logo-tile">
        <img v-if="item.logo" :src="item.logo" :alt="item.name" />
        <span v-else>{{ initials(item.name) }}</span>
      </div>
      <div class="title-wrap">
        <h3 class="name">{{ item.name }}</h3>
        <span v-if="item.developer" class="developer">{{ item.developer }}</span>
      </div>
    </div>

    <p class="desc">{{ item.description }}</p>

    <div class="meta-row">
      <div class="platforms">
        <span
          v-for="p in item.platforms.slice(0, 3)"
          :key="p"
          class="platform"
        >
          {{ AGENT_PLATFORM_LABELS[p] }}
        </span>
        <span v-if="item.platforms.length > 3" class="platform more">
          +{{ item.platforms.length - 3 }}
        </span>
      </div>
      <span v-if="item.kind === 'mcp' && item.transport" class="transport">
        {{ item.transport }}
      </span>
    </div>
  </a>
</template>

<style scoped>
.agent-card {
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

.agent-card:hover {
  transform: translateY(-3px);
  border-color: hsl(var(--kind-h) 70% 60%);
  box-shadow: var(--td-shadow-md);
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.kind-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 3px 9px;
  border-radius: var(--td-radius-pill);
  color: hsl(var(--kind-h) 72% 45%);
  background: hsl(var(--kind-h) 72% 52% / 0.13);
}

:global(.dark) .kind-badge {
  color: hsl(var(--kind-h) 80% 72%);
}

.official {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  color: #059669;
}

.domain {
  margin-left: auto;
  font-size: 11.5px;
  color: var(--td-text-muted);
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
  background: hsl(var(--kind-h) 62% 54%);
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
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.platforms {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.platform {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: var(--td-radius-pill);
  color: var(--td-text-secondary);
  background: var(--td-bg-subtle);
  border: 1px solid var(--td-border);
}

.platform.more {
  color: var(--td-text-muted);
}

.transport {
  margin-left: auto;
  font-family: ui-monospace, var(--td-font-mono);
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  color: hsl(var(--kind-h) 70% 45%);
  background: hsl(var(--kind-h) 72% 52% / 0.1);
  white-space: nowrap;
}
</style>
