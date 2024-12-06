// @ts-nocheck
const { defineConfig } = require("cypress");

// @ts-nocheck
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://it2810-35.idi.ntnu.no/project2/",
    setupNodeEvents(on, config) {},
  },
});
