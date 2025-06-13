<script setup lang="ts">
import { ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import Transistor from '../items/Transistor.vue'
import Battery from '../items/Battery.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const isOn = ref(false)

const wirePathMain = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.9, 10)
  .left(4)
  .up(1.5)
  .diag(0.5, 0.25)
  .diag(-1, 0.5)
  .diag(1, 0.5)
  .diag(-1, 0.5)
  .diag(1, 0.5)
  .diag(-0.5, 0.25)
  .up(1.5)
  .right(8)
  .down(5.5)
  .left(4)
  .build()

  const wirePathSwitchOff = new PathBuilder(props.width, props.height, props.width * 0.2, props.height * 0.1, 10)
  .left(1)
  .down(2.5)
  .right(4)
  .up(2.5)
  .left(0.5)
  .skip(0, 1)
  .diag(-1, -0.7)
  .down(0.3)
  .left(1.5)
  .build()

const wirePathSwitchOn = new PathBuilder(props.width, props.height, props.width * 0.2, props.height * 0.1, 10)
  .left(1)
  .down(2.5)
  .right(4)
  .up(2.5)
  .left(0.5)
  .up(0.3)
  .left(1)
  .down(0.3)
  .left(2.5)
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
      <!-- <Chip
        :height="props.height"
        :width="props.width"
      /> -->
      <Wire
        :pathOn="wirePathMain"
        :pathOff="wirePathMain"
        :isOn="isOn"
      />
      <Wire
        :pathOn="wirePathSwitchOn"
        :pathOff="wirePathSwitchOff"
        :isOn="isOn"
      />
      <Transistor
        :height="60"
        :width="200"
        :x="props.width*0.5"
        :y="props.height*0.35"
      ></Transistor>
      <Battery
        :height="200"
        :width="200"
        :x="props.width / 2 - 100"
        :y="props.height - 160"
      />
      <Battery
        :height="200"
        :width="200"
        :x="170"
        :y="-40"
      />
    </svg>
  </div>
</template>
