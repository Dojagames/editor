<template>
    <li>
        <div
            class="tree-item"
            @click="toggle(node.id)"
            :class="{ folder: isFolder, active: isActive }"
        >
            <span v-if="isFolder">{{ open ? "📂" : "📁" }}</span>
            <span v-else>📄</span>
            {{ node.name }}
        </div>

        <ul v-if="isFolder && open" class="tree-children">
            <TreeNode
                v-for="child in node.children"
                :key="child.id"
                :node="child"
            />
        </ul>
    </li>
</template>

<script setup>
import { ref, computed } from "vue";
import TreeNode from "@/components/fileSystem/FileTreeNode.vue";
import { useFileNavigation } from "@/composables/rootFunctions";

const props = defineProps({
    node: {
        type: Object,
        required: true,
    },
});

const { openFile } = useFileNavigation();

const open = ref(true);
const isFolder = computed(() => props.node.type === "folder");
const isActive = computed(() => false); // Replace with your active selection logic

function toggle(id) {
    if (isFolder.value) {
        open.value = !open.value;
    } else {
        openFile(id);
    }
}
</script>

<style scoped>
.tree-item {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    user-select: none;
}

.tree-item.folder {
    font-weight: bold;
}

.tree-item.active {
    background-color: #eef;
    border-radius: 4px;
}

.tree-children {
    padding-left: 1rem;
    list-style: none;
}
</style>
