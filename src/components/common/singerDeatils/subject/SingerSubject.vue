<template>
  <!--主体-->
  <div class="subject">
    <el-card>
      <div class="tabs">
        <span @click="changeTabs('music')" :class="flag == 'music'? 'active':''">单曲</span>
        <span @click="changeTabs('song')" :class="flag == 'song'? 'active':''">专辑</span>
        <span @click="changeTabs('mv')" :class="flag == 'mv'? 'active':''">MV</span>
        <span @click="changeTabs('info')" :class="flag == 'info'? 'active':''">介绍</span>
      </div>
      <div class="cont">
        <div class="music" :style="{'display': flag == 'music'?'block':'none' }">
          <music-list @getMusic="getMusic" :musicList="hotSongsList"></music-list>
        </div>
        <div class="song" :style="{'display': flag == 'song'?'block':'none' }">
          <song-sheet :songType="'singer'" :styleAttr="styleAttr" :sheetList="songsList"></song-sheet>
          <div class="page">
            <el-button type="info" @click="changePage('up')" plain :disabled="pageUp">上一页</el-button>
            <el-button type="info" @click="changePage('down')" plain :disabled="pageDown">下一页</el-button>
          </div>
        </div>
        <div class="mv" :style="{'display': flag == 'mv'?'block':'none' }">
          <mv-list :mvType="'singer'" :mvList="mvList" :mvAttr="mvAttr"></mv-list>
        </div>
        <div v-if="singInfo" class="info" :style="{'display': flag == 'info'?'block':'none' }">
          <h2>歌手简介</h2>
          <p style="text-indent:20px">{{singInfo.briefDesc}}</p>
          <ul>
            <li v-for="(item,index) in singInfo.introduction" :key="index">
              <h2>{{item.ti}}</h2>
              <p>{{item.txt}}</p>
            </li>
          </ul>
        </div>
      </div>
    
    </el-card>
  </div>
</template>

<script>
  import MusicList from "../../musicList/MusicList";
  import SongSheet from "../../songSheet/SongSheet";
  import MvList from "../../mvList/MvList";
  
  export default {
    name: "SingerSubject",
    components: {
      MvList,
      MusicList,
      SongSheet
    },
    props: {
      hotSongsList: {
        type: Array,
        defualt() {
          return [];
        }
      },
      pageUp: {
        type: Boolean,
      },
      pageDown: {
        type: Boolean,
      },
      songsList: {
        type: Array,
        defualt() {
          return [];
        }
      },
      mvList: {
        type: Array,
        defualt() {
          return [];
        }
      },
      singInfo: {
        type: Object,
        defualt() {
          return null;
        }
      }
    },
    data() {
      return {
        flag: 'music',
        styleAttr: 'singer',
        mvAttr: 'singer'
      }
    },
    methods: {
      changeTabs(name) {
        this.flag = name;
      },
      //播放歌曲
      getMusic(id) {
        this.$emit("getMusic", id)
      },
      //page跳转页面
      changePage(type) {
        //发送跳转页面事件
        this.$emit('changePage', type);
      }
    }
  }
</script>

<style lang="less" scoped>
  .subject {
    .el-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      .el-card__body {
        width: 100%;
      }
      
      .tabs {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          margin: 0 40px;
          padding: 4px 20px;
          font-size: 18px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      
      .active {
        font-weight: 700;
        border-bottom: 2px solid #ca3636;
      }
      
      .cont {
        margin-top: 20px;
        width: 1000px;
        
        .song {
          .page {
            display: flex;
            justify-content: center;
            
            .el-button {
              margin: 10px 100px;
            }
          }
        }
        
        .info {
          h2 {
            font-size: 20px;
            margin-bottom: 5px;
          }
          
          p {
            white-space: pre-wrap;
            padding: 0 5px;
            font-size: 14px;
            line-height: 1.5;
            color: #727272;
          }
          
          ul {
            margin-top: 5px;
            
            li {
              margin-top: 15px;
            }
          }
        }
      }
    }
    
  }

</style>