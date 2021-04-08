<template>
  <div class="singerDetails content-width">
    <singer-image :singerInfo="singerInfo"></singer-image>
    <singer-subject @getMusic="getMusic"
                    :hotSongsList="hotSongsList"
                    :songsList="songsList"
                    @changePage="changePage"
                    :pageDown="pageDown"
                    :pageUp="pageUp"
                    :mvList="mvList"
                    :singInfo="singInfo">
      
    </singer-subject>
  </div>
</template>

<script>
  import SingerSubject from "components/common/singerDeatils/subject/SingerSubject";
  import SingerImage from "components/common/singerDeatils/top/SingerImage";
  
  import {getSingerMusic} from "network/home";
  import {getSingerSong} from "network/home";
  import {getSingerMv} from "network/home";
  import {getSingerInfo} from "network/home";
  
  export default {
    name: "SingerDetails",
    data() {
      return {
        singerId: null,
        singerInfo: null,
        //歌曲列表(未登录只能获取热门50首歌曲)
        hotSongsList: [],
        //专辑查询对象
        songQueryInfo: {
          id: null,
          limit: 30,
          offset: 0
        },
        //专辑列表
        songsList: [],
        //专辑页码查询
        SongsQueryInfo: {
          //每页展示条数
          pageSize: 30,
          //当前页码
          pageNum: 1,
        },
        mvList:[],
        singInfo:{},
      }
    },
    components: {
      SingerImage,
      SingerSubject
    },
    methods: {
      //播放歌曲
      getMusic(id) {
        this.$emit("getMusic", id)
      },
      //跳转页码事件
      changePage(type) {
        if (type == 'up') {
          this.songQueryInfo.offset -= 30;

          this.getSingerSongRef(this.songQueryInfo)
        } else if (type == 'down') {
          this.songQueryInfo.offset += 30;

          this.getSingerSongRef(this.songQueryInfo)
        } else {
          return
        }
      },
      
      //获取歌手歌曲列表
      getSingerMusicRef(id) {
        getSingerMusic(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.singerInfo = res.artist;
          this.hotSongsList = res.hotSongs;
        })
      },
      
      //获取歌手专辑列表
      getSingerSongRef(params) {
        getSingerSong(params.id, params.limit, params.offset).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.songsList = res.hotAlbums;
        })
      },
      
      //获取歌手MV
      getSingerMvRef(id){
        getSingerMv(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.mvList = res.mvs;
        })
      },
      
      //获取歌手介绍
      getSingerInfoRef(id){
        getSingerInfo(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.singInfo = res;
        })
      }
    },
    mounted() {
      const id = this.$route.query.id;
      this.singerId = id
      this.songQueryInfo.id = id
      //初始化歌手歌曲
      this.getSingerMusicRef(this.singerId)
      //初始化歌手专辑
      this.getSingerSongRef(this.songQueryInfo)
      //初始化歌手MV
      this.getSingerMvRef(this.singerId)
      //初始化歌手介绍
      this.getSingerInfoRef(this.singerId)
    },
    
    computed: {
      pageDown: function () {
        return this.songsList.length < 30 ? true : false;
      },
      pageUp: function () {
        return this.songQueryInfo.offset == 0 ? true : false;
      },
    },
  }
</script>

<style lang="less" scoped>
  .singerDetails {
    margin-top: 25px;
  }

</style>