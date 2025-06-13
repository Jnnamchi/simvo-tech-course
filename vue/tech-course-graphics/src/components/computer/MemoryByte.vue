<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'

import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import MemoryBitBox from '../items/MemoryBitBox.vue'
import Chip from '../items/Chip.vue'
import Label from '../items/Label.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const setOn = ref(false)

const toggleInput = (wireValue: any) => {
  // flip input and set
  wireValue.isOn = !wireValue.isOn

  // only update output if set is on
  if (setOn.value) {
    wireValue.outputOn = wireValue.isOn
  }
}
const toggleSet = () => {
  // flip input and set
  setOn.value = !setOn.value

  // only update output if set is on
  for (const wire of inputWires) {
    if (setOn.value) {
      wire.outputOn = wire.isOn
    }
  }
}

function getInputWirePathOff (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.1, props.height * yStart, 10)
  .diag(1, 0.3)
  .right(1)
  .up(0.3)
  .diag(1, 0.1)
  .skip(0, -0.4)
  .right(2)
  .build()
}

function getInputWirePathOn (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.1, props.height * yStart, 10)
  .diag(1, 0.3)
  .right(1)
  .up(0.3)
  .right(1)
  .down(0.3)
  .right(2)
  .build()
}

function getOutputWirePath (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.6, props.height * (yStart - 0.05), 10)
  .right(2)
  .diag(1, -0.5)
  .build()
}

const inputWires = reactive([
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    outputOn: false,
  },
])

// Set Wire
const setWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.9, 10)
  .diag(1, 0.3)
  .right(1)
  .up(0.3)
  .diag(1, 0.3)
  .skip(0, -0.6)
  .right(2)
  .up(1)
  .build()
const setWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.9, 10)
  .diag(1, 0.3)
  .right(1)
  .up(0.3)
  .right(1)
  .down(0.3)
  .right(2)
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
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getInputWirePathOn(index/11 + 0.12)"
        :pathOff="getInputWirePathOff(index/11 + 0.12)"
        :isOn="wire.isOn"
        :circleStart="true"
        @click="toggleInput(wire)"
      />
      <Label text="INPUT WIRES" :x="props.width*0.15" :y="props.height*0.8" :size="20" />
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getOutputWirePath(index/11 + 0.14)"
        :pathOff="getOutputWirePath(index/11 + 0.14)"
        :isOn="wire.outputOn"
        :circleEnd="true"
        @click="toggleInput(wire)"
        :delay="600"
      />
      <Label text="OUTPUT WIRES" :x="props.width*0.8" :y="props.height*0.84" :size="20" />
      <Wire
        :pathOn="setWirePathOn"
        :pathOff="setWirePathOff"
        :isOn="setOn"
        :circleStart="true"
        @click="toggleSet"
      />
      <Label text="SET WIRE" :x="props.width*0.15" :y="props.height*0.94" :size="20" />
      <!--
      <Label text="OUTPUT" :x="props.width*0.9" :y="props.height*0.67" :size="24" /> -->
      <MemoryBitBox
        v-for="(wire, index) in inputWires"
        :size="65"
        :x="props.width*0.6"
        :y="props.height*(index/11 + 0.09)"
      />
    </svg>
  </div>
</template>
