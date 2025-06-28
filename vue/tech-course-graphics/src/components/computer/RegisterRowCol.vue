<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'

import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import BitValueBox from '../items/BitValueBox.vue'
import Chip from '../items/Chip.vue'
import Label from '../items/Label.vue'
import RegisterBox from '../items/RegisterBox.vue'
import AndGate from '../items/AndGate.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const setOn = ref(false)
const enableOn = ref(false)
const rowOn = ref(false)
const colOn = ref(false)

const INPUT_WIRE = 'INPUT WIRE'
const ROW_WIRE = 'ROW WIRE'
const COL_WIRE = 'COL WIRE'
const SET_WIRE = 'SET WIRE'
const ENABLE_WIRE = 'ENABLE WIRE'
var lastClicked = ref('')

const toggleInput = (wireValue: any) => {
  // flip input and set
  wireValue.isOn = !wireValue.isOn
  lastClicked.value = INPUT_WIRE

  // only update output if set is on
  if (setOn.value && rowOn.value && colOn.value) {
    // wireValue.valueOn = wireValue.isOn
    setTimeout(() => {
      // wireValue.valueOn = wireValue.isOn
      updateWireValues()
    }, wireValue.isOn ? 1000 : 500)
  }
}
const toggleSet = () => {
  // flip input and set
  setOn.value = !setOn.value
  lastClicked.value = SET_WIRE

  // only update output if set is on
  setTimeout(() => {
    updateWireValues()
  }, 1700)
}
const updateWireValues = () => {
  for (const wire of inputWires) {
    if (setOn.value && rowOn.value && colOn.value) {
      wire.valueOn = wire.isOn
    }
  }
  updateWireOutputs()
}
const toggleEnable = () => {
  enableOn.value = !enableOn.value
  lastClicked.value = ENABLE_WIRE

  setTimeout(() => {
    updateWireOutputs()
  }, enableOn.value ? 1500 : 1000)
}
const updateWireOutputs = () => {
  for (const wire of inputWires) {
    if (enableOn.value && rowOn.value && colOn.value) {
      wire.outputOn = wire.valueOn
    } else {
      wire.outputOn = false
    }
  }
}
const toggleRow = () => {
  lastClicked.value = ROW_WIRE
  rowOn.value = !rowOn.value
  toggleRowCol()
}
const toggleCol= () => {
  lastClicked.value = COL_WIRE
  colOn.value = !colOn.value
  toggleRowCol()
}
const toggleRowCol = () => {
  // only update output if set is on
  setTimeout(() => {
    for (const wire of inputWires) {
      if (setOn.value && rowOn.value && colOn.value) {
        wire.valueOn = wire.isOn
      }
      if (enableOn.value && rowOn.value && colOn.value) {
        wire.outputOn = wire.valueOn
      } else {
        wire.outputOn = false
      }
    }
  }, rowOn.value && colOn.value ? 2500 : 1800)
}
const getSetAndWireDelay = () => {
  if (lastClicked.value === ROW_WIRE || lastClicked.value === COL_WIRE) {
    return (rowOn.value && colOn.value && setOn.value) ? 1700 : 1200
  }

  return rowOn.value && colOn.value && setOn.value ? 900 : 400
}
const getEnableAndWireDelay = () => {
  if (lastClicked.value === ROW_WIRE || lastClicked.value === COL_WIRE) {
    return (rowOn.value && colOn.value && enableOn.value) ? 1700 : 1200
  }

  return rowOn.value && colOn.value && enableOn.value ? 900 : 400
}
const getOutputWireDelay = (wireValue: any) => {
  // enableOn ? 600 : 300
  if (lastClicked.value === INPUT_WIRE || lastClicked.value === SET_WIRE) {
    return 0
  }
  if (lastClicked.value === ROW_WIRE || lastClicked.value === COL_WIRE) {
    return (rowOn.value && colOn.value && enableOn.value) ? 2500 : 1700
  }

  return rowOn.value && colOn.value && enableOn.value ? 1700 : 1200
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
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
  {
    isOn: false,
    valueOn: false,
    outputOn: false,
  },
])

// Set Wire
const setWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.24, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .diag(0.3, 0.3)
  .skip(0, -0.4)
  .right(0.85)
  .up(0.5)
  .build()

const setWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.24, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .right(0.3)
  .down(0.1)
  .right(0.85)
  .up(0.5)
  .build()

const enableWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.805, props.height * 0.88, 10)
  .diag(-0.3, 0.3)
  .left(0.3)
  .up(0.1)
  .diag(-0.3, 0.3)
  .skip(0, -0.4)
  .left(0.85)
  .up(0.5)
  .build()

const enableWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.805, props.height * 0.88, 10)
  .diag(-0.3, 0.3)
  .left(0.3)
  .up(0.1)
  .left(0.3)
  .down(0.1)
  .left(0.85)
  .up(0.5)
  .build()

const rowWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.315, props.height * 0.96, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .diag(0.3, 0.3)
  .skip(0, -0.4)
  .right(1.1)
  .up(0.2)
  .build()

const rowWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.315, props.height * 0.96, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .right(0.3)
  .down(0.1)
  .right(1.1)
  .up(0.2)
  .build()

const columnWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.73, props.height * 0.96, 10)
  .diag(-0.3, 0.3)
  .left(0.3)
  .up(0.1)
  .diag(-0.3, 0.3)
  .skip(0, -0.4)
  .left(1.1)
  .up(0.2)
  .build()

const columnWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.73, props.height * 0.96, 10)
  .diag(-0.3, 0.3)
  .left(0.3)
  .up(0.1)
  .left(0.3)
  .down(0.1)
  .left(1.1)
  .up(0.2)
  .build()

const addressWirePathLeft = new PathBuilder(props.width, props.height, props.width * 0.522, props.height * 0.88, 10)
  .up(0.3)
  .left(0.93)
  .up(0.5)
  .build()
const addressWirePathRight = new PathBuilder(props.width, props.height, props.width * 0.522, props.height * 0.88, 10)
  .up(0.3)
  .right(0.93)
  .up(0.5)
  .build()

const setAndWirePath = new PathBuilder(props.width, props.height, props.width * 0.422, props.height * 0.76, 10)
  .up(0.5)
  .build()

const enableAndWirePath = new PathBuilder(props.width, props.height, props.width * 0.622, props.height * 0.76, 10)
  .up(0.5)
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
      <Label text="INPUT WIRES" :x="props.width*0.05" :y="props.height*0.76" :size="20" />
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getInputWirePathOn(index/12 + 0.12)"
        :pathOff="getInputWirePathOff(index/12 + 0.12)"
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
        :pathOn="getMemoryWirePath(index/12 + 0.12)"
        :pathOff="getMemoryWirePath(index/12 + 0.12)"
        :isOn="wire.valueOn"
      />

      <!-- Enable Wire -->
      <Label text="ENABLE WIRE" :x="props.width*0.82" :y="props.height*0.89" :size="20" />
      <Wire
        :pathOn="enableWirePathOn"
        :pathOff="enableWirePathOff"
        :isOn="enableOn"
        :circleStart="true"
        @click="toggleEnable()"
      />

      <!-- Column Wire -->
      <!-- <Label text="COLUMN WIRE" :x="props.width*0.82" :y="props.height*0.89" :size="20" /> -->
      <Label text="ROW WIRE" :x="props.width*0.215" :y="props.height*0.97" :size="20" />
      <Wire
        :pathOn="rowWirePathOn"
        :pathOff="rowWirePathOff"
        :isOn="rowOn"
        :circleStart="true"
        @click="toggleRow()"
      />
      <Label text="COLUMN WIRE" :x="props.width*0.75" :y="props.height*0.97" :size="20" />
      <Wire
        :pathOn="columnWirePathOn"
        :pathOff="columnWirePathOff"
        :isOn="colOn"
        :circleStart="true"
        @click="toggleCol()"
      />

      <!-- Address On Wires Left & Right -->
      <Wire
        :pathOn="addressWirePathLeft"
        :pathOff="addressWirePathLeft"
        :isOn="rowOn && colOn"
        :delay="rowOn && colOn ? 900 : 400"
      />
      <Wire
        :pathOn="addressWirePathRight"
        :pathOff="addressWirePathRight"
        :isOn="rowOn && colOn"
        :delay="rowOn && colOn ? 900 : 400"
      />

      <!-- Set and Enable when Address On Wires Left & Right -->
      <Wire
        :pathOn="setAndWirePath"
        :pathOff="setAndWirePath"
        :isOn="rowOn && colOn && setOn"
        :delay="getSetAndWireDelay()"
      />
      <Wire
        :pathOn="enableAndWirePath"
        :pathOff="enableAndWirePath"
        :isOn="rowOn && colOn && enableOn"
        :delay="getEnableAndWireDelay()"
      />

      <!-- Output Wires -->
      <Label text="OUTPUT WIRES" :x="props.width*0.84" :y="props.height*0.76" :size="20" />
      <Wire
        v-for="(wire, index) in inputWires"
        :key="index"
        :pathOn="getOutputWirePath(index/12 + 0.12)"
        :pathOff="getOutputWirePath(index/12 + 0.12)"
        :isOn="wire.outputOn"
        :circleEnd="true"
      />

      <!-- Boxes -->
      <BitValueBox
        v-for="(wire, index) in inputWires"
        :size="60"
        :x="props.width*0.42"
        :y="props.height*(index/12 + 0.09)"
        :isOn="wire.valueOn"
      />
      <RegisterBox
        :width="props.width*0.2"
        :height="props.height*0.669"
        :x="props.width*0.445"
        :y="props.height*0.047"
        :inputWires="inputWires"
      />

      <!-- And Gate -->
      <AndGate :width="30" :height="40" :x="props.width*0.41" :y="props.height*0.75" :angle="270" />
      <AndGate :width="30" :height="40" :x="props.width*0.61" :y="props.height*0.75" :angle="270" />
      <AndGate :width="30" :height="40" :x="props.width*0.51" :y="props.height*0.86" :angle="270" />
    </svg>
  </div>
</template>
