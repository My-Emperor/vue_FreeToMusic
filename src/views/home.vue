<template>
  <pc-home v-if="isPc"></pc-home>
  <iphone-home v-else></iphone-home>
</template>

<script>
//导入组件
import iphoneHome from "@/components/iphone/iphone-home";
import pcHome from "@/components/pc/pc-home"

import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "home",
  components: {
    iphoneHome,
    pcHome
  },
  setup() {
    //计算属性(简写，没有考虑计算属性被修改的情况)
    const store = useStore();
    const isPc = computed(() => {
      return store.state.isPc;
    })
    console.log(isPc)

    return {
      isPc
    }
  }
}
</script>

<style scoped>

</style>