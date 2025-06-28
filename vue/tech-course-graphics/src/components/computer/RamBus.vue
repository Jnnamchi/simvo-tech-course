<script setup lang="ts">
import { computed, ref } from 'vue'
import { reactive } from 'vue'

import Wire from '../items/Wire.vue'
import ByteWire from '../items/ByteWire.vue'
import { PathBuilder } from '../../utils/path'
import Chip from '../items/Chip.vue'
import Label from '../items/Label.vue'
import RegisterBox from '../items/RegisterBox.vue'

// https://web.alfredstate.edu/faculty/weimandn/miscellaneous/ascii/ascii_index.html
const strokeWidth = 6
const circleSize = 8
const props = defineProps<{
  height: number
  width: number
}>()

// Registers
const createRegisterBits = () => {
  const registerBits = []
  for (let i = 0; i < 8; i++) {
    registerBits.push({
      valueOn: false
    })
  }
  return registerBits
}
const RAM_ROW_SIZE = 8
const createRegisters = () => {
  const registers = []
  for (let i = 0; i < RAM_ROW_SIZE; i++) {
    for (let j = 0; j < RAM_ROW_SIZE; j++) {
      const newRegister = {
        bits: createRegisterBits(),
        setOn: false,
        enableOn: false
      }
      registers.push(newRegister)
    }
  }
  return registers
}
const isActiveRegister = (ramRegisterIndex: number) => {
  const row = Math.floor(ramRegisterIndex / 8)
  const col = ramRegisterIndex % 8

  return marRowConnectorBits[row]?.bitValue && marColConnectorBits[col]?.bitValue
}
const updateRamRegisters = () => {
  if (!setOn.value) {
    return
  }
  for (let i = 0; i < ramRegisters.length; i++) {
    if (isActiveRegister(i)) {
      for (let j = 0; j < inputBits.length; j++) {
        ramRegisters[i].bits[j].valueOn = inputBits[j].bitValue
      }
      return
    }
  }
}
const ramRegisters = reactive(createRegisters())
const registerWidth = props.height / (RAM_ROW_SIZE*2.5)
const registerHeight = registerWidth

// Input Bits
const toggleInputBit = (bit: any) => {
  // flip input and set
  bit.bitValue = !bit.bitValue
  setTimeout(() => {
    updateInputConnectorBits()
  }, bit.bitValue ? 1000 : 500)

  setTimeout(() => {
    updateRamRegisters()
  }, bit.bitValue ? 2000 : 1500)

  setTimeout(() => {
    updateOutputBits()
  }, bit.bitValue ? 2000 : 1500)
}
const createInputBits = () => {
  const inputBits = []
  for (let i = 0; i < 8; i++) {
    inputBits.push({
      bitValue: false
    })
  }
  return inputBits
}
const inputBits = reactive(createInputBits())
const inputConnectorBits = reactive(createInputBits())
const updateInputConnectorBits = () => {
  for (let i = 0; i < inputConnectorBits.length; i++) {
    inputConnectorBits[i].bitValue = inputBits[i].bitValue
  }
}

function getInputConnectorBitValues () {
  const inputConnectorBitValues = []
  for (const inputConnectorBit of inputConnectorBits) {
    inputConnectorBitValues.push(inputConnectorBit.bitValue)
  }
  return inputConnectorBitValues
}

// MAR Bits
function getInputMarBitPathOn (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.05, props.height * yStart, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .right(0.3)
  .down(0.1)
  .right(1)
  .build()
}
function getInputMarBitPathOff (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.05, props.height * yStart, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .diag(0.3, 0.1)
  .skip(0, -0.2)
  .right(1)
  .build()
}
const toggleMarBit = (wire: any) => {
  wire.bitValue = !wire.bitValue

  setTimeout(() => {
    updateRamColConnectorBits()
    updateRamRowConnectorBits()
  }, wire.bitValue ? 1000 : 500)

  setTimeout(() => {
    updateRamGridBits()
  }, wire.bitValue ? 2000 : 1500)

  setTimeout(() => {
    updateRamRegisters()
  }, wire.bitValue ? 3000 : 2500)

  setTimeout(() => {
    updateOutputBits()
  }, wire.bitValue ? 2800 : 2300)
}
const createMarBits = () => {
  const marBits = []
  for (let i = 0; i < 6; i++) {
    marBits.push({
      bitValue: false
    })
  }
  return marBits
}
const marBits = reactive(createMarBits())

function updateRamGridBits() {
  updateRamColBits()
  updateRamRowBits()
}

// MAR Address Cols
function getColWirePath(colIndex: number) {
  const startX = colIndex * registerWidth + props.width * 0.55
  const startY = props.height * 0.2 // start a bit above register grid
  const downAmount = registerHeight * 8 * 0.1439

  return new PathBuilder(props.width, props.height, startX, startY, 100)
    .down(downAmount) // scale down by unit size used in PathBuilder
    .build()
}
const createMarColBits = () => {
  const marColBits = []
  for (let i = 0; i < 8; i++) {
    marColBits.push({
      bitValue: false
    })
  }
  return marColBits
}
const marColBits = reactive(createMarColBits())
// MAR Col Connector Bits
const shouldTurnOnRamColConnectorBit = (index: number) => {
  // Get the first 3 bits of MAR (column bits)
  const colBits = marBits.slice(0, 3)
  const colValue = (colBits[0].bitValue ? 4 : 0) +
                   (colBits[1].bitValue ? 2 : 0) +
                   (colBits[2].bitValue ? 1 : 0)

  // Enable only the decoded column index
  return index === colValue
}
const createMarColConnectorBits = () => {
  const marColConnectorBits = []
  for (let i = 0; i < 8; i++) {
    marColConnectorBits.push({
      bitValue: shouldTurnOnRamColConnectorBit(i)
    })
  }
  return marColConnectorBits
}
function updateRamColConnectorBits () {
  for (const [index, marColConnectorBit] of marColConnectorBits.entries()) {
    marColConnectorBit.bitValue = shouldTurnOnRamColConnectorBit(index)
  }
}
function getMarColConnectorBitValues () {
  return Array.from({ length: marColBits.length }, (_, i) => (marColConnectorBits[i].bitValue)).reverse()
}
const marColConnectorBits = reactive(createMarColConnectorBits())
// RAM Column Bits
const createRamColBits = () => {
  const ramColBits = []
  for (let i = 0; i < 8; i++) {
    ramColBits.push({
      bitValue: shouldTurnOnRamColConnectorBit(i)
    })
  }
  return ramColBits
}
function updateRamColBits () {
  for (const [index, ramColBit] of ramColBits.entries()) {
    ramColBit.bitValue = shouldTurnOnRamColConnectorBit(index)
  }
}
const ramColBits = reactive(createRamColBits())

// MAR Address Rows
function getRowWirePath(rowIndex: number) {
  // :x="(index % RAM_ROW_SIZE) * registerWidth + props.width * 0.55"
  // :y="Math.floor(index / RAM_ROW_SIZE) * registerHeight + props.height * 0.2"
  const startX = props.width * 0.55 - 2
  const startY = rowIndex * registerHeight + props.height * 0.2 // start a bit above register grid
  const rightAmount = registerWidth * 8 * 0.0845// end a bit below

  return new PathBuilder(props.width, props.height, startX, startY, 100)
    .right(rightAmount) // scale down by unit size used in PathBuilder
    // .right(5)
    .build()
}

// MAR Row Connector Bits
const shouldTurnOnRamRowConnectorBit = (index: number) => {
  // Get the first 3 bits of MAR (column bits)
  const colBits = marBits.slice(3, 6)
  const colValue = (colBits[0].bitValue ? 4 : 0) +
                   (colBits[1].bitValue ? 2 : 0) +
                   (colBits[2].bitValue ? 1 : 0)

  // Enable only the decoded column index
  return index === colValue
}
const createMarRowConnectorBits = () => {
  const marRowConnectorBits = []
  for (let i = 0; i < 8; i++) {
    marRowConnectorBits.push({
      bitValue: shouldTurnOnRamRowConnectorBit(i)
    })
  }
  return marRowConnectorBits
}
function updateRamRowConnectorBits () {
  for (const [index, marRowConnectorBit] of marRowConnectorBits.entries()) {
    marRowConnectorBit.bitValue = shouldTurnOnRamRowConnectorBit(index)
  }
}
function getMarRowConnectorBitValues () {
  return Array.from({ length: marColBits.length }, (_, i) => (marRowConnectorBits[i].bitValue))
}
const marRowConnectorBits = reactive(createMarRowConnectorBits())

// RAM Row Bits
const createRamRowBits = () => {
  const ramRowBits = []
  for (let i = 0; i < 8; i++) {
    ramRowBits.push({
      bitValue: shouldTurnOnRamRowConnectorBit(i)
    })
  }
  return ramRowBits
}
function updateRamRowBits () {
  for (const [index, ramRowBit] of ramRowBits.entries()) {
    ramRowBit.bitValue = shouldTurnOnRamRowConnectorBit(index)
  }
}
const ramRowBits = reactive(createRamRowBits())

// RAM WIRES
const sortedRamWires = computed(() => {
  const colWires = Array.from({ length: ramColBits.length + 1}, (_, i) => ({
    type: 'col',
    index: i,
    // isOn: ramColBits[Math.min(i, ramColBits.length - 1)].bitValue
    isOn: ramColBits[Math.min(i, ramColBits.length - 1)].bitValue || ramColBits[Math.max(Math.min(i-1, ramColBits.length - 1),0)].bitValue
  }))

  const rowWires = Array.from({ length: ramRowBits.length + 1}, (_, i) => ({
    type: 'row',
    index: i,
    isOn: ramRowBits[Math.min(i, ramRowBits.length - 1)].bitValue || ramRowBits[Math.max(Math.min(i-1, ramRowBits.length - 1),0)].bitValue
  }))

  return [...colWires, ...rowWires].sort((a, b) => {
    return a.isOn === b.isOn ? 0 : a.isOn ? 1 : -1 // ensure 'on' wires are rendered last
  })
})

// RAM Set and Enable Wires
const setOn = ref(false)
const enableOn = ref(false)
const toggleSet = () => {
  setOn.value = !setOn.value
  setTimeout(() => {
    updateRamRegisters()
    updateOutputBits()
  }, setOn.value ? 1000 : 500)
}
const toggleEnable = () => {
  enableOn.value = !enableOn.value
  setTimeout(() => {
    updateOutputBits()
  }, enableOn.value ? 1000 : 500)
}
const setWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.4165, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .diag(0.3, 0.3)
  .skip(0, -0.4)
  .right(0.85)
  .up(0.8)
  .build()
const setWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.4165, props.height * 0.88, 10)
  .diag(0.3, 0.3)
  .right(0.3)
  .up(0.1)
  .right(0.3)
  .down(0.1)
  .right(0.85)
  .up(0.8)
  .build()
const enableWirePathOff = new PathBuilder(props.width, props.height, props.width * 0.8755, props.height * 0.88, 10)
  .diag(-0.3, 0.3)
  .left(0.3)
  .up(0.1)
  .diag(-0.3, 0.3)
  .skip(0, -0.4)
  .left(0.85)
  .up(0.8)
  .build()
const enableWirePathOn = new PathBuilder(props.width, props.height, props.width * 0.8755, props.height * 0.88, 10)
  .diag(-0.3, 0.3)
  .left(0.3)
  .up(0.1)
  .left(0.3)
  .down(0.1)
  .left(0.85)
  .up(0.8)
  .build()

// Decoders
function getRamBorderPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.6165, props.height * 0.266, 10)
  .right(2.5)
  .down(4.275)
  .left(2.5)
  .up(4.39)
  .build()
}
function getRamOutputBusConnectorPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.72, props.height * 0.15, 10)
  .diag(0.55, 0.9)
  .build()
}
function getRamInputBusConnectorPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.72, props.height * 0.825, 10)
  .diag(0.55, -0.9)
  .build()
}
function getInputBusConnectorPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.3425, props.height * 0.46, 10)
  .diag(0.5, -0.75)
  .build()
}
function getMarColDecoderPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.295, props.height * 0.102, 10)
  .down(1)
  .build()
}
function getMarRowDecoderPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.295, props.height * 0.2525, 10)
  .down(1)
  .build()
}
function getInputDecoderPath () {
  return new PathBuilder(props.width, props.height, props.width * 0.245, props.height * 0.34575, 10)
  .down(3.2)
  .build()
}

// Output Bits
function getOutputWirePath (yStart: number) {
  return new PathBuilder(props.width, props.height, props.width * 0.8, (props.height * yStart) + (props.height * 0.352), 10)
  .right(0.7)
  .diag(0.5, -0.3)
  .build()
}
const outputBits = reactive(createInputBits())
function updateOutputBits () {
  let activeRegister = ramRegisters[0]
  if (enableOn.value) {
    for (let i = 0; i < ramRegisters.length; i++) {
      if (isActiveRegister(i)) {
        for (let j = 0; j < inputBits.length; j++) {
          activeRegister = ramRegisters[i]
        }
      }
    }
  }
  for (let i = 0; i < outputBits.length; i++) {
    outputBits[i].bitValue = enableOn.value ? activeRegister.bits[i].valueOn : false;
  }
}
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
      <!-- MAR Bits -->
      <!-- <Label :text="'MAR COLUMN'" :x="props.width*0.05" :y="props.height*0.08" :size="15" />
      <Label :text="'BTIS'" :x="props.width*0.05" :y="props.height*0.11" :size="15" />
      <Label :text="'MAR ROW BITS'" :x="props.width*0.06" :y="props.height*0.42" :size="15" />

      <Label :text="'3 x 8 BIT'" :x="props.width*0.27" :y="props.height*0.05" :size="15" />
      <Label :text="'DECODER'" :x="props.width*0.27" :y="props.height*0.08" :size="15" />
      <Label :text="'3 x 8 BIT'" :x="props.width*0.27" :y="props.height*0.39" :size="15" />
      <Label :text="'DECODER'" :x="props.width*0.27" :y="props.height*0.42" :size="15" />
      <Wire
        v-for="(wire, index) in marBits"
        :key="index"
        :pathOn="getInputMarBitPathOn(index/24 + 0.14)"
        :pathOff="getInputMarBitPathOff(index < 3 ? (index/24 + 0.14) : (index/24 + 0.165))"
        :isOn="wire.bitValue"
        :circleStart="true"
        :strokeWidth="strokeWidth"
        :circleSize="circleSize"
        @click="toggleMarBit(wire)"
      /> -->
      <!-- Input Bits -->
      <Label text="INPUT BITS" :x="props.width*0.05" :y="props.height*0.905" :size="20" />
      <Wire
        v-for="(wire, index) in inputBits"
        :key="index"
        :pathOn="getInputMarBitPathOn(index/24 + 0.39)"
        :pathOff="getInputMarBitPathOff(index/24 + 0.39)"
        :isOn="wire.bitValue"
        :circleStart="true"
        :strokeWidth="strokeWidth"
        :circleSize="circleSize"
        @click="toggleInputBit(wire)"
      />
      <ByteWire
        :values="getInputConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.25*props.width
          const startY = 0.4785*props.height + index*spacing

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            .right(1 + index*0.05)
            // .up(2)
            // .up(0.5 + index * 0.05) // delay vertical motion so they separate

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
      />

      <!-- RAM Registers -->
      <RegisterBox
        v-for="(register, index) in ramRegisters"
        :key="index"
        :width="registerWidth"
        :height="registerHeight"
        :x="(index % RAM_ROW_SIZE) * registerWidth + props.width * 0.625"
        :y="Math.floor(index / RAM_ROW_SIZE) * registerHeight + props.height * 0.28"
        :inputWires="register.bits"
        :showLabel="false"
      />
      <ByteWire
        :values="getMarColConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.76*props.width - index*spacing
          const startY = 0.685*props.height

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            .down(2.2 - index*0.1)

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
      />

      <!-- RAM Col and Row bits -->
      <!-- <Label text="RAM" :x="props.width*0.75" :y="props.height*0.2" :size="30" /> -->
      <!-- <Wire
        v-for="wire in sortedRamWires"
        :key="wire.type + '-wire-' + wire.index"
        :pathOn="wire.type === 'col' ? getColWirePath(wire.index) : getRowWirePath(wire.index)"
        :pathOff="wire.type === 'col' ? getColWirePath(wire.index) : getRowWirePath(wire.index)"
        :isOn="wire.isOn"
        :strokeWidth="4"
        :hideInactiveWire="true"
      /> -->
      <!-- <ByteWire
        :values="getMarColConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.3*props.width
          const startY = 0.121*props.height + index*spacing

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            .right(3 - index*0.05)
            .down(1.25 - index*0.085)
            // .right(0.77 + index*0.05)
            // .up(0.5 + index * 0.05) // delay vertical motion so they separate

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
      /> -->
      <!-- <ByteWire
        :values="getMarRowConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.3*props.width
          const startY = 0.275*props.height + index*spacing

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            .right(1.2 - index*0.05)
            .down(1.2)
            .right(0.77 + index*0.05)
            // .up(0.5 + index * 0.05) // delay vertical motion so they separate

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
      /> -->

      <!-- RAM Set and Enable Bits -->
      <!-- <Label text="RAM SET" :x="props.width*0.38" :y="props.height*0.935" :size="20" />
      <Wire
        :pathOn="setWirePathOn"
        :pathOff="setWirePathOff"
        :isOn="setOn"
        :circleStart="true"
        :strokeWidth="strokeWidth"
        :circleSize="circleSize"
        @click="toggleSet"
      />
      <Label text="RAM ENABLE" :x="props.width*0.83" :y="props.height*0.935" :size="20" />
      <Wire
        :pathOn="enableWirePathOn"
        :pathOff="enableWirePathOff"
        :isOn="enableOn"
        :circleStart="true"
        :strokeWidth="strokeWidth"
        :circleSize="circleSize"
        @click="toggleEnable"
      /> -->

      <!-- RAM Output -->
      <!-- <Label text="OUTPUT BITS" :x="props.width*0.87" :y="props.height*0.73" :size="20" />
      <Wire
        v-for="(bit, index) in outputBits"
        :key="index"
        :pathOn="getOutputWirePath(index/24)"
        :pathOff="getOutputWirePath(index/24)"
        :isOn="bit.bitValue"
        :circleEnd="true"
        :circleSize="circleSize"
        :strokeWidth="strokeWidth"
      /> -->

      <!-- BUS Wires -->
      <ByteWire
        :values="getMarColConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.35*props.width + index*spacing
          const startY = 0.475*props.height + index*spacing

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            // .right(1.35 - index*0.05)
            // .down(4.25 - index*0.17)
            // .left(4.75 - index*0.1)
            .up(4)
            .right(5.9 - index*0.1)
            .down(8.25 - index*0.17)
            .left(1.8)

            // .right(0.85 - index*0.05)
            // .right(0.77 + index*0.05)
            // .up(0.5 + index * 0.05) // delay vertical motion so they separate

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
      />
      <ByteWire
        :values="getMarColConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.76*props.width - index*spacing
          const startY = 0.9*props.height - index*spacing

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            .left(4.1 - index*0.1)
            .up(4.2 - index*0.17)

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
        :circleStart="true"
        :circleEnd="true"
        :circleSize="3.5"
      />
      <!-- Bus to RAM Input Wires -->
      <ByteWire
        :values="getMarColConnectorBitValues()"
        :getPath="(index) => {
          const spacing = 6
          const startX = 0.76*props.width - index*spacing
          const startY = 0.275*props.height

          const builder = new PathBuilder(props.width, props.height, startX, startY, 10)
            .up(2 - index*0.0875)

          const path = builder.build()
          return {
            pathOn: path,
            pathOff: path
          }
        }"
        :strokeWidth="2"
        :circleEnd="true"
        :circleSize="3.5"
      />
      <!-- Borders and Decoders -->
      <Wire
        :pathOn="getRamBorderPath()"
        :pathOff="getRamBorderPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      />
      <!-- <Wire
        :pathOn="getRamOutputBusConnectorPath()"
        :pathOff="getRamOutputBusConnectorPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      />
      <Wire
        :pathOn="getInputBusConnectorPath()"
        :pathOff="getInputBusConnectorPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      />
      <Wire
        :pathOn="getRamInputBusConnectorPath()"
        :pathOff="getRamInputBusConnectorPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      /> -->
      <!-- <Wire
        :pathOn="getMarColDecoderPath()"
        :pathOff="getMarColDecoderPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      />
      <Wire
        :pathOn="getMarRowDecoderPath()"
        :pathOff="getMarRowDecoderPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      /> -->
      <Wire
        :pathOn="getInputDecoderPath()"
        :pathOff="getInputDecoderPath()"
        :isOn="false"
        :strokeWidth="16"
        color="black"
      />
    </svg>
  </div>
</template>
