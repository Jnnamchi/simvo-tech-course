<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import anime from 'animejs'
import { themeBlack, themeRed } from '../../constants'

interface WireProps {
  pathOn: string
  pathOff: string
  isOn: boolean
  onClickFn?: () => void
  delay?: number
}

const props = defineProps<WireProps>()

const redPathRef = ref<SVGPathElement | null>(null)
const blackPathRef = ref<SVGPathElement | null>(null)

watch(() => props.isOn, async (newVal, oldVal) => {
  await nextTick()

  const animate = (el: SVGPathElement | null) => {
    if (!el) return
    const length = el.getTotalLength()
    el.setAttribute('stroke-dasharray', `${length}`)
    el.setAttribute('stroke-dashoffset', `${length}`)
    anime({
      targets: el,
      strokeDashoffset: [length, 0],
      duration: 1000,
      easing: 'easeInOutSine',
      delay: props.delay || 0
    })
  }

  if (newVal && redPathRef.value) {
    animate(redPathRef.value)
  }

  if (!newVal && blackPathRef.value) {
    animate(blackPathRef.value)
  }
})
</script>

<template>
  <svg @click="props.onClickFn?.()" overflow="visible">
    <g v-if="props.isOn">
      <!-- Black base path (underlay) -->
      <path
        ref="blackPathRef"
        :d="props.pathOn"
        :style="{
          fill: 'none',
          stroke: themeBlack,
          strokeWidth: '12',
        }"
      />
      <!-- Red animated overlay -->
      <path
        ref="redPathRef"
        :d="props.pathOn"
        :style="{
          fill: 'none',
          stroke: themeRed,
          strokeWidth: '12',
        }"
      />
    </g>

    <g v-else>
      <!-- Red base path (underlay) -->
      <path
        ref="redPathRef"
        :d="props.pathOff"
        :style="{
          fill: 'none',
          stroke: themeRed,
          strokeWidth: '12',
        }"
      />
      <!-- Black animated overlay -->
      <path
        ref="blackPathRef"
        :d="props.pathOff"
        :style="{
          fill: 'none',
          stroke: themeBlack,
          strokeWidth: '12',
        }"
      />
    </g>
  </svg>
</template>
