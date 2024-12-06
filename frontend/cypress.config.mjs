import { defineConfig } from "cypress";

// Had errors with cypress not accepting cypress.config.ts as the config file- had to change to cypress.config.mjs for everything to work.
export default defineConfig({
  e2e: {
    baseUrl: "http://it2810-35.idi.ntnu.no/project2/",
    setupNodeEvents() {
      
    },
  },
});
