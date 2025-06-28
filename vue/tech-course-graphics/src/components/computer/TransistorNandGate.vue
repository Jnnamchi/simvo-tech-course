<script setup lang="ts">
import { computed, ref } from 'vue'
import Wire from '../items/Wire.vue'
import { PathBuilder } from '../../utils/path'
import Transistor from '../items/Transistor.vue'
import Chip from '../items/Chip.vue'

const props = defineProps<{
  height: number
  width: number
}>()

const powerWireOn = ref(true)
const outputWireOn = ref(true)

const transistorInputWireOn = ref(false)
const intraTransistorWireOn = ref(false)
const transistorGroundWireOn = ref(false)

const transistorInput1WireOn = ref(false)
const transistorInput2WireOn = ref(false)

// Transistor Wire Paths
const powerWirePath = new PathBuilder(props.width, props.height, props.width * 0.4, props.height * 0.1, 10)
  .diag(1, -0.5)
  .down(0.75)
  .build()
const outputWirePath = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.225, 10)
  .right(3)
  .diag(0.5, -0.5)
  .build()
const transistorInputPath = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.225, 10)
  .down(1)
  .build()
const intraTransistorWirePath = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.47, 10)
  .down(1.2)
  .build()
const transistorGroundPath = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.67, 10)
  .down(2)
  .diag(1, -0.5)
  .build()

// Inputs 1 and 2 Paths
const transistorInput1PathOff = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.4, 10)
  .left(2)
  .up(0.3)
  .diag(-0.5, 0.4)
  .skip(0, -0.7)
  .left(1)
  .diag(-0.5, -1)
  .build()
const transistorInput1PathOn = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.4, 10)
  .left(2)
  .up(0.3)
  .left(0.5)
  .down(0.3)
  .left(1)
  .diag(-0.5, -1)
  .build()

  const transistorInput2PathOff = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.65, 10)
  .left(2)
  .up(0.3)
  .diag(-0.5, 0.4)
  .skip(0, -0.7)
  .left(1)
  .diag(-0.5, -1)
  .build()
const transistorInput2PathOn = new PathBuilder(props.width, props.height, props.width * 0.5, props.height * 0.65, 10)
  .left(2)
  .up(0.3)
  .left(0.5)
  .down(0.3)
  .left(1)
  .diag(-0.5, -1)
  .build()

const getInputPath1 = computed(() => {
  return transistorInput1WireOn.value ? transistorInput1PathOn : transistorInput1PathOff
})
const getInputPath2 = computed(() => {
  return transistorInput2WireOn.value ? transistorInput2PathOn : transistorInput2PathOff
})

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
  transistorInputWireOn.value = !nandGateOn
  outputWireOn.value = nandGateOn
  setTimeout(() => {
    intraTransistorWireOn.value = !nandGateOn
  }, 500)
  setTimeout(() => {
    transistorGroundWireOn.value = !nandGateOn
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

      <!-- Transistor Inputs 1 and 2 -->
      <Wire
        :pathOn="getInputPath1"
        :pathOff="getInputPath1"
        :isOn="transistorInput1WireOn && transistorInput2WireOn"
        :circleEnd="true"
        @click="toggleInput1"
      />
      <Wire
        :pathOn="getInputPath2"
        :pathOff="getInputPath2"
        :isOn="transistorInput1WireOn && transistorInput2WireOn"
        :circleEnd="true"
        @click="toggleInput2"
      />

      <!-- Power and Output Wires -->
      <Wire
        :pathOn="transistorInputPath"
        :pathOff="transistorInputPath"
        :isOn="transistorInputWireOn"
      />
      <Wire
        :pathOn="intraTransistorWirePath"
        :pathOff="intraTransistorWirePath"
        :isOn="intraTransistorWireOn"
      />
      <Wire
        :pathOn="transistorGroundPath"
        :pathOff="transistorGroundPath"
        :isOn="transistorGroundWireOn"
        :circleEnd="true"
      />

       <!-- Power and Output Wires -->
      <Wire
        :pathOn="outputWirePath"
        :pathOff="outputWirePath"
        :isOn="outputWireOn"
        :circleEnd="true"
      />
      <Wire
        :pathOn="powerWirePath"
        :pathOff="powerWirePath"
        :isOn="powerWireOn"
        :circleStart="true"
        :circleEnd="true"
      />

      <!-- Transistors -->
      <Transistor
        :height="40"
        :width="105"
        :x="props.width*0.5"
        :y="props.height*0.4"
        :angle="90"
      ></Transistor>
      <Transistor
        :height="40"
        :width="105"
        :x="props.width*0.5"
        :y="props.height*0.65"
        :angle="90"
      ></Transistor>
    </svg>
  </div>
</template>
