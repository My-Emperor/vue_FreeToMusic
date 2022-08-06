<template>
  <div class="login-page">
    <var-app-bar style="flex-shrink: 0" :title="navObj.navTitle" title-position="center"
                 color="#00c48f">
      <template #left>
        <var-button
            round
            text
            color="transparent"
            text-color="#fff"
            @click="navObj.goBack"
        >
          <var-icon name="chevron-left" :size="28"/>
        </var-button>
      </template>
    </var-app-bar>
    <img class="logo-image" src="../../assets/img/logo.png">
    <div class="login-tip">手机号码登录</div>
    <div class="form-box">
      <var-input
          style="margin-bottom: 20px"
          focus-color="#00C48F"
          blur-color="#ccc"
          clearable
          class="form-input"
          placeholder="请输入手机号码"
          :rules="[v => !!v || '手机号码不能为空']"
          v-model="form.iphone"
      >

      </var-input>

      <var-input
          v-if="form.type == 0"
          prepend-icon=""
          focus-color="#00C48F"
          clearable
          blur-color="#cccc"
          class="form-input"
          type="password"
          placeholder="请输入密码"
          :rules="[v => !!v || '密码不能为空']"
          v-model="form.password"
      />

      <div v-else class="input-code-box">
        <var-input
            style="width: 170px"
            prepend-icon=""
            focus-color="#00C48F"
            clearable
            blur-color="#cccc"
            class="form-input"
            type="password"
            placeholder="请输入验证码"
            :rules="[v => !!v || '验证码不能为空']"
            v-model="form.code"
        />
        <var-button class="send-code-button" size="small" color="#ccc" text-color="#fff" @click="form.sendCode" type="info" >
          获取验证码
        </var-button>
      </div>
    </div>

    <div class="change-type" @click="form.changeType(!form.type)">
      切换登录方式
    </div>

    <var-button
        style="width:100px;margin-top:20px"
        type="success"
        auto-loading
        @click="form.toLogin"
    >
      登录
    </var-button>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import { reactive} from "vue";
import {login, sendCode} from "@/api-modules/login"

export default {
  name: "iphone-login",
  setup() {
    const route = useRoute();
    const router = useRouter();

    let form = reactive({
      iphone:'',
      password:'',
      code:'',
      username:'',
      type:false,

      changeType(typeIndex){
        form.type = !form.type
      },
      sendCode(){
        sendCode(form.iphone).then(res =>{
          console.log(res)
        })
      },

      toLogin(){
        return login(form.iphone,form.password,form.code).then(res=>{
          console.log(res)
        })
      }
    })
    //navigator
    let navObj = reactive({
      navTitle: route.meta.title,
      goBack() {
        router.back();
      },
      searchButton() {
        router.push('/search');
        console.log(route.fullPath)
      }
    })
    return {
      navObj,
      form,
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 375px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-tip {
    padding: 10px;
    border-radius: 20px;
    width: 200px;
    display: flex;
    background-color: #00C48F;
    color: #fff;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

  }

  .logo-image {
    margin: 40px 0;
    width: 160px;
    height: 44px;
  }

  .form-box {
    width: 260px;
    //background-color: pink;
    .form-input {
      font-size: 14px;
    }
    .input-code-box{
      display: flex;
      align-items: center;
      .send-code-button{
        margin-left: 6px;
      }
    }

  }

  .change-type{
    margin-top: 50px;
    width: 260px;
    display: flex;
    justify-content: flex-start;
    font-size: 12px;
    color: #ccc;
  }

}

</style>