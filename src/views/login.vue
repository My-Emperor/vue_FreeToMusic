<template>
  <pc-login v-if="isPc"></pc-login>
  <iphone-login v-else></iphone-login>
</template>

<script>
//导入组件
import iphoneLogin from "@/components/iphone/iphone-login";
import pcLogin from "@/components/pc/pc-login"
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  components: {
    iphoneLogin,
    pcLogin
  },
  setup() {
    //计算属性(简写，没有考虑计算属性被修改的情况)
    const store = useStore();
    let isPc = computed(() => {
      return store.state.isPc;
    })
    return {
      isPc
    }
  }
}
</script>

<style scoped>

</style>