<template>
  <component :is="layout">
    <Toast/>
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const layout = computed(() => {
  const routeMeta = useRoute().meta

  return routeMeta.layout + '-layout'
})

</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  min-width: 100%;
  color: #2e3c2d;
  background-color: #e5e5e5;
  min-height: 100vh;
  transition: color 0.5s, #fff 0.5s;
  line-height: 1.6;
  font-family: Manrope, sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>