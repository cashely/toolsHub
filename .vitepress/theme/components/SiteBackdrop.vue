<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const canvasEl = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const LINK_DIST = 130 // 粒子间连线距离
const MOUSE_DIST = 190 // 鼠标连线距离
let particles: Particle[] = []
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let width = 0
let height = 0
let mouse: { x: number; y: number; active: boolean } = {
  x: 0,
  y: 0,
  active: false,
}
let visible = true
let reducedMotion = false

function createParticles() {
  // 按面积控制密度，移动端相应减少
  const target = Math.min(96, Math.round((width * height) / 16000))
  particles = Array.from({ length: target }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.6 + 0.8,
  }))
}

function resize() {
  if (!canvasEl.value) return
  width = window.innerWidth
  height = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvasEl.value.width = Math.round(width * dpr)
  canvasEl.value.height = Math.round(height * dpr)
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  createParticles()
}

function palette() {
  // 与品牌色 indigo 对齐：浅色 #4f46e5，深色 #818cf8
  return isDark.value
    ? { rgb: '129,140,248', dotAlpha: 0.55, lineAlpha: 0.26 }
    : { rgb: '79,70,229', dotAlpha: 0.4, lineAlpha: 0.18 }
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  const c = palette()

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${c.rgb},${c.dotAlpha})`
    ctx.fill()
  }

  const link = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    dist: number,
    maxDist: number,
    boost = 1,
  ) => {
    const alpha = (1 - dist / maxDist) * c.lineAlpha * boost
    if (alpha <= 0) return
    ctx!.beginPath()
    ctx!.moveTo(x1, y1)
    ctx!.lineTo(x2, y2)
    ctx!.strokeStyle = `rgba(${c.rgb},${alpha})`
    ctx!.lineWidth = 1
    ctx!.stroke()
  }

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (dist < LINK_DIST) link(a.x, a.y, b.x, b.y, dist, LINK_DIST)
    }
    if (mouse.active) {
      const dist = Math.hypot(a.x - mouse.x, a.y - mouse.y)
      if (dist < MOUSE_DIST) {
        link(a.x, a.y, mouse.x, mouse.y, dist, MOUSE_DIST, 1.8)
      }
    }
  }
}

function loop() {
  draw()
  raf = requestAnimationFrame(loop)
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch') return
  mouse.x = e.clientX
  mouse.y = e.clientY
  mouse.active = true
}

function onPointerLeave() {
  mouse.active = false
}

let io: IntersectionObserver | null = null

function startLoop() {
  if (reducedMotion || raf || !visible) return
  raf = requestAnimationFrame(loop)
}

function stopLoop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function onVisibility() {
  if (document.hidden) stopLoop()
  else if (visible) startLoop()
}

onMounted(() => {
  if (!canvasEl.value) return
  ctx = canvasEl.value.getContext('2d')
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibility)

  // 离开视口时暂停动画
  io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true
    if (visible) startLoop()
    else stopLoop()
  })
  io.observe(canvasEl.value)

  if (reducedMotion) {
    draw() // 静态一帧
  } else {
    startLoop()
  }
})

watch(isDark, () => {
  if (reducedMotion) draw()
})

onBeforeUnmount(() => {
  stopLoop()
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibility)
  io?.disconnect()
})
</script>

<template>
  <div class="aurora-layer" aria-hidden="true">
    <span class="blob b1" />
    <span class="blob b2" />
    <span class="blob b3" />
  </div>
  <canvas ref="canvasEl" class="site-backdrop" aria-hidden="true" />
</template>

<style scoped>
.aurora-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.b1 {
  width: 46vw;
  height: 46vw;
  left: -10vw;
  top: -18vw;
  background: rgba(167, 139, 250, 0.4);
}

.b2 {
  width: 40vw;
  height: 40vw;
  right: -8vw;
  top: -10vw;
  background: rgba(94, 234, 212, 0.32);
}

.b3 {
  width: 38vw;
  height: 38vw;
  right: 22vw;
  bottom: -20vw;
  background: rgba(253, 186, 116, 0.3);
}

.dark .b1 {
  background: rgba(124, 58, 237, 0.3);
}

.dark .b2 {
  background: rgba(14, 165, 233, 0.2);
}

.dark .b3 {
  background: rgba(217, 70, 239, 0.2);
}

.site-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
