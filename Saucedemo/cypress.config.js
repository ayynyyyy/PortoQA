const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity : false,
    testIsolation : false,
    pageLoadTimeout: 120000, // Tunggu hingga 120 detik
    defaultCommandTimeout: 10000, // Timeout default untuk command Cypress

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
