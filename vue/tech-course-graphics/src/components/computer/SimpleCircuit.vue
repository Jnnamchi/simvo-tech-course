<script setup lang="ts">
import { ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'

const props = defineProps<{
  height: number
  width: number
}>()

const isOn = ref(false)

const wirePathOff = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.9, 10)
  .left(4)
  .up(2.5)
  .diag(0.5, 0.25)
  .diag(-1, 0.5)
  .diag(1, 0.5)
  .diag(-1, 0.5)
  .diag(1, 0.5)
  .diag(-0.5, 0.25)
  .up(2.5)
  .right(3)
  .up(0.5)
  .diag(2, 1)
  .skip(0, -1.5)
  .right(3)
  .down(7.5)
  .left(4)
  .build()

const wirePathOn = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.9, 10)
  .left(4)
  .up(2.5)
  .diag(0.5, 0.25)
  .diag(-1, 0.5)
  .diag(1, 0.5)
  .diag(-1, 0.5)
  .diag(1, 0.5)
  .diag(-0.5, 0.25)
  .up(2.5)
  .right(3)
  .up(0.5)
  .right(2)
  .down(0.5)
  .right(3)
  .down(7.5)
  .left(4)
  .build()
</script>

<template>
  <div>
    <svg
      :height="props.height"
      :width="props.width"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      @click="isOn = !isOn"
    >
      <Wire
        :pathOn="wirePathOn"
        :pathOff="wirePathOff"
        :isOn="isOn"
      />
      <image
        href="https://pngimg.com/d/battery_PNG102280.png"
        height="200"
        width="200"
        :x="props.width / 2 - 100"
        :y="props.height - 160"
      />
    </svg>
  </div>
</template>
