<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <!--顶部-->
        <free-header :index="index"></free-header>
      </el-header>
      <el-main>
          <router-view @getMusic="getMusic"/>
      </el-main>
      <el-footer>
        <!--尾部歌曲栏-->
        <free-footer></free-footer>
      </el-footer>
      <player @getMusic="getMusic" @getMusicUrl="getMusicUrlRef" :playMusicInfo="playMusicInfo"></player>
    </el-container>
  </div>
</template>

<script>
  import FreeHeader from 'components/common/header/Header';
  import FreeFooter from 'components/common/footer/Footer';
  import Player from "components/common/player/Player";
  
  import {getMusicUrl} from "network/home";
  import {getMusicList} from "network/home";
  
  export default {
    name: "Home",
    data() {
      return {
        playMusicInfo: null,
        index: '/recom',
      }
    },
    components: {
      FreeHeader,
      FreeFooter,
      Player
    },
    methods: {
      //获取歌曲url
      getMusicUrlRef(id) {
        getMusicUrl(id).then(res => {
          // if (res.code !== 200) return this.$message.error("歌曲数据获取失败");
          if (res.data[0].br == 0) {
            this.playMusicInfo = null;
            //无法播放 ,从歌单中删除
            this.$store.commit("removeMusicList",id)
            return this.$message.error("版权原因 歌曲无法播放");
  
          }
          this.playMusicInfo = res.data[0]
          // console.log(this.playMusicInfo)
          //
          
          // console.log(res)
          // this.$refs.audioRef.load();
        })
      },
      getMusic(musicId) {
        getMusicList(musicId).then(res => {
          // if (res.code !== 200) return this.$message.error("歌曲数据获取失败");
          if (this.$store.state.clearListFlag == true){
            //如果为清空列表状态 , 重新获取时设置为true以正常显示播放组件
            this.$store.commit('setclearListFlag', false);
          }
          // if (res.privileges[0].freeTrialPrivilege) return this.$message.error("歌曲版权限制,无法播放");
          // console.log(res)
          this.$store.commit("setPlayerMusicId", res.songs[0].id);
          this.$store.commit("setMusicDetailsList", res.songs[0])
          // console.log(this.$store.state.musicDetailsList)
        });
      },
    },
    watch: {
      // 监听路由变化
      $route(to) {
        if (to.path != '/rank' && to.path != '/song' && to.path != '/singer' && to.path != '/mv' && to.path != '/recom') {
          this.index = null;
        }
        this.index = to.path;
      }
    },
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
    position: relative;
    /*overflow-x: hidden;*/
  }
</style>