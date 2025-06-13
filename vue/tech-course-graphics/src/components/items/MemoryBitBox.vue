<script setup lang="ts">
import { themeBlack, memoryBitColor } from '../../constants'

const props = defineProps<{
  size: number
  x: number
  y: number
}>()

const fontSize = props.size / 4
const xPos = props.x - props.size / 2
const yPos = props.y - props.size / 2
</script>

<template>
  <!-- Fill box -->
  <rect
    :width="props.size"
    :height="props.size"
    :x="xPos"
    :y="yPos"
    :fill="memoryBitColor"
  />

  <!-- Border -->
  <rect
    :width="props.size"
    :height="props.size"
    :x="xPos"
    :y="yPos"
    fill="none"
    :stroke="themeBlack"
    stroke-width="4"
  />

  <!-- Centered 'M' label -->
  <text
    :x="xPos + props.size / 2"
    :y="yPos + props.size / 2 + props.size / 30"
    dominant-baseline="middle"
    text-anchor="middle"
    :font-size="fontSize"
    :fill="themeBlack"
  >
    M
  </text>
</template>
