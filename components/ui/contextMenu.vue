<script setup lang="ts">
const isTextCollapsed = ref(false);
const isResourceCollapsed = ref(false);
const isEmbeddedCollapsed = ref(false);

function toggleSection(section) {
    if (section === "text") isTextCollapsed.value = !isTextCollapsed.value;
    if (section === "resource")
        isResourceCollapsed.value = !isResourceCollapsed.value;
    if (section === "embedded")
        isEmbeddedCollapsed.value = !isEmbeddedCollapsed.value;
}

const emit = defineEmits(["createObj"]);
</script>

<template>
    <div id="contextWrapper" @wheel.stop>
        <button @click="toggleSection('text')">
            {{ isTextCollapsed ? "Expand Text" : "Collapse Text" }}
        </button>

        <div v-if="!isTextCollapsed" class="context-section">
            <p class="context-add-text" @click="$emit('createObj', 'text')">
                Text
            </p>
            <p class="context-add-toDo">To-Do-List</p>
            <p class="context-add-table">Table</p>
            <p class="context-add-link">Link</p>
            <p class="context-add-bullet">bullet-list</p>
            <p class="context-add-number">number-list</p>
            <p class="context-add-toggleList">toggle-list</p>
        </div>

        <button @click="toggleSection('resource')">
            {{ isResourceCollapsed ? "Expand Resource" : "Collapse Resource" }}
        </button>

        <div v-if="!isResourceCollapsed" class="context-section">
            <p class="context-add-quote">File</p>
            <p class="context-add-image">Image</p>
            <p class="context-add-audio">Audio</p>
            <p class="context-add-video">Video</p>
            <p class="context-add-code">Code</p>
        </div>

        <button @click="toggleSection('embedded')">
            {{ isEmbeddedCollapsed ? "Expand Embedded" : "Collapse Embedded" }}
        </button>

        <div v-if="!isEmbeddedCollapsed" class="context-section">
            <p class="context-add-embed">Embed</p>
        </div>
    </div>
</template>

<style scoped>
#contextWrapper {
    position: absolute;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
    width: fit-content;
    height: fit-content;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    cursor: default;
}

button {
    display: block;
    margin-bottom: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

p {
    margin: 5px 0;
    cursor: pointer;
}

.context-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>
