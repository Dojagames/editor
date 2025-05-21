<template>
  <nuxt-page/>
</template>
<script setup lang="ts">
onMounted(() => {
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
})
</script>