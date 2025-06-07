<script setup lang="ts">
import Canvas from "@/components/canvas.vue";
import Drawer from "@/components/ui/drawer-left.vue";

const route = useRoute();
const fileId = route.params.id;
</script>

<template>
    <Drawer />
    <Canvas :file="fileId" />
</template>

<style></style>
