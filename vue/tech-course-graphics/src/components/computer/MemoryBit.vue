<script setup lang="ts">
import { ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import MemoryBitBox from '../items/MemoryBitBox.vue'
import Chip from '../items/Chip.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const isOn = ref(false)

const inputOn = ref(false)
const setOn = ref(false)
const outputOn = ref(false)

const toggleInput = () => {
  // flip input and set
  inputOn.value = !inputOn.value

  // only update output if set is on
  if (setOn.value) {
    outputOn.value = inputOn.value
  }
}
const toggleSet = () => {
  // flip input and set
  setOn.value = !setOn.value

  // only update output if set is on
  if (setOn.value) {
    outputOn.value = inputOn.value
  }
}

// Set Wire
const setWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.7, 10)
  .diag(1, 1)
  .right(1)
  .up(0.3)
  .diag(1, 0.5)
  .skip(0, -0.8)
  .right(1)
  .build()
const setWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.7, 10)
  .diag(1, 1)
  .right(1)
  .up(0.3)
  .right(1)
  .down(0.3)
  .right(1)
  .build()

// Input Wire
const inputWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.5, 10)
  .diag(1, 1)
  .right(1)
  .up(0.3)
  .diag(1, 0.5)
  .skip(0, -0.8)
  .right(1)
  .build()
const inputWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.5, 10)
  .diag(1, 1)
  .right(1)
  .up(0.3)
  .right(1)
  .down(0.3)
  .right(1)
  .build()

const outputWirePath = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.5, 10)
  .right(3)
  .diag(1, -1)
  .build()

</script>

<template>
  <div>
    <svg
      :height="props.height"
      :width="props.width"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <Chip
        :height="props.height"
        :width="props.width"
      />
      <Wire
        :pathOn="inputWirePathOn"
        :pathOff="inputWirePathOff"
        :isOn="inputOn"
        :circleStart="true"
        @click="toggleInput"
      />
      <Wire
        :pathOn="setWirePathOn"
        :pathOff="setWirePathOff"
        :isOn="setOn"
        :circleStart="true"
        @click="toggleSet"
      />
      <Wire
        :pathOn="outputWirePath"
        :pathOff="outputWirePath"
        :isOn="outputOn"
        :circleEnd="true"
        :delay="300"
      />
      <MemoryBitBox
        :size="250"
        :x="props.width*0.6"
        :y="props.height*0.5"
      />
    </svg>
  </div>
</template>
