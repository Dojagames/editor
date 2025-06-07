<script setup lang="ts">
const drawerOpen = ref(false);

function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value;
}

defineExpose({
    toggleDrawer,
});
</script>

<template>
    <div v-if="!drawerOpen" id="drawerButton" @click="toggleDrawer()">
        <Icon name="majesticons:menu" id="drawerIcon" />
    </div>
    <div v-else id="drawer">
        <Icon
            name="material-symbols:close-rounded"
            @click="toggleDrawer()"
            id="closeIcon"
        />
        <div id="searchbar"></div>
        <div id="drawerIcons"></div>
        <div id="fileStructure"></div>
        <div id="settings"></div>
    </div>
</template>

<style scoped>
#drawerButton {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    border-radius: 10%;

    position: fixed;
    top: 1vh;
    left: 1vh;
    z-index: 1000;

    cursor: pointer;
}

#drawerIcon {
    filter: invert(1);
    font-size: 2rem;
}

#drawer {
    width: 20vw;
    height: 100vh;
    background-color: var(--background-2);
    position: fixed;
    z-index: 1000;

    border-right: 2px solid;
}

#closeIcon {
    position: absolute;
    top: 1vh;
    right: 1vh;
    filter: invert(1);
    cursor: pointer;
    font-size: 1.5rem;
}
</style>
