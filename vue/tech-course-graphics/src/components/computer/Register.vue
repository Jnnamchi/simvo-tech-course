<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'

import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import BitValueBox from '../items/BitValueBox.vue'
import Chip from '../items/Chip.vue'
import Label from '../items/Label.vue'
import RegisterBox from '../items/RegisterBox.vue'

// https://web.alfredstate.edu/faculty/weimandn/miscellaneous/ascii/ascii_index.html

const props = defineProps<{
  height: number
  width: number
}>()

const setOn = ref(false)
const enableOn = ref(false)

const toggleInput = (wireValue: any) => {
  // flip input and set
  wireValue.isOn = !wireValue.isOn

  // only update output if set is on
  if (setOn.value) {
    // wireValue.valueOn = wireValue.isOn
    setTimeout(() => {
      wireValue.valueOn = wireValue.isOn
    }, wireValue.isOn ? 1000 : 500)
  }
}
const toggleSet = () => {
  // flip input and set
  setOn.value = !setOn.value

  // only update output if set is on
  setTimeout(() => {
    for (const wire of inputWires) {
      if (setOn.value) {
        wire.valueOn = wire.isOn
      }
    }
  }, 1000)
}

function getInputWirePathOff (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.1, props.height * yStart, 10)
  .diag(0.5, 0.3)
  .right(0.5)
  .up(0.1)
  .diag(0.5, 0.2)
  .skip(0, -0.3)
  .right(1.5)
  .build()
}

function getInputWirePathOn (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.1, props.height * yStart, 10)
  .diag(0.5, 0.3)
  .right(0.5)
  .up(0.1)
  .right(0.5)
  .down(0.1)
  .right(1.5)
  .build()
}

function getOutputWirePath (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.6, props.height * (yStart - 0.03), 10)
  .right(2)
  .diag(1, -0.3)
  .build()
}

function getMemoryWirePath (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.4, props.height * (yStart - 0.03), 10)
  .right(2)
  .build()
}

const inputWires = reactive([
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
  {
    isOn: false,
    valueOn: false,
  },
])

// Set Wire
const setWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.245, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .diag(0.3, 0.3)
  .skip(0, -0.4)
  .right(0.85)
  .up(1)
  .build()

const setWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.245, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .right(0.3)
  .down(0.1)
  .right(0.85)
  .up(1)
  .build()

const enableWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.45, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .diag(0.3, 0.3)
  .skip(0, -0.4)
  .right(0.85)
  .up(1)
  .build()

const enableWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.45, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .right(0.3)
  .down(0.1)
  .right(0.85)
  .up(1)
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
      <!-- Input Wires -->
      <Label text="INPUT WIRES" :x="props.width*0.05" :y="props.height*0.81" :size="20" />
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getInputWirePathOn(index/12 + 0.16)"
        :pathOff="getInputWirePathOff(index/12 + 0.16)"
        :isOn="wire.isOn"
        :circleStart="true"
        @click="toggleInput(wire)"
      />

      <!-- Set Wire -->
      <Label text="SET WIRE" :x="props.width*0.15" :y="props.height*0.89" :size="20" />
      <Wire
        :pathOn="setWirePathOn"
        :pathOff="setWirePathOff"
        :isOn="setOn"
        :circleStart="true"
        @click="toggleSet"
      />

      <!-- Memory Wires -->
      <!-- <Label text="MEMORY WIRES" :x="props.width*0.45" :y="props.height*0.1" :size="20" /> -->
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getMemoryWirePath(index/12 + 0.16)"
        :pathOff="getMemoryWirePath(index/12 + 0.16)"
        :isOn="wire.valueOn"
      />

      <!-- Enable Wire -->
      <Label text="ENABLE WIRE" :x="props.width*0.46" :y="props.height*0.93" :size="20" />
      <Wire
        :pathOn="enableWirePathOn"
        :pathOff="enableWirePathOff"
        :isOn="enableOn"
        :circleStart="true"
        @click="enableOn = !enableOn"
      />

      <!-- Output Wires -->
      <Label text="OUTPUT WIRES" :x="props.width*0.84" :y="props.height*0.81" :size="20" />
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getOutputWirePath(index/12 + 0.16)"
        :pathOff="getOutputWirePath(index/12 + 0.16)"
        :isOn="wire.valueOn && enableOn"
        :circleEnd="true"
        :delay="enableOn ? 600 : 300"
      />

      <!-- Boxes -->
      <BitValueBox
        v-for="(wire, index) in inputWires"
        :size="60"
        :x="props.width*0.42"
        :y="props.height*(index/12 + 0.13)"
        :isOn="wire.valueOn"
      />
      <RegisterBox
        :width="props.width*0.2"
        :height="props.height*0.669"
        :x="props.width*0.445"
        :y="props.height*0.087"
        :inputWires="inputWires"
      />
    </svg>
  </div>
</template>
