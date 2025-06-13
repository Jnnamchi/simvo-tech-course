<script setup lang="ts">
import { ref } from 'vue'
import SimpleCircuit from '../components/computer/SimpleCircuit.vue'
import TransistorCircuit from '@/components/computer/TransistorCircuit.vue'
import TransistorCircuitChip from '@/components/computer/TransistorCircuitChip.vue';
import MemoryBit from '@/components/computer/MemoryBit.vue';

// Define your component options
const components = [
  { name: 'Simple Circuit', component: SimpleCircuit },
  { name: 'Transistor Circuit', component: TransistorCircuit },
  { name: 'Transistor Circuit (Chip)', component: TransistorCircuitChip },
  { name: 'Memory Bit', component: MemoryBit },

  // Add more later like:
  // { name: 'ALU Demo', component: AluDemo },
  // { name: 'Register Display', component: RegisterDisplay },
]

const selectedComponent = ref(components[0]) // Default selection
</script>

<template>
  <main>
    <h2>Computer Component Selector</h2>

    <!-- Component Selection Menu -->
    <div class="menu">
      <button
        v-for="(item, index) in components"
        :key="index"
        @click="selectedComponent = item"
        :class="{ active: selectedComponent.name === item.name }"
      >
        {{ item.name }}
      </button>
    </div>

    <!-- Render the selected component -->
   <div class="container">
      <div class="component-display">
        <component
          :is="selectedComponent.component"
          :height="600"
          :width="1200"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>

main{
  padding: 1rem;
}

.menu {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 200px;
  border: solid #4d5054 1px;
  background: none;
}

button.active {
  background-color: #4d5054;
  color: white;
  border: none;
}

.container {
  height: 80vh;
  display: flex;
  justify-content: center; /* horizontal center */
  align-items: center;     /* vertical center */
}

.component-display {
  /* optional styles */
  padding: 1rem;
}
</style>
