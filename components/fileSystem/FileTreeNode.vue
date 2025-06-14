<template>
    <li>
        <div
            class="tree-item"
            @click.self="toggle(node.id)"
            @contextmenu="openContextMenu"
            :class="{ folder: isFolder, active: isActive }"
            tabindex="0"
            @keyup="handleWrapperKeyUp"
        >
            <span v-if="isFolder">{{ open ? "📂" : "📁" }}</span>
            <span v-else>📄</span>

            <span v-if="!editName">{{ node.name }}</span>
            <input
              v-else
              v-model="newName"
              @keyup.enter="onInputEnter
                              "
            ></input>
            <div v-if="contextOpen" id="fileContextMenu">
                <div v-if="isFolder">
                    <button @click.prevent="store.addFolder(node.id); closeContextMenu()">create Folder</button>
                    <button @click.prevent="store.addFile(node.id); closeContextMenu()">create File</button>
                    <button @click.self="editName = true; closeContextMenu()">rename</button>
                </div>
            </div>
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
import { useFileStore } from "~/stores/files.js";
import { useContextWindowStore } from "~/stores/state.js";
const props = defineProps({
    node: {
        type: Object,
        required: true,
    },
});

const { openFile } = useFileNavigation();

const store = useFileStore();
const contextStore = useContextWindowStore();

const open = ref(true);
const isFolder = computed(() => props.node.type === "folder");
const isActive = computed(() => false); // Replace with your active selection logic
const editName = ref(false);
const newName = ref(props.node.name);
const contextOpen = computed(() => contextStore.isOpen(contextId.value));

function toggle(id) {
    if (isFolder.value) {
        open.value = !open.value;
    } else {
        openFile(id);
    }
}

const contextId = computed(() => props.node.id);

function openContextMenu(event) {
  event.preventDefault();
  contextStore.openContext(contextId.value, {
    // Optionally, add more data here (e.g., mouse position)
  });
}

function closeContextMenu() {
  contextStore.closeContext();
}


function handleWrapperKeyUp(event) {
  if (event.key === "Enter"){
    if (!editName.value) {toggle(props.node.id)}
  } else if(event.key === "ArrowUp" || event.key === "k"){
    focusPrevElement(event.target);
  } else if (event.key === "ArrowDown" || event.key === "j"){
    focusNextElement(event.target);
  }
}

function onInputEnter(event){
  if (isFolder.value) {
    store.renameFolder(props.node.id, newName.value)
  } else {
    store.renameFile(props.node.id, newName.value);
  }

  editName.value = false;
  event.stopPropagation();
}

function focusNextElement(current) {
  const focusable = Array.from(document.querySelectorAll('[tabindex="0"]'));
  const idx = focusable.indexOf(current);
  if (idx !== -1 && idx < focusable.length - 1) {
    focusable[idx + 1].focus();
  }
}

function focusPrevElement(current) {
  const focusable = Array.from(document.querySelectorAll('[tabindex="0"]'));
  const idx = focusable.indexOf(current);
  if (idx > 0) {
    focusable[idx - 1].focus();
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

#fileContextMenu{
    position: fixed;
    width: fit-content;
    height: 2rem;

    transform: translateY(-50%);

    border: 1px solid white;
    border-radius: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: .2rem;
}

#fileContextMenu button{
   margin: 0 .2rem;
}
</style>
