// vite.config.js
import { defineConfig } from "file:///C:/Users/rutik/OneDrive/Desktop/Acciojob%20Projects/techtinder/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/rutik/OneDrive/Desktop/Acciojob%20Projects/techtinder/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/rutik/OneDrive/Desktop/Acciojob%20Projects/techtinder/frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTest.js"
  }
});
export {
  vite_config_default as default
};
