import { defineStore } from "pinia";

export const useContextWindowStore = defineStore("contextWindow", {
  state: () => ({
    // The id of the currently open context window, or null if none is open
    openContextId: null,
    // Optionally, you can store extra info about the context (e.g., type, position)
    contextData: null,
  }),

  actions: {
    openContext(id, data = null) {
      // Close any other context window and open the new one
      this.openContextId = id;
      this.contextData = data;
    },
    closeContext() {
      this.openContextId = null;
      this.contextData = null;
    },
    isOpen(id) {
      return this.openContextId === id;
    },
  },
});
