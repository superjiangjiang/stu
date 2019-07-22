// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 导入全局样式
import '@/assets/index.css'

// 导入elementui - js
import ElementUI from 'element-ui'
// 导入elementui - css
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.axios = axios

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 给config配置baseURL
    config.baseURL = 'http://47.103.10.32:8080/ambowEducation'
    // 给config设置headers
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)



axios.defaults.withCredentials = true
Vue.use(ElementUI)
import echarts from 'echarts'
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
