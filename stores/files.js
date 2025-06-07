import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useFileStore = defineStore("file", {
  state: () => ({
    root: {
      id: "root",
      name: "/",
      type: "folder",
      children: [],
    },
  }),

  getters: {
    getFileById: (state) => (id) => {
      const find = (node) => {
        if (node.type === "file" && node.id === id) return node;
        if (node.type === "folder") {
          for (const child of node.children) {
            const found = find(child);
            if (found) return found;
          }
        }
      };
      return find(state.root);
    },

    searchElements: (state) => (query) => {
      const results = [];

      const walk = (node) => {
        if (node.type === "file") {
          node.elements.forEach((el) => {
            if (
              el.content.includes(query) ||
              el.tags?.some((tag) => tag.includes(query))
            ) {
              results.push({ fileId: node.id, element: el });
            }
          });
        } else {
          node.children.forEach(walk);
        }
      };

      walk(state.root);
      return results;
    },
  },

  actions: {
    addFile(parentFolderId, name = "Untitled File") {
      const folder = this.getFolderById(parentFolderId);
      if (!folder || folder.type !== "folder") return;

      folder.children.push({
        id: uuid(),
        name,
        type: "file",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        elements: [],
        meta: {},
      });
    },

    addFolder(parentFolderId, name = "New Folder") {
      const parent = this.getFolderById(parentFolderId);
      if (!parent || parent.type !== "folder") return;

      parent.children.push({
        id: uuid(),
        name,
        type: "folder",
        children: [],
      });
    },

    getFolderById(id) {
      const find = (node) => {
        if (node.type === "folder" && node.id === id) return node;
        if (node.type === "folder") {
          for (const child of node.children) {
            const found = find(child);
            if (found) return found;
          }
        }
      };
      return find(this.root);
    },

    updateElement(fileId, updatedElement) {
      const file = this.getFileById(fileId);
      if (!file) return;

      const index = file.elements.findIndex(
        (el) => el.id === updatedElement.id,
      );
      if (index !== -1) {
        file.elements[index] = { ...file.elements[index], ...updatedElement };
        file.updatedAt = new Date().toISOString();
      }
    },
  },
});
