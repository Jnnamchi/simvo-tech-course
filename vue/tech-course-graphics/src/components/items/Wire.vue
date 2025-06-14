<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import anime from 'animejs'
import { themeBlack, themeRed } from '../../constants'
import { computed } from 'vue'

const getStartAndEnd = (d: string): [number, number, number, number] => {
  const commands = d.trim().split(/[ML]/).filter(Boolean)
  const [startX, startY] = commands[0].trim().split(' ').map(Number)
  const [endX, endY] = commands[commands.length - 1].trim().split(' ').map(Number)
  return [startX, startY, endX, endY]
}

const coords = computed(() => {
  const d = props.isOn ? props.pathOn : props.pathOff
  return getStartAndEnd(d)
})

interface WireProps {
  pathOn: string
  pathOff: string
  isOn: boolean
  onClickFn?: () => void
  delay?: number
  circleStart?: boolean
  circleEnd?: boolean
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
          strokeWidth: '10',
        }"
      />
      <!-- Red animated overlay -->
      <path
        ref="redPathRef"
        :d="props.pathOn"
        :style="{
          fill: 'none',
          stroke: themeRed,
          strokeWidth: '10',
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
          strokeWidth: '10',
        }"
      />
      <!-- Black animated overlay -->
      <path
        ref="blackPathRef"
        :d="props.pathOff"
        :style="{
          fill: 'none',
          stroke: themeBlack,
          strokeWidth: '10',
        }"
      />
    </g>

    <circle
      v-if="props.circleStart"
      :cx="coords[0]"
      :cy="coords[1]"
      r="12"
      fill="black"
    />
    <circle
      v-if="props.circleEnd"
      :cx="coords[2]"
      :cy="coords[3]"
      r="12"
      fill="black"
    />
  </svg>
</template>
