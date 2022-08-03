<template>
  <router-view/>
</template>

<script>
//导入声明周期钩子
import { onMounted , nextTick } from "vue";
import { useStore } from "vuex"

export default {
  name:"APP",
  setup(){
    //在setup中就相当于beforeCreate()和created();
    onMounted(() => {
      const store = useStore();
      // //判断页面变化并响应式监听
      nextTick(()=>{
        store.commit("updateIsPc",window.innerWidth > 913)
        window.onresize = () => {
          store.commit("updateInnerWidth", window.innerWidth)
          store.commit("updateIsPc", window.innerWidth > 913)
        }
      })

    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
