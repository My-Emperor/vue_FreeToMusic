<template>
  <div  class="free_header">
    <div class="content-width header">
      <!--logo-->
      <div class="logo">
        <router-link :to="{ path: '/home' }"><img src="~assets/img/logo.png" alt="logo"></router-link>
      </div>
      <!--导航栏-->
      <el-menu active-text-color="rgb(84,154,171)" :default-active="activeIndex" mode="horizontal" class="el-menu-demo">
        <el-menu-item index="1" @click="toPage('/home')">发现音乐</el-menu-item>
        <el-menu-item index="2" @click="toPage('/rank')">排行榜</el-menu-item>
        <el-menu-item index="3" @click="toPage('/song')">歌单</el-menu-item>
        <el-menu-item index="4" @click="toPage('/singer')">歌手</el-menu-item>
        <el-menu-item index="5" @click="toPage('/mv')">MV</el-menu-item>
      </el-menu>
      <!--搜索框-->
      <div>
        <el-row :gutter="30">
          <el-col :span="25">
            <el-input
              placeholder="请输入内容"
              clearable
              v-model="inputValue"
              @keyup.enter.native="toSearch"
            >
              <el-button class="searchBtn"
                         size="mini"
                         slot="append"
                         icon="el-icon-search"
                         @click="toSearch"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <!--登录-->
      <el-button v-if="!this.$store.state.isLogin" @click="toPage('/login')" round icon="el-icon-user-solid">
        登录
      </el-button>
      <!--登录成功-->
      <div v-else class="person">
        <el-avatar :size="40" :src="circleUrl"></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            名字<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="personal" @click="toPage('/personal')">个人主页
            </el-dropdown-item>
            <el-dropdown-item icon="iconfont icon-xinxi" command="personal">个人消息</el-dropdown-item>
            <el-dropdown-item icon="iconfont icon-dengji" command="personal">个人等级</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting " command="personal">个人设置</el-dropdown-item>
            <el-dropdown-item icon="iconfont icon-zhuxiao1" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        //导航菜单默认选中项
        activeIndex: "1",
        //搜索框对象
        inputValue: "",
      }
    },
    methods: {
      //跳转页面
      toPage(path) {
        this.$router.push(path);
      },
      //搜索
      toSearch() {
        console.log(this.inputValue)
      },
      
    }
  }
</script>

<style lang="less" scoped>
  .free_header {
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    box-shadow: 0 5px 35px -1px rgba(2, 10, 38, .1);
    min-width: 1200px;
    margin: 0 auto;
    z-index: 9;
    background-color: #fff;
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .logo {
    width: 200px;
    
    img {
      width: 100%;
    }
  }
  
  div .el-menu {
    border-bottom: 0px;
    
    .el-menu-item {
      padding: 0 30px;
      font-weight: 700;
    }
  }
  
  .searchBtn {
    &:hover {
      color: #409EFF;
    }
  }
  
  //个人 下拉菜单
  .person {
    width: 125px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    .el-dropdown-link {
      cursor: pointer;
    }
    
    .el-icon-arrow-down {
      font-size: 12px;
      background-color: #fff;
    }
  }


</style>