<script setup>
import { ref } from 'vue'
import SearchBar from "~/components/ui/searchBar.vue";
import ContextMenu from "~/components/ui/contextMenu.vue";

//state:
const contextMenuOpen = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });

//const MousePos = ref({ x: 0, y: 0 });


const elements = ref([
  { id: 1, x: 0, y: 0, width: 200, height: 100, content: 'Note 1', active: false,  },
  { id: 2, x: 500, y: -300, width: 150, height: 80, content: 'Note 2' }
])

const translate = ref({x: 0, y: 0})
const zoom = ref(1)
const isPanning = ref(false)
const lastMouse = ref({x: 0, y: 0})

function mouseDown(e) {
  contextMenuOpen.value = false
  if (e.button === 0) {
    startPan(e)
  } else if(e.button === 2){
    contextMenuOpen.value = true
    contextMenuPosition.value = { x: e.clientX, y: e.clientY }
  }
}

function startPan(e) {
  isPanning.value = true
  lastMouse.value = {x: e.clientX, y: e.clientY}
}

function pan(e) {
  if (!isPanning.value) return
  const dx = e.clientX - lastMouse.value.x
  const dy = e.clientY - lastMouse.value.y
  translate.value.x += dx
  translate.value.y += dy
  lastMouse.value = {x: e.clientX, y: e.clientY}
}

function endPan() {
  isPanning.value = false
}

function onWheel(e) {
  const delta = -e.deltaY / 500
  const newZoom = Math.min(Math.max(zoom.value + delta, 0.1), 5)
  zoom.value = newZoom
}
</script>

<template>
  <!-- UI -->
  <search-bar />

  <!-- Canvas -->
  <div
      class="canvas-container"
      @mousedown.self="mouseDown"
      @mousemove="pan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @wheel.prevent.self="onWheel"
  >
    <!-- Context Menu -->
    <context-menu
        v-if="contextMenuOpen"
        :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }"
        class="context-menu-background"

        @text-click="() => {
          console.log('Text clicked')
          contextMenuOpen = false
        }"
    />

    <div
        class="canvas-content"
        :style="{
        transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`
      }"
    >
      <div class="grid-background"></div>

      <div
          v-for="item in elements"
          :key="item.id"
          class="canvas-element"
          :style="{
          left: item.x + 'px',
          top: item.y + 'px',
          width: item.width + 'px',
          height: item.height + 'px'
        }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  cursor: grab;
}

.context-menu-background {
  position: absolute;
  z-index: 0; /* Ensures it stays in the background */
}

.canvas-content {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
}

.Agrid-background {
  position: absolute;
  width: 100000px;
  height: 100000px;
  left: -50000px;
  top: -50000px;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, #888888 1px, transparent 1px),
  linear-gradient(to bottom, #888888 1px, transparent 1px);
  z-index: 0;
  pointer-events: none;
}

.canvas-element {
  position: absolute;
  background: white;
  border: 1px solid #aaa;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
}
</style>