import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import unocss from "unocss/vite"

export default defineConfig({
  plugins: [solid(), unocss()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
