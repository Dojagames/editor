<template>
    <nuxt-page />
</template>
<script setup lang="ts">
onMounted(() => {
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
});
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
    background-color: #1a1a1a;
    color: #333 !important;
    line-height: 1.5;
}

:root {
    --background-1: #0a0f2f;
    --background-2: #2c2e38;
    --spacer: #6a6e7d;
}
</style>
