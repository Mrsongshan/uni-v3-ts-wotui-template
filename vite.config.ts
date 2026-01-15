/**
 * @Author: songshan
 * @Date: 2026-01-15 15:31:35
 * @LastEditTime: 2026-01-15 16:50:00
 * @Description: vite配置文件
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import Uni from '@uni-helper/plugin-uni'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    // https://uni-helper.js.org/vite-plugin-uni-components
    Components({
      dts: true,
      resolvers: [WotResolver()]
    }),
    // https://uni-helper.js.org/plugin-uni
    Uni(),
  ]
})


