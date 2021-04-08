<template>
  <div class="playerBar">
    <el-card v-if="playerMusicId">
      <div class="content-width">
        <!--图片-->
        <!--<img :src="musicInfo.al.picUrl" alt="">-->
        <el-image
          :src="musicDetails.al.picUrl"
          fit="cover"
          lazy
        >
        </el-image>
        <!--
            歌曲名称
            歌手
        -->
        <div class="musicText">
          <h2 class="songName">{{ musicDetails.name }}</h2>
          <p class="singerName">
            <span v-for="(item,index) in musicDetails.ar" :key="index">
              <span v-if="index != 0"> / </span>{{item.name}}
            </span>
          </p>
        </div>
        <!--按钮-->
        <div>
          <span @click="changeMusic('up')" class="clickIcon iconfont icon-shangyiqu left"></span>
          <span v-if="isPlayer" @click="playOrStopMusic" class="clickIcon iconfont icon-icon_bofang stop"></span>
          <span v-else @click="playOrStopMusic" class="clickIcon iconfont icon-bofang player"></span>
          <span @click="changeMusic('down')" class="clickIcon iconfont icon-xiayiqu right"></span>
        </div>
        
        <!--进度条-->
        <!--        <div class="link">-->
        <!--          <span class="linkOut"></span>-->
        <!--          &lt;!&ndash;                @touchmove="touchMove"&ndash;&gt;-->
        <!--          <span ref="linkOutRef"-->
        <!--                :style="toTransFromWidth" class="linkIn"></span>-->
        <!--        </div>-->
        <div class="slider">
          <el-slider @change="moveTransFormWidth" :format-tooltip="formatTooltip" v-model="transFromWidth"></el-slider>
        </div>
        <div class="playerTime">
          <span>{{ playerNowTime }}  <span class="line"></span>  {{ playerAllTime }}</span>
        
        </div>
        <!--音量-->
        <div>
          <span class="clickIcon iconfont icon-yinliang yinliang">
          </span>
          <div class="volumeSlider">
            <el-slider @change="moveTransFormVolume" v-model="transFormVolume" :show-tooltip="false"></el-slider>
          </div>
          <!--播放模式-->
          <span @click="changePlayerMode(2)" v-if="playerMode == 1"
                class="clickIcon iconfont icon-suijibofang suiji"></span>
          <span @click="changePlayerMode(0)" v-else-if="playerMode == 2"
                class="clickIcon iconfont icon-danquxunhuan danqu"></span>
          <span @click="changePlayerMode(1)" v-else class="clickIcon iconfont icon-liebiaoxunhuan liebiao"></span>
          <!--播放列表-->
          <span @click="showMusicList" class="clickIcon iconfont icon-bofangduilie liebiao">
            <transition name="el-fade-in-linear">
              <div class="MusicListCard" v-if="musicListFlag">
                <el-card shadow="always">
                  <div class="musicList">
<!--                    <h2>播放列表</h2>-->
                    <div class="top">
                      <h2><i
                        class="iconfont icon-bofangduilie"></i>播放列表 <span>{{this.musicDetailsList.length}}</span> </h2>
                      <span @click="clearPlayerList">清空列表<i class="iconfont icon-qingkong"></i></span>
                    </div>
                    <div class="list">
                      <el-table
                        :data="musicDetailsList"
                        stripe
                        @row-click="playMusic"
                        style="width: 100%">
                        <el-table-column show-overflow-tooltip type="index">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip prop="name" label="歌曲">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手">
                          <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.ar" :key="index">
                              <span v-if="index != 0"> / </span>{{item.name}}
                            </span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-card>
              </div>
            </transition>
          </span>
        </div>
      </div>
      
      
      <!--播放详情弹窗-->
      <audio v-if="playMusicInfo"
             @timeupdate="updateTime"
             @ended="changeMusic('down')"
             :src="playMusicInfo.url" autoplay
             ref="audioRef"></audio>
    </el-card>
  </div>
</template>

<script>
  
  export default {
    name: "Player",
    data() {
      return {
        
        //播放歌曲详情
        musicInfo: {},
        //歌曲列表
        musicList: [],
        //进度条播放长度
        transFromWidth: 0,
        transFormVolume: 100,
        //歌曲播放总时间
        playerAllTime: '00:00',
        //歌曲播放当前时间
        playerNowTime: '00:00',
        //节流标记时间戳
        lastTime: null,
        //歌曲列表flag
        musicListFlag: false,
        //播放歌曲在列表中的下标
        playerIdIndex: null,
        
      }
    },
    methods: {
      //updateTime  201.024s
      updateTime() {
        if (this.clearListFlag == true) {
          return
        }
        // 使用节流可以减少拖拽bug的出现 但在特殊时间拖拽依然会发生冲突 在拖拽时会与updateTime发生冲突导致拖拽的val值为当前播放值
        // const nowTime = Date.now()
        // const gapTime = 1000;
        // if (!this.lastTime || nowTime - this.lastTime > gapTime) {
        //   if (this.$refs.audioRef) {
        //获取总时间长
        this.playerAllTime = this.$utils.formatSecondTime(this.$refs.audioRef.duration);
        //获取当前播放时间戳
        this.playerNowTime = this.$utils.formatSecondTime(this.$refs.audioRef.currentTime);
        this.transFromWidth = (this.$refs.audioRef.currentTime / this.$refs.audioRef.duration) * 100;
        // }
        // this.lastTime = nowTime
        // }
        
        // console.log(this.transFromWidth)
        // this.currentTime = e.target.currentTime
        // console.log(this.transFromWidth)
      },
      
      playOrStopMusic() {
        //true 播放  false 停止
        if (!this.musicDetails) {
          return
        }
        this.isPlayer ? this.$refs.audioRef.pause() : this.$refs.audioRef.play();
        this.$store.commit("setIsPlayer", !this.$refs.audioRef.paused)
        
      },
      
      //切换播放模式
      changePlayerMode(num) {
        this.$store.commit("changePlayerMode", num)
        // console.log(this.playerMode)
      },
      
      moveTransFormWidth(val) {
        //val 拖拽条进度
        // console.log(val)
        // if (!val && !this.musicDetails) return;
        this.transFromWidth = val;
        if (this.transFromWidth !== val) return;
        this.$refs.audioRef.currentTime = (this.transFromWidth / 100) * this.$refs.audioRef.duration;
        this.playerNowTime = this.$utils.formatSecondTime(this.$refs.audioRef.currentTime);
      },
      
      //拖拽条格式化进度信息格式化
      formatTooltip(val) {
        if (!val || !this.musicDetails || !this.$refs.audioRef) return;
        const time = (val / 100) * this.$refs.audioRef.duration;
        return this.$utils.formatSecondTime(time);
      },
      //音量拖拽条
      moveTransFormVolume(val) {
        this.transFormVolume = val;
        this.$refs.audioRef.volume = val / 100;
      },
      
      //点击列表按钮判断是否弹出
      showMusicList() {
        this.musicListFlag = !this.musicListFlag;
      },
      
      //播放列表点击播放
      playMusic(row) {
        // console.log(row)
        this.$emit("getMusic", row.id)
      },
      
      //上下切换歌曲
      changeMusic(type) {
        for (var i = 0; i < this.musicDetailsList.length; i++) {
          if (this.playerMusicId == this.musicDetailsList[i].id) {
            this.playerIdIndex = i;
            break;
          }
        }
        var index = 0;
        if (this.playerMode === 0) {
          //0 : 循环播放
          if (type == 'up') {
            if (this.playerIdIndex == 0) {
              return
            }
            index = this.playerIdIndex - 1;
          } else if (type == 'down') {
            index = this.playerIdIndex + 1;
            if (this.playerIdIndex == this.musicDetailsList.length - 1) {
              this.playerIdIndex = 0;
              index = this.playerIdIndex;
            }
          }
          var id = this.musicDetailsList[index].id
          this.$emit('getMusic', id)
          
        } else if (this.playerMode == 1) {
          //1: 随机播放
          this.playerIdIndex = this.$utils.getRadomIndex(0, this.musicDetailsList.length);
          this.$emit('getMusic', this.musicDetailsList[this.playerIdIndex].id)
          
        } else if (this.playerMode == 2) {
          //2: 循环播放
          this.$refs.audioRef.load();
        } else {
          // return this.$message.error("ERROR!");
        }
      },
      
      //清空播放列表
      clearPlayerList() {
        this.$refs.audioRef.pause();
        this.$store.commit('clearMusicDetailsList', []);
        this.$store.commit('setclearListFlag', true);
        this.$store.commit('setPlayerMusicId', null)
      },
      // touchMove(e){
      //   console.log(e.targetTouches[0].pageX)
      // },
      /**
       *
       */
      // //获取歌曲url
      // getMusicUrlRef(id) {
      //   getMusicUrl(id).then(res => {
      //     // console.log(res);
      //     this.playMusicInfo = res.data[0]
      //     console.log(this.playMusicInfo);
      //     // this.$refs.audioRef.load();
      //   })
      // },
      
    },
    activated() {
    },
    mounted() {
    },
    props: {
      //即将播放歌曲内容的信息
      playMusicInfo: {
        type: Object,
        default: null,
      }
    },
    computed: {
      //歌曲id
      playerMusicId() {
        return this.$store.getters.getPlayMusicId;
      },
      //播放列表
      musicDetailsList() {
        return this.$store.getters.getMusicDetailsList
      },
      //歌曲详情
      musicDetails() {
        // console.log(this.$store.getters.getMusicDetails)
        return this.$store.getters.getMusicDetails;
      },
      //播放模式
      playerMode() {
        return this.$store.state.playerMode;
      },
      //是否播放
      isPlayer() {
        // console.log(this.$store.state.isPlayer)
        return this.$store.state.isPlayer;
      },
      //清空列表状态
      clearListFlag() {
        return this.$store.state.clearListFlag;
      }
      // toTransFromWidth() {
      //   return `transform:translateX(${this.transFromWidth + 'px'})`
      // },
    },
    watch: {
      //播放歌曲id
      //playerMusiccId:function(){}简写
      playerMusicId() {
        //播放歌曲的id发生改变 则重置isPlayer
        if (this.clearListFlag == true) {
          //清空列表
          return
        }
        this.$store.commit("setIsPlayer", true);
        this.$emit("getMusicUrl", this.playerMusicId)
      },
      // 歌曲的详情
      musicDetails() {
        this.musicInfo = this.musicDetails;
        // console.log(this.musicInfo.al.picUrl);
      },
    }
  }
</script>

<style lang="less" scoped>
  .playerBar {
    position: fixed;
    bottom: 0;
    width: 100%;
    
    .el-card, .el-message {
      border-radius: 4px;
      overflow: visible;
    }
    
    .el-card {
      /deep/ .el-card__body {
        padding: 5px;
        display: flex;
        align-items: center;
        
        
        div {
          display: flex;
          align-items: center;
        }
        
        .playerTime {
          width: 100px;
          
          .line {
            display: inline-block;
            width: 2px;
            height: 11px;
            background-color: #c3c3c3;
          }
          
        }
        
        .musicText {
          display: block;
          text-align: center;
          width: 200px;
          margin-left: 5px;
          
          h2 {
            font-size: 18px;
            padding: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          p {
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        
        .slider {
          margin: 0 30px 0 55px;
          display: block;
          position: relative;
          width: 510px;
          height: 4px;
          
          .el-slider {
            width: 100%;
            height: 100%;
            
            .el-slider__runway {
              height: 4px;
              
              .el-slider__bar {
                height: 4px;
              }
              
              .el-slider__button-wrapper {
                width: 16px;
                top: -16px;
              }
              
              .el-slider__button {
                width: 12px;
                height: 12px;
                border: 2px solid rgb(86, 161, 179);;
              }
              
              .el-slider__bar {
                background-color: rgb(84, 154, 171);
              }
            }
            
          }
          
          /*&:hover {*/
          /*  cursor: pointer;*/
          /*}*/
          
          /*.linkOut {*/
          /*  display: block;*/
          /*  position: absolute;*/
          /*  width: 500px;*/
          /*  height: 2px;*/
          /*  background-color: #c3c3c3;*/
          /*}*/
          
          /*.linkIn {*/
          /*  position: absolute;*/
          /*  left: -500px;*/
          /*  !*pointer-events: none;*!*/
          /*  width: 500px;*/
          /*  height: 2px;*/
          /*  background-color: rgb(84, 154, 171);*/
          /*  */
          /*  &:after {*/
          /*    content: " ";*/
          /*    display: block;*/
          /*    position: relative;*/
          /*    top: -4px;*/
          /*    left: 500px;*/
          /*    !*pointer-events: auto;*!*/
          /*    width: 10px;*/
          /*    height: 10px;*/
          /*    border: 2px solid #666666;*/
          /*    border-radius: 50%;*/
          /*    background-color: #F7F7F7;*/
          /*  }*/
          /*}*/
        }
        
        .volumeSlider {
          float: left;
          width: 50px;
          height: 4px;
          
          .el-slider {
            width: 100%;
            height: 100%;
          }
          
          .el-slider__runway {
            height: 4px;
            margin-left: -10px;
            
            .el-slider__bar {
              height: 4px;
            }
            
            .el-slider__button-wrapper {
              width: 16px;
              top: -16px;
            }
            
            .el-slider__button {
              width: 12px;
              height: 12px;
              border: 2px solid rgb(86, 161, 179);;
            }
            
            .el-slider__bar {
              background-color: rgb(84, 154, 171);
            }
          }
        }
        
        
        .el-image {
          width: 4%;
          margin-left: 80px;
        }
        
        .clickIcon {
          &:hover {
            cursor: pointer;
          }
        }
        
        .stop,
        .player {
          font-size: 45px;
          margin: 0 10px;
        }
        
        .left,
        .right {
          font-size: 35px;
        }
        
        .yinliang,
        .suiji,
        .danqu,
        .liebiao {
          font-size: 20px;
          margin: 0px 20px;
        }
        
        .liebiao {
          position: relative;
          
          
          .MusicListCard {
            position: absolute;
            top: -491px;
            left: -175px;
            width: 350px;
            height: 470px;
            display: block;
            overflow: hidden;
            
            .el-card {
              width: 100%;
              height: 100%;
              display: block;
              overflow-y: scroll;
              cursor: default;
              
              .musicList {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                flex-wrap: wrap;
                width: 100%;
                height: 100%;
                
                .top {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  margin: 5px 0;
                  color: rgb(84, 154, 171);
                  
                  h2 {
                    margin-left: 7px;
                    font-size: 18px;
                    
                    i {
                      margin-right: 2px;
                      font-size: 16px;
                    }
                  }
                  
                  span {
                    margin-right: 7px;
                    font-size: 14px;
                    cursor: pointer;
                    
                    i {
                      font-size: 16px;
                    }
                  }
                }
                
                /*h2 {*/
                /*  font-size: 18px;*/
                /*}*/
                
                .list {
                  width: 100%;
                  height: 100%;
                  display: block;
                  
                  .el-table {
                    display: block !important;
                    text-align: center !important;
                    
                    tr {
                      cursor: pointer;
                    }
                  }
                  
                }
                
              }
            }
          }
          
          .el-card::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }


</style>