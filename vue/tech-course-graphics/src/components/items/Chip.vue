<script setup lang="ts">
  defineProps<{
    height: number
    width: number
  }>()
</script>

<template>
  <rect :width="width" :height="height" rx="20" ry="20" fill="#257a40" />
</template>
