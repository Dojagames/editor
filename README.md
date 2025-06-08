# 🧠 InfinityCanvas — A File-Based Visual Notes App (Nuxt + Vue + Pinia)

> A highly extensible, offline-first, real-time collaborative note-taking system  
> Inspired by [Notion](https://www.notion.so/) and [Obsidian](https://obsidian.md/), powered by a file/folder structure and canvas-like infinite space.

---

## ✨ Features

- 🎨 **Canvas-Based Editor** — Infinite 2D space, draggable & resizable components
- 🗃 **Filesystem Structure** — Folders can contain files or other folders
- 📝 **Typed Elements** — Text, images, links, references, and more
- 🔍 **Search & Tagging** — Full-text and tag-based element search
- 💾 **Persistent State** — Uses localStorage for offline support
- 📡 **Real-Time Collaboration** *(planned)* — via `socket.io`
- 🌐 **SPA-Mode Nuxt App** — Optimized for offline-first usage

---

## 📁 Project Structure

.
├── assets/
│ └── css/ # Global styles
├── components/
│ └── TreeNode.vue # Recursive file/folder UI
├── composables/
├── layouts/
├── pages/
│ └── index.vue # Root canvas entry
├── plugins/
│ └── pinia-persist.client.ts
├── stores/
│ └── files.js # Pinia store for file structure and elements
├── public/
├── nuxt.config.ts
└── README.md


---

## 🛠 Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue 3 Composition API](https://vuejs.org/)
- [Pinia Store](https://pinia.vuejs.org/)
- [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)
- [uuid](https://www.npmjs.com/package/uuid)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
