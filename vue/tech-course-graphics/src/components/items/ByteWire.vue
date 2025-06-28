<script setup lang="ts">
import { computed } from 'vue'
import Wire from './Wire.vue'
import { PathBuilder } from '../../utils/path'

const props = defineProps<{
  getPath: (index: number) => { pathOn: string; pathOff: string }
  values: boolean[]
  spacing?: number
  strokeWidth?: number
  circleStart?: boolean
  circleEnd?: boolean
  circleSize?: number
}>()

const spacing = props.spacing ?? 12
</script>

<template>
  <Wire
    v-for="(isOn, index) in values"
    :key="index"
    v-bind="getPath(index)"
    :isOn="isOn"
    :strokeWidth="strokeWidth"
    :circleSize="circleSize"
    :circleStart="circleStart"
    :circleEnd="circleEnd"
  />
</template>
