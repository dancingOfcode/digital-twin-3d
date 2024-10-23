import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '10.43.130.108',
    port: 8080,
    open: true,
    cors: true, // 允许跨域。
    // 设置代理
    // proxy: {
    //   "/api": {
    //     target: "https://eis.byd.com/",
    //     changeOrigin: true, // 是否跨域
    //     secure: true, // 是否https接口
    //   },
    // },
  },
})
