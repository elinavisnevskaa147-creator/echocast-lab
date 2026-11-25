import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            input: {
                index: resolve(import.meta.dirname, "index.html"),
                catalog: resolve(import.meta.dirname, "catalog.html"),
                collection: resolve(import.meta.dirname, "collection.html"),
                checkout: resolve(import.meta.dirname, "checkout.html"),
                detail: resolve(import.meta.dirname, "detail.html")
            }
        }
    }
});
