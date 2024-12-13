const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'x4y3da',
  component: {
    devServer: {
      framework: 'java-script',
    },
  },
  e2e: {
    baseUrl: 'https://qastoredesafio.lojaintegrada.com.br/',
    viewportWidth : 1366,
    viewportHeight : 768,
    fixturesFolder: false,
    video: false,
  },
})
