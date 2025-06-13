<script setup lang="ts">
import { ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import Transistor from '../items/Transistor.vue'
import Chip from '../items/Chip.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const isOn = ref(false)

const wirePathMain = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.7, 10)
  .diag(1, 1)
  .right(6)
  .diag(1, -1)
  .build()

const wirePathOn = new PathBuilder(props.width, props.height, props.width * 0.6, props.height * 0.55, 10)
  .diag(-1, 2)
  .left(1)
  .up(0.3)
  .left(1)
  .down(0.3)
  .left(1)
  .diag(-1, -1)
  .build()

const wirePathOff = new PathBuilder(props.width, props.height, props.width * 0.6, props.height * 0.55, 10)
  .diag(-1, 2)
  .left(1)
  .up(0.3)
  .diag(-1, 0.7)
  .skip(0, -1)
  .left(1)
  .diag(-1, -1)
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
      <Chip
        :height="props.height"
        :width="props.width"
      />
      <Wire
        :pathOn="wirePathMain"
        :pathOff="wirePathMain"
        :isOn="isOn"
        :circleStart="true"
        :circleEnd="true"
      />
      <Wire
        :pathOn="wirePathOn"
        :pathOff="wirePathOff"
        :isOn="isOn"
        :circleEnd="true"
      />
      <Transistor
        :height="80"
        :width="210"
        :x="props.width*0.6"
        :y="props.height*0.6"
      ></Transistor>
    </svg>
  </div>
</template>
