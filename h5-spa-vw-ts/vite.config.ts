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

import { viteVConsole } from 'vite-plugin-vconsole'
import postcsspxtoviewport from 'postcss-px-to-viewport'

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
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度 375、 750
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false, // 是否处理横屏情况
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
