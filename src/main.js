// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入全局样式
import '@/assets/index.css'

// 导入elementui - js
import ElementUI from 'element-ui'
// 导入elementui - css
import 'element-ui/lib/theme-chalk/index.css'

import echarts from 'echarts'

Vue.use(ElementUI)
Vue.use(echarts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  // 注册 App 组件为当前实例的局部组件，然后，才可以在template中使用该组件
  components: { App },
  template: '<App/>'
})
