<script setup lang="ts">
import { ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import NandGate from '../items/NandGate.vue'
import Chip from '../items/Chip.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const isOn = ref(false)
const inputBitOn = ref(false)
const setBitOn = ref(false)
const setToInputBitOn = ref(false)

const inputNandGateOutputBit = ref(true)
const inputNandGateOutputBit2 = ref(true)

const setNandOutputToOtherOutputBit = ref(true)

const otherOutputBit = ref(true)
const outputBit = ref(false)
const outputBit2 = ref(false)

const inputBitPathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.3, 10)
  .diag(0.5, 0.5)
  .right(0.5)
  .up(0.3)
  .diag(0.5, 0.5)
  .skip(0, -0.8)
  .right(1)
  .build()
const inputBitPathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.3, 10)
  .diag(0.5, 0.5)
  .right(0.5)
  .up(0.3)
  .right(0.5)
  .down(0.3)
  .right(1)
  .build()

const setBitPathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.8, 10)
  .diag(0.5, 0.5)
  .right(0.5)
  .up(0.3)
  .diag(0.5, 0.5)
  .skip(0, -0.8)
  .right(2.5)
  .build()
const setBitPathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.8, 10)
  .diag(0.5, 0.5)
  .right(0.5)
  .up(0.3)
  .right(0.5)
  .down(0.3)
  .right(2.5)
  .build()

// Midpoint Bits
const setToInputBitPathOn = new PathBuilder(props.width, props.height, props.width * 0.312, props.height * 0.75, 10)
  .up(4.7)
  .right(0.5)
  .build()
const inputNandOutputBitToSetNand = new PathBuilder(props.width, props.height, props.width * 0.39, props.height * 0.2625, 10)
  .right(0.5)
  .down(4.5)
  .right(0.6)
  .build()
const inputNandOutputBitToOutputNand = new PathBuilder(props.width, props.height, props.width * 0.44, props.height * 0.2625, 10)
  .up(0.15)
  .right(2.7)
  .build()

const setNandOutputBitToOtherOutputNand = new PathBuilder(props.width, props.height, props.width * 0.54, props.height * 0.7328, 10)
  .right(0.8)
  .down(0.15)
  .right(0.8)
  .build()

const outputBitPath = new PathBuilder(props.width, props.height, props.width * 0.74, props.height * 0.2625, 10)
  .right(1.15)
  .diag(0.5, -0.5)
  .build()

const outputBitPathToOtherOutputNand = new PathBuilder(props.width, props.height, props.width * 0.8, props.height * 0.2625, 10)
  .down(1.5)
  .diag(-1.5, -1.5)
  .down(1.5)
  .right(0.5)
  .build()

const otherOutputToOutputNand = new PathBuilder(props.width, props.height, props.width * 0.7, props.height * 0.7328, 10)
  .right(1)
  .up(1.5)
  .diag(-1.5, 1.5)
  .up(1.5)
  .right(0.5)
  .build()

const toggleInput = () => {
  inputBitOn.value = !inputBitOn.value
  setTimeout(() => {
    updateInputNandOutputBits()
  }, inputBitOn.value ? 1000 : 500)
}
const toggleSet = () => {
  setBitOn.value = !setBitOn.value
  setTimeout(() => {
    setToInputBitOn.value = !setToInputBitOn.value
  }, setBitOn.value ? 450 : 200)
  setTimeout(() => {
    updateInputNandOutputBits()
  }, inputBitOn.value ? 1500 : 500)

  setTimeout(() => {
    updateSetNandOutputToOtherOutputBit()
  }, 1000)

}

const updateInputNandOutputBits = () => {
  if (inputBitOn.value && setBitOn.value) {
    inputNandGateOutputBit.value = false
    setTimeout(() => {
      inputNandGateOutputBit2.value = false
    }, 100)
  } else {
    inputNandGateOutputBit.value = true
    setTimeout(() => {
      inputNandGateOutputBit2.value = true
    }, 100)
  }

  setTimeout(() => {
    updateSetNandOutputToOtherOutputBit()
  }, 1000)
}

const updateSetNandOutputToOtherOutputBit = () => {
  if (inputNandGateOutputBit.value && setBitOn.value) {
    setNandOutputToOtherOutputBit.value = false
  } else {
    setNandOutputToOtherOutputBit.value = true
  }
  setTimeout(() => {
    updateOtherOutputBit()
  }, 1000)
}

const updateOtherOutputBit = () => {
  if (setNandOutputToOtherOutputBit.value && outputBit.value) {
    otherOutputBit.value = false
  } else {
    otherOutputBit.value = true
  }
  setTimeout(() => {
    updateOutputBit()
  }, 1000)
}

const updateOutputBit = () => {
  if (inputNandGateOutputBit2.value && otherOutputBit.value) {
    outputBit.value = false
  } else {
    outputBit.value = true
  }
  setTimeout(() => {
    outputBit2.value = outputBit.value
  }, 500)

  setTimeout(() => {
    updateOtherOutputBit()
  }, 1000)
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

      <!-- Other Bits That Create the Memory -->

      <Wire
        :pathOn="setToInputBitPathOn"
        :pathOff="setToInputBitPathOn"
        :isOn="setToInputBitOn"
      />
      <Wire
        :pathOn="inputNandOutputBitToOutputNand"
        :pathOff="inputNandOutputBitToOutputNand"
        :isOn="inputNandGateOutputBit2"
      />
      <Wire
        :pathOn="inputNandOutputBitToSetNand"
        :pathOff="inputNandOutputBitToSetNand"
        :isOn="inputNandGateOutputBit"
      />
      <Wire
        :pathOn="setNandOutputBitToOtherOutputNand"
        :pathOff="setNandOutputBitToOtherOutputNand"
        :isOn="setNandOutputToOtherOutputBit"
      />
      <Wire
        :pathOn="outputBitPathToOtherOutputNand"
        :pathOff="outputBitPathToOtherOutputNand"
        :isOn="outputBit2"
      />
      <Wire
        :pathOn="outputBitPath"
        :pathOff="outputBitPath"
        :circleEnd="true"
        :isOn="outputBit"
      />
      <Wire
        :pathOn="otherOutputToOutputNand"
        :pathOff="otherOutputToOutputNand"
        :isOn="otherOutputBit"
      />

      <!-- Input and Set Bits -->
      <Wire
        :pathOn="inputBitPathOn"
        :pathOff="inputBitPathOff"
        :isOn="inputBitOn"
        :circleStart="true"
        @click="toggleInput"
      />
      <Wire
        :pathOn="setBitPathOn"
        :pathOff="setBitPathOff"
        :isOn="setBitOn"
        :circleStart="true"
        @click="toggleSet"
      />


      <!-- NAND Gates -->
      <NandGate
        :width="50"
        :height="60"
        :x="props.width*0.35"
        :y="props.height*0.22"
        :angle="0"
      />
      <NandGate
        :width="50"
        :height="60"
        :x="props.width*0.5"
        :y="props.height*0.69"
        :angle="0"
      />
      <NandGate
        :width="50"
        :height="60"
        :x="props.width*0.7"
        :y="props.height*0.22"
        :angle="0"
      />
      <NandGate
        :width="50"
        :height="60"
        :x="props.width*0.7"
        :y="props.height*0.69"
        :angle="0"
      />

    </svg>
  </div>
</template>
