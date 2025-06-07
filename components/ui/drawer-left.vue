<script setup lang="ts">
import { useFileStore } from "@/stores/files";
import TreeNode from "@/components/fileSystem/FileTreeNode.vue";

const store = useFileStore();

const drawerOpen = ref(false);

const searchDrawer = ref("");

function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value;
}

const filteredStore = computed(() => {
    return searchDrawer.value !== ""
        ? store.getFileTreeFilteredByName(searchDrawer.value)
        : store.root;
});

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

        <div id="searchbar">
            <input
                placeholder="search files..."
                v-model="searchDrawer"
                id="searchBarInput"
            />
            <Icon
                v-if="searchDrawer !== ''"
                name="material-symbols:close-rounded"
                id="closeSearchIcon"
                @click="searchDrawer = ''"
            />
        </div>

        <div id="drawerIcons"></div>

        <div id="fileStructure">
            <ul class="file-tree">
                <TreeNode :node="filteredStore" />
            </ul>
        </div>

        <div id="settings">
            <Icon name="fluent:settings-28-filled" id="settingsIcon" />
        </div>
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

    display: flex;
    flex-direction: column;
}

#closeIcon {
    position: absolute;
    top: 1vh;
    right: 1vh;
    filter: invert(1);
    cursor: pointer;
    font-size: 1.5rem;
}

#searchbar {
    margin-top: 4rem;
    width: 100%;
    height: 2rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

#searchBarInput {
    width: 86%;
    padding: 0 2%;
    height: 100%;
    background: transparent;
    outline: none;
    border: 1px solid white;
    border-radius: 2rem;
    color: white;
}

#closeSearchIcon {
    font-size: 1.5rem;
    filter: invert(1);
    position: absolute;
    right: 2rem;
}

#fileStructure {
    color: white;
    flex: 1 1 auto;
    overflow-y: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.file-tree {
    list-style: none;
    padding-left: 0;
    margin: 0;
}

#settings {
    width: 100%;
    height: 2rem;
    position: absolute;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

#settingsIcon {
    position: absolute;
    right: 1rem;
    font-size: 2rem;
    filter: invert(1);
    cursor: pointer;
}
</style>
