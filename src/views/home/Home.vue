<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <!--顶部-->
        <free-header></free-header>
      </el-header>
      <el-main >
        <router-view/>
      </el-main>
      <el-footer>
        <!--尾部歌曲栏-->
        <free-footer></free-footer>
      </el-footer>
      <player></player>
    </el-container>
  </div>
</template>

<script>
  import FreeHeader from 'components/common/header/Header'
  import FreeFooter from 'components/common/footer/Footer'
  import Player from "components/common/player/Player";

  
  export default {
    name: "Home",
    components: {
      FreeHeader,
      FreeFooter,
      Player
    }
  }
</script>

<style lang="less" scoped>
  div .el-header {
    padding: 0;
    text-align: center;
  }

  div .el-footer {
    padding: 0;
  }
  
  .home {
    background-color: rgb(245, 245, 245);
    /*overflow-x: hidden;*/
  }
</style>