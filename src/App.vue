<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div class="dark">
    <router-view></router-view>
  </div>
</template>

<style></style>
