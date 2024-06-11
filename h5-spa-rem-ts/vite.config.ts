import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
/**
 * 组件库按需引入插件
 * 说明: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// 支持自动引入API函数
import AutoImport from 'unplugin-auto-import/vite'
/**
 * 扩展setup插件，支持在script标签中使用name属性
 * 说明: <script setup name="MyComp"></script>
 */
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import WindiCSS from 'vite-plugin-windicss'

import postcssImport from 'postcss-pxtorem'
import { viteVConsole } from 'vite-plugin-vconsole'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      // 生成auto-import.d.ts声明文件
      dts: 'src/auto-imports.d.ts',
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      // 解决eslint报错
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    WindiCSS(),
    viteVConsole({
      entry: resolve(__dirname, 'src/main.ts'), // or you can use entry: [path.resolve('src/main.ts')]
      localEnabled: true,
      enabled: true,
      config: {
        maxLogNumber: 1000,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssImport({
          rootValue({ file }) {
            return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75
          },
          propList: ['*'],
        }),
      ],
    },
  },
  resolve: {
    // 查找别名
    alias: [{ find: '@', replacement: '/src' }],
    // 导入时想要省略的扩展名列表
    extensions: ['.js', '.vue', '.json', '.scss', '.ts', '*'],
  },
})
