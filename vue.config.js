const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/ui/assets/styles/index.scss";' +
            '@import "@/ui/assets/styles/fonts.scss";',
      },
    },
  },
});
