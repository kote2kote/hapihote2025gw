import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // base: '/docs',
  // site: 'https://',
  // outDir: './my-custom-build-directory',
  // assets: '_custom',
  compressHTML: false,
  vite: {
    build: {
      minify: false
  },
    css: {
      preprocessorOptions: {
        scss: {
          // importしたいファイルを記載 
          additionalData: `@import "src/assets/scss/_global.scss";`
        }
      }
    }
  },
  integrations: [tailwind()]
});