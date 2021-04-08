import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//导入element组件
import "./plugins/element.js";
//导入element-ui样式表
import "element-ui/lib/theme-chalk/index.css";
//导入全局样式表
import "./assets/css/base.css";
//导入字体图标样式表
import "./assets/fonts/iconfont.css";
//导入自定义工具类
import utils from "./utils/utils";

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;



// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
