<template>
  <div class="songDetails content-width">
    <div class="left">
      <song-details-list @getMusic="getMusic" :songDetails="songDetails"></song-details-list>
    </div>
    <div class="right">
      <song-like :likeList="likeList"></song-like>
      <related @changeSongDetail="changeSongDetail" :recomList="recomList"></related>
      <comment :commList="commList"></comment>
    </div>
  </div>
</template>

<script>
  import SongDetailsList from "components/common/songDetails/left/SongDetailsList";
  import Comment from "components/common/songDetails/right/Comment";
  import Related from "components/common/songDetails/right/Related";
  import SongLike from "components/common/songDetails/right/SongLike";
  
  import {getSongDetailsList} from "network/home"
  import {getMusicList} from "network/home";
  import {getSongComm} from "network/home";
  import {getSongSub} from "network/home";
  import {getSongRecom} from "network/home";
  
  
  export default {
    name: "SongDetails",
    components: {
      SongDetailsList,
      Comment,
      Related,
      SongLike
    },
    data() {
      return {
        songDetails: {
          songId: null,
          detailsName: "",
          detailsImg: "",
          detailsInfo: "",
          detailsTag: [],
          authorName: "",
          authorImg: "",
          musicListId: [],
          musicList: []
        },
        //歌单评论查询参数
        commQueryInfo: {
          id: null,
          limit: 20,
          offset: 0,
        },
        likeQueryInfo:{
          id: null,
          limit: 28,
          offset: 0,
        },
        //歌单评论列表
        commList:[],
        //歌单收藏列表
        likeList:[],
        //歌单推荐列表
        recomList:[]
      }
    },
    methods: {
      //更换推荐歌单
      changeSongDetail(id){
        //发送网络请求获取歌单详情
        this.getSongDetailsListRef(id);
        this.commQueryInfo.id = id;
        //初始化歌单评论
        this.getSongCommRef(this.commQueryInfo);
  
        //初始化推荐歌单
        this.getSongRecomRef(id);
  
        this.likeQueryInfo.id = id;
        //初始化歌单收藏着列表
        this.getSongSubRef(this.likeQueryInfo);
      },
      
      //获取歌单详情
      getSongDetailsListRef(id) {
        getSongDetailsList(id).then(res => {
          // console.log(res)
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.songDetails.detailsName = res.playlist.name;
          this.songDetails.detailsImg = res.playlist.coverImgUrl;
          this.songDetails.detailsInfo = res.playlist.description;
          this.songDetails.detailsTag = res.playlist.tags;
          this.songDetails.playCount = res.playlist.playCount;
          this.songDetails.authorName = res.playlist.creator.nickname;
          this.songDetails.authorImg = res.playlist.creator.avatarUrl;
          this.songDetails.musicListId = res.playlist.trackIds;
          
          const str = [];
          res.playlist.trackIds.forEach(val => {
            str.push(val.id);
          })
          this.songDetails.musicListId = str.join(',');
          this.getMusicListRef(this.songDetails.musicListId);
          
        });
      },
      //获取歌单中歌曲列表
      getMusicListRef(ids) {
        getMusicList(ids).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.songDetails.musicList = res.songs;
  
        })
      },
      
      //获取歌单评论
      getSongCommRef(params) {
        getSongComm(params.id, params.limit, params.offset).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.commList = res.comments;
          // console.log(this.commList)
        })
      },
      //获取推荐歌单
      getSongRecomRef(id) {
        getSongRecom(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.recomList = res.playlists;
          // console.log(this.recomList)
        })
      },
      //获取歌单收藏者列表
      getSongSubRef(params) {
        getSongSub(params.id, params.limit, params.offset).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.likeList = res.subscribers;
          // console.log(this.likeList);
        })
      },
      
      //发送获取音乐播放请求
      getMusic(id) {
        this.$emit("getMusic", id)
      }
    },
    mounted() {
      const id = this.$route.query.id;
      //发送网络请求获取歌单详情
      this.getSongDetailsListRef(id);
  
      this.commQueryInfo.id = id;
      //初始化歌单评论
      this.getSongCommRef(this.commQueryInfo);
      
      //初始化推荐歌单
      this.getSongRecomRef(id);
      
      this.likeQueryInfo.id = id;
      //初始化歌单收藏着列表
      this.getSongSubRef(this.likeQueryInfo);
    },
    created() {
    
    }
  }
</script>

<style lang="less" scoped>
  .songDetails {
    margin-top: 25px;
    
    .left {
      width: 950px;
    }
  }

</style>