<script setup lang="ts">
import { themeBlack, registerBoxColor } from '../../constants'

const props = defineProps<{
  width: number
  height: number
  x: number
  y: number
  inputWires: any[]
  showLabel?: boolean
}>()

const fontSize = Math.min(props.height / 4, 50)
const labelFontSize = props.height / 20
const xPos = props.x
const yPos = props.y

const label = "REGISTER"

function getValue() {
  const binary = props.inputWires
    .slice(0, 8)
    .map(w => w.valueOn ? '1' : '0')
    .join('');

  const code = parseInt(binary, 2);

  const controlChars: Record<number, string> = {
    0: 'NULL', 1: 'SOH', 2: 'STX', 3: 'ETX',
    4: 'EOT', 5: 'ENQ', 6: 'ACK', 7: 'BEL',
    8: 'BS', 9: 'TAB', 10: 'LF', 11: 'VT',
    12: 'FF', 13: 'CR', 14: 'SO', 15: 'SI',
    16: 'DLE', 17: 'DC1', 18: 'DC2', 19: 'DC3',
    20: 'DC4', 21: 'NAK', 22: 'SYN', 23: 'ETB',
    24: 'CAN', 25: 'EM', 26: 'SUB', 27: 'ESC',
    28: 'FS', 29: 'GS', 30: 'RS', 31: 'US'
  };

  if (code < 32) return controlChars[code] || 'CTRL';
  if (code === 127) return 'DEL';
  if (code >= 32 && code <= 126) return String.fromCharCode(code);
  return 'N/A';
}

</script>

<template>
  <!-- Fill box -->
  <rect
    :width="props.width"
    :height="props.height"
    :x="xPos"
    :y="yPos"
    :fill="registerBoxColor"
  />

  <!-- Border -->
  <rect
    :width="props.width"
    :height="props.height"
    :x="xPos"
    :y="yPos"
    fill="none"
    :stroke="themeBlack"
    stroke-width="4"
  />

  <!-- Centered 'M' label -->
  <text
    :x="xPos + props.width / 2"
    :y="yPos + props.height / 2 + props.height / 30"
    dominant-baseline="middle"
    text-anchor="middle"
    :font-size="fontSize"
    :fill="themeBlack"
  >
    {{getValue()}}
  </text>
  <text
    v-if="showLabel ?? true"
    :x="xPos + props.width * 0.1"
    :y="yPos + props.height * 0.95"
    dominant-baseline="left"
    text-anchor="left"
    :font-size="labelFontSize"
    :fill="themeBlack"
  >
    {{label}}
  </text>
</template>
