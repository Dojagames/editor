<script setup lang="ts">
import { useFileNavigation } from "@/composables/rootFunctions";
import { useFileStore } from "@/stores/files";

const store = useFileStore();
const { openFile } = useFileNavigation();

onMounted(() => {
    const file = store.createTempFile("New Canvas");
    console.log("restored root:", store.root);
    openFile("temp");
});
</script>

<template>
    <RouterView />
</template>

<style></style>
