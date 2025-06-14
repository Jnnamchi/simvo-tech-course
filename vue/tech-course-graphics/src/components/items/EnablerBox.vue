<script setup lang="ts">
import { themeBlack, enablerBoxColor } from '../../constants'

const props = defineProps<{
  size: number
  x: number
  y: number
}>()

const fontSize = props.size / 4
const yPos = props.y - props.size / 2
</script>

<template>
  <g>
    <rect
      :width="props.size"
      :height="props.size"
      :x="props.x"
      :y="yPos"
      :fill="enablerBoxColor"
    />
    <rect
      :width="props.size"
      :height="props.size"
      :x="props.x"
      :y="yPos"
      fill="none"
      :stroke="themeBlack"
      stroke-width="4"
    />
    <text
      :x="props.x + props.size / 2"
      :y="(props.size / 30) + yPos + props.size / 2"
      dominant-baseline="middle"
      text-anchor="middle"
      :font-size="fontSize"
      :fill="themeBlack"
    >
      E
    </text>
  </g>
</template>
