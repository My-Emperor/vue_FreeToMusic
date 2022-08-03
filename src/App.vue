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



</style>
