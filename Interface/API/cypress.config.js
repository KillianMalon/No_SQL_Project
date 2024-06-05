import { defineConfig } from "cypress";

export default defineConfig({
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: "http://localhost:8080",
  },
});