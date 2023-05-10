<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div class="">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<style></style>
