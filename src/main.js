import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

console.log(store)
//导入全局样式表
import "./assets/css/base.css";
createApp(App).use(store).use(router).mount('#app')
