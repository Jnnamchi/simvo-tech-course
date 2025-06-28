<script setup lang="ts">
import { computed, ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import NandGate from '../items/NandGate.vue'
import Chip from '../items/Chip.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const transistorInput1WireOn = ref(false)
const transistorInput2WireOn = ref(false)
const outputWireOn = ref(true)

// Transistor Wire Paths
const outputWirePath = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.525, 10)
  .right(3)
  .diag(0.5, -0.5)
  .build()

// Inputs 1 and 2 Paths
const transistorInput1PathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.5, 10)
  .diag(0.5, 1)
  .right(1)
  .up(0.3)
  .diag(0.5, 0.4)
  .skip(0, -0.7)
  .right(2)
  .build()
const transistorInput1PathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.5, 10)
  .diag(0.5, 1)
  .right(1)
  .up(0.3)
  .right(0.5)
  .down(0.3)
  .right(2)
  .build()

const transistorInput2PathOff = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.75, 10)
  .diag(0.5, 1)
  .right(1)
  .up(0.3)
  .diag(0.5, 0.4)
  .skip(0, -0.7)
  .right(2)
  .build()
const transistorInput2PathOn = new PathBuilder(props.width, props.height, props.width * 0.1, props.height * 0.75, 10)
  .diag(0.5, 1)
  .right(1)
  .up(0.3)
  .right(0.5)
  .down(0.3)
  .right(2)
  .build()

const toggleInput1 = () => {
  transistorInput1WireOn.value = !transistorInput1WireOn.value
  toggleNandGate()
}
const toggleInput2 = () => {
  transistorInput2WireOn.value = !transistorInput2WireOn.value
  toggleNandGate()
}
const toggleNandGate = () => {
  const nandGateOn = !transistorInput1WireOn.value || !transistorInput2WireOn.value
  outputWireOn.value = nandGateOn
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

      <!-- Transistor Inputs 1 and 2 -->
      <Wire
        :pathOn="transistorInput1PathOn"
        :pathOff="transistorInput1PathOff"
        :isOn="transistorInput1WireOn"
        :circleStart="true"
        @click="toggleInput1"
      />
      <Wire
        :pathOn="transistorInput2PathOn"
        :pathOff="transistorInput2PathOff"
        :isOn="transistorInput2WireOn"
        :circleStart="true"
        @click="toggleInput2"
      />

       <!-- Power and Output Wires -->
      <Wire
        :pathOn="outputWirePath"
        :pathOff="outputWirePath"
        :isOn="outputWireOn"
        :circleEnd="true"
      />

      <NandGate
        :width="250"
        :height="250"
        :x="props.width*0.425"
        :y="props.height*0.346"
        :angle="0"
      />
    </svg>
  </div>
</template>
