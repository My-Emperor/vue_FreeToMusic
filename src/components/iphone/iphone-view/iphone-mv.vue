<template>
  <div class="flex1">
    <button @click="loginObj.toPage">登录</button>
  </div>

</template>

<script>
import {useRouter} from "vue-router"
import {reactive} from "vue";
export default {
  name: "iphone-mv",
  setup(){
    const router = useRouter();
    let loginObj = reactive({
      toPage(){
        router.push('/login');
      }
    })
    return {
      loginObj
    }
  }
}
</script>

<style scoped>

</style>