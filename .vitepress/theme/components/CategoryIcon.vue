<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  { size: 22 },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'sparkles'">
      <path
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09z"
      />
      <path
        d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456z"
      />
    </template>
    <template v-else-if="name === 'code'">
      <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </template>
    <template v-else-if="name === 'palette'">
      <path
        d="M12 21a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.5-2.04 4.5-4.5 4.5h-1.75c-.69 0-1.25.56-1.25 1.25 0 .55.12 1.07.34 1.54.21.45-.02 1.01-.52 1.18A9.1 9.1 0 0 1 12 21z"
      />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'bolt'">
      <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </template>
    <template v-else-if="name === 'megaphone'">
      <path d="M3 10.5v3a1 1 0 0 0 1 1h2.2l5.3 4V5.5L6.2 9.5H4a1 1 0 0 0-1 1z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </template>
    <template v-else-if="name === 'book'">
      <path
        d="M12 6.04A8.97 8.97 0 0 0 6 3.75c-1.05 0-2.06.18-3 .51v14.25A8.99 8.99 0 0 1 6 18c2.31 0 4.41.87 6 2.29m0-14.25a8.97 8.97 0 0 1 6-2.29c1.05 0 2.06.18 3 .51v14.25A8.99 8.99 0 0 0 18 18a8.97 8.97 0 0 0-6 2.29m0-14.25v14.25"
      />
    </template>
    <template v-else-if="name === 'chart'">
      <path
        d="M3 13.13v6.75c0 .62.5 1.12 1.13 1.12h2.25c.62 0 1.12-.5 1.12-1.12v-6.75c0-.62-.5-1.13-1.12-1.13H4.13C3.5 12 3 12.5 3 13.13zM9.75 8.63v11.25c0 .62.5 1.12 1.13 1.12h2.25c.62 0 1.12-.5 1.12-1.12V8.63c0-.62-.5-1.13-1.12-1.13h-2.25c-.63 0-1.13.5-1.13 1.13zM16.5 4.13v15.75c0 .62.5 1.12 1.13 1.12h2.25c.62 0 1.12-.5 1.12-1.12V4.13c0-.62-.5-1.13-1.12-1.13h-2.25c-.63 0-1.13.5-1.13 1.13z"
      />
    </template>
    <template v-else-if="name === 'cloud'">
      <path
        d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.33-7.26 3 3 0 0 0-3.76-3.85 5.25 5.25 0 0 0-10.23 2.33A4.5 4.5 0 0 0 2.25 15z"
      />
    </template>
    <template v-else-if="name === 'wrench'">
      <path d="M9.5 9.5l-6.3 6.3a2.12 2.12 0 1 0 3 3L12.5 12.5" />
      <path
        d="M15 4l-1.2 2.6-2.2 2.2 2.2 2.2 2.6 1.2c1.8.3 3.6-.4 4.6-1.9a3.6 3.6 0 0 1-4.3-4.3A4.4 4.4 0 0 0 15 4z"
      />
    </template>
    <template v-else-if="name === 'briefcase'">
      <path
        d="M20.25 7.5l-.62 10.63a2.25 2.25 0 0 1-2.25 2.12H6.62a2.25 2.25 0 0 1-2.25-2.12L3.75 7.5M10 11.25h4"
      />
      <rect x="3" y="5.25" width="18" height="2.25" rx="1" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="9" />
    </template>
  </svg>
</template>
