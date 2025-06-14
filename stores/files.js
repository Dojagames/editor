import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

import { mockFileTree } from "@/mock/fileTree";

export const useFileStore = defineStore("file", {
  state: () => ({
    root: {
      id: "root",
      name: "/",
      type: "folder",
      children: [],
    },
    tempfile: null,
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

    getFileTreeFilteredByName: (state) => (searchString) => {
      const lowerSearch = searchString.toLowerCase();

      function filterNode(node) {
        if (node.type === "file") {
          return node.name.toLowerCase().includes(lowerSearch)
            ? { ...node }
            : null;
        }

        if (node.type === "folder") {
          const filteredChildren = node.children
            .map(filterNode)
            .filter(Boolean);

          return filteredChildren.length > 0
            ? {
                ...node,
                children: filteredChildren,
              }
            : null;
        }

        return null;
      }

      return (
        filterNode(state.root) || {
          id: "root",
          name: "/",
          type: "folder",
          children: [],
        }
      );
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

    addFolder(parentFolderId = "root", name = "New Folder") {
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

    renameFile(id, newName) {
      const file = this.getFileById(id);
      if (file && file.type === "file") {
        file.name = newName;
        file.updatedAt = new Date().toISOString();
      }
    },

    renameFolder(id, newName) {
      const folder = this.getFolderById(id);
      if (folder && folder.type === "folder") {
        folder.name = newName;
        folder.updatedAt = new Date().toISOString();
      }
    },

    createTempFile(title = "Untitled") {
      const now = new Date().toISOString();
      this.tempFile = {
        id: uuid(),
        name: title,
        type: "file",
        createdAt: now,
        updatedAt: now,
        elements: [],
        meta: { temp: true },
      };
      return this.tempFile;
    },

    commitTempFile() {
      if (!this.tempFile) return;

      this.tempFile.meta.temp = false;
      this.root.children.push(this.tempFile);
      this.tempFile = null;
    },

    discardTempFile() {
      this.tempFile = null;
    },
  },
  persist: true,
});
