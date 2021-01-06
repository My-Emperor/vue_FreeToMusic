<template>
  <div class="free_login">
    <div class="login_bg">
      <div class="login_box">
        <!--登录盒子卡片-->
        <el-card shadow="hover">
          <!--登录表单-->
          <div class="login_logo" @click="$router.push('/home')">
            <img src="~assets/img/logo.png" alt="logo">
          </div>
          <el-form
            ref="loginFormRef"
            class="login_form"
            label-width="0px"
            :rules="loginFormRules"
            :model="loginForm"
          >
            <!--手机号码-->
            <el-form-item prop="phone">
              <el-input
                prefix-icon="iconfont icon-yonghu"
                v-model="loginForm.phone"
              ></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password">
              <el-input
                prefix-icon="iconfont icon-mima1"
                type="password"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <!--按钮-->
            <el-form-item class="login_btns">
              <el-button type="primary" @click="login(loginForm.phone,loginForm.password)">Login</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginByPhone} from "network/login"
  
  export default {
    name: "Login",
    data() {
      //手机校验对象
      // var mobileRule = (rule, value, callback) => {
      //   // 验证手机的正则表达式
      //   const regmobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      //   if (regmobile.test(value)) {
      //     // 合法的邮箱
      //     return callback();
      //   }
      //   callback(new Error("请输入合法的手机"));
      // };
      
      return {
        //登录表单对象
        loginForm: {
          phone: null,
          password: null
        },
        //添加用户表单规则对象
        loginFormRules: {
          phone: [
            {required: true, message: "请输入网易云手机账号", trigger: "blur"},
            // { validator: mobileRule, trigger: "blur" }
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
          ],
        },
      }
    },
    methods: {
      
      //登录
      login(phone, password) {
        //表单预校验
        this.$refs.loginFormRef.validate(boolean => {
          if (!boolean) return;
          //校验通过 发起网络请求进行登录操作
          this.loginByPhoneRef(phone, password);
          
        });
        
      },
      
      /**
       * 网络请求相关方法
       */
      loginByPhoneRef(phone, password) {
        loginByPhone(phone, password).then(res => {
          if (res.code !== 200) return this.$message.error("用户名或密码错误!")
          this.$message.success("登录成功,欢迎" + res.profile.nickname + ",尽情享受音乐吧!")
          //将登录状态保存到vuex中
          this.$store.commit("setIsLogin",true)
          this.$router.push('/home');
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .free_login {
    height: 100%;
  }
  .login_box .el-card__body{
    display: none;
  }
  .login_bg {
    height: 100%;
    background: url("../../assets/img/loginbgc.jpg") no-repeat;
    background-size: 100% 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    .login_box {
      width: 350px;
      /*position: absolute;*/
      /*top: 50%;*/
      /*left: 50%;*/
      /*transform: translate(-50%,-50%);*/
      transition: all .4s;
      
      &:hover {
        box-shadow: 0 0 10px #c6c6c6;
        transform: translate3d(0, 0, 0) scale(1.01);
        transition: all .4s;
      }
      
      .el-card {
        background-color: rgba(#fff, .8);
        
        .login_logo {
          display: flex;
          justify-content: center;
          width: 300px;
          margin-bottom: 40px;
          cursor: pointer;
          
          img {
            width: 100%;
          }
        }
        
        .login_btns {
          display: flex;
          justify-content: center;
          
          .el-button {
            width: 150px;
            background-color: rgb(157, 166, 167);
            border: rgb(157, 166, 167);
          }
        }
      }
    }
  }
</style>