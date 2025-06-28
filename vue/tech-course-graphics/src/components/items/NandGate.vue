<script setup lang="ts">
import { andGateColor, themeBlack } from '../../constants'

const props = defineProps<{
  width: number
  height: number
  x: number
  y: number
  angle: number
}>()

// Define output circle size
const outputCircleRadius = 4
</script>

<template>
  <svg
    :x="props.x"
    :y="props.y"
    :width="width"
    :height="height"
    overflow="visible"
  >
    <g :transform="`rotate(${angle}, ${width / 2}, ${height / 2})`">
      <!-- Gate shape -->
      <rect
        x="0"
        y="0"
        :width="width / 2"
        :height="height"
        :fill="andGateColor"
        stroke="black"
        stroke-width="2"
      />
      <path
        :d="`M ${width / 2} 0
              A ${width / 2} ${height / 2} 0 0 1 ${width / 2} ${height}
              L 0 ${height}
              L 0 0
              Z`"
        :fill="andGateColor"
        stroke="black"
        stroke-width="2"
      />

      <!-- Output circle for NAND -->
      <circle
        :cx="width"
        :cy="height / 2"
        :r="outputCircleRadius"
        fill="white"
        stroke="black"
        stroke-width="2"
      />

      <!-- Label inside gate, rotated 90° counterclockwise -->
      <text
        :x="width / 2"
        :y="height / 1.7"
        text-anchor="middle"
        dominant-baseline="middle"
        :transform="`rotate(90, ${width / 2}, ${height / 2})`"
        font-size="14"
        font-family="Arial"
        :fill="themeBlack"
      >
        NAND
      </text>
    </g>
  </svg>
</template>
