import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// 引入css框架, 层属性 https://cn.windicss.org/integrations/vite.html#layers-ordering
import 'virtual:windi.css'
import 'virtual:windi-devtools'

/**
 * 引入函数组件的样式
 * 见:https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#4.-yin-ru-han-shu-zu-jian-de-yang-shi
 */
// import 'vant/es/toast/style'
// import 'vant/es/dialog/style'
// import 'vant/es/notify/style';
// import 'vant/es/image-preview/style';

import './styles/index.scss'

createApp(App).use(router).use(store).mount('#app')
