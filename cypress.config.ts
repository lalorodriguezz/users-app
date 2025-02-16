const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "2tn7n6",
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
})