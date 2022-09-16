<template>
  <div ref="boxRef" :class="[hasTab?'bottom-tab-height':'bottom-height','iphone-play-box']">
    <div @click="screenControlObj.changeScreenShow" class="show-button">
      <img class="tip-show-icon" src="../../../assets/img/play-audio/tip-show-icon.png">
      <div class="tip-show-text">展开</div>
    </div>
    <div :style="{'opacity':playControl.showFlag?'1':'0'}" class="play-audio-box">
      <!--边框简要提示进度条-->
      <div class="flex ai-center">
        <img ref="audioImgRef" class="audio-img" :src="musicInfo.image + '?params=200y200'"/>
        <div class="audio-info">
          <div class="audio-name">{{ musicInfo.name || 'freetomusic' }}</div>
          <div class="audio-author">{{ musicInfo.author ? musicInfo.author[0].name : '' }}</div>
        </div>
      </div>

      <div class="audio-control">
        <!--  left-->
        <img class="play-control-icon" src="../../../assets/img/play-audio/last-icon.png" alt="">
        <!--  play/pause-->
        <img @click="playControl.changePlayStatue" class="play-control-icon" v-if="playControl.playStatusFlag"
             src="../../../assets/img/play-audio/pause-icon.png" alt="">
        <img @click="playControl.changePlayStatue" class="play-control-icon" v-else
             src="../../../assets/img/play-audio/play-icon.png" alt="">
        <!--  right-->
        <img class="play-control-icon" src="../../../assets/img/play-audio/next-icon.png" alt="">
      </div>
      <img @click="playControl.changeSheetShow" class="audio-sheet-icon"
           src="../../../assets/img/play-audio/sheet-icon.png" alt="">
    </div>


  </div>

  <!--列表弹窗-->
  <div ref="sheetBoxRef" class="pop-sheet-box">
    <div class="pop-sheet-content">
      <!--歌单状态-->
      <div class="pop-status-box">
        <!--  播放状态 -->
        <div class="pop-play-status">
          <img v-if="playControl.sheetStatusList[playControl.sheetStatusIndex].index == 1" class="play-status-icon"
               src="../../../assets/img/play-audio/play-status-icon1.png">
          <img v-else-if="playControl.sheetStatusList[playControl.sheetStatusIndex].index == 2" class="play-status-icon"
               src="../../../assets/img/play-audio/play-status-icon2.png">
          <img v-else class="play-status-icon" src="../../../assets/img/play-audio/play-status-icon3.png">
          {{ playControl.sheetStatusList[playControl.sheetStatusIndex].label }}
        </div>
        <!-- ... -->
        <!--  清空列表按钮 -->
        <div class="pop-clear-button">
          <img class="pop-clear-icon" src="../../../assets/img/play-audio/sheet-clear-icon.png"> 清空列表
        </div>
      </div>
      <!--歌单列表-->
      <div class="pop-sheet-list">
        <div class="sheet-list-title">
          歌曲列表（11）
        </div>
        <div class="sheet-list-scroll">
          <div
              v-for="(item,index) in musicSheet"
              :key="index"
              :class="['sheet-item',item.id == musicInfo.id?'sheet-active-bg':'']"
              @click="playControl.changeMusicInfo(item)"
          >
            <div class="sheet-item-num">
              <img v-if="item.id == musicInfo.id" class="sheet-playing-icon"
                   src="../../../assets/img/play-audio/playing.png">
              <span v-else> {{ index + 1 }} </span>
            </div>
            <var-image :src="item.image" class="sheet-item-img "></var-image>
            <div class="sheet-item-info">
              <div :class="['sheet-item-name',item.id == musicInfo.id?'sheet-active-name':'']">{{ item.name }}</div>
              <div :class="['sheet-item-author',item.id == musicInfo.id?'sheet-active-author':'']">
                {{ item.author[0].name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--弹窗列表mask-->
  <div @click="playControl.changeSheetShow" v-show="playControl.sheetShowFlag" class="pop-sheet-mask"></div>
  <!--全屏弹窗-->
  <div ref="screenControlRef" class="screen-control-box">
    <div class="screen-control-top">
      <div @click="screenControlObj.changeScreenShow" class="control-top-left"></div>
      <div></div>
      <div class="control-top-right"></div>
    </div>
    <div></div>
    <div></div>
  </div>

  <audio ref="audioRef" :src="musicInfo.url" autoplay></audio>
</template>

<script>
import {ref, reactive, onMounted, computed, watch} from "vue";
import {useStore} from "vuex";

export default {

  name: "iphone-play",
  //不声明自定义事件会警告
  emits: ["showScreen"],
  props: {
    hasTab: {
      type: Boolean,
      default: true,
      require: true,
    },
  },

  setup() {
    const store = useStore();
    //loading
    let loadingFlag = ref(false);
    //控件对象
    let playControl = reactive({
      //控制组件显示
      showFlag: true,
      //歌单列表弹窗
      sheetShowFlag: false,
      //播放状态
      playStatusFlag: false,
      //歌单状态
      sheetStatusList: [
        {
          label: "顺序播放",
          index: 1,
        },
        {
          label: "随机播放",
          index: 2,
        },
        {
          label: "单曲循环",
          index: 3,
        },
      ],
      //歌单当前状态//默认顺序循环
      sheetStatusIndex: 1,

      //歌单切换歌曲
      changeMusicInfo(item) {
        store.commit("music/setMusicInfo", item)
      },

      //切换歌单列表显隐
      changeSheetShow() {
        if (loadingFlag.value) {
          return;
        }
        loadingFlag.value = true;
        playControl.sheetShowFlag = !playControl.sheetShowFlag;
        //显示隐藏
        if (playControl.sheetShowFlag) {
          sheetBoxRef.value.style.display = 'block';
          sheetBoxRef.value.style.animationName = 'show-sheet';
        } else {
          sheetBoxRef.value.style.animationName = 'hide-sheet';
          setTimeout(() => {
            sheetBoxRef.value.style.display = 'none';
          }, 600)
        }
        setTimeout(() => {
          loadingFlag.value = false;
        }, 600)
      },

      //切换歌曲状态 播放/暂停
      changePlayStatue() {
        //判断是否有歌曲
        if (!musicInfo.value.id) {
          return;
        }

        //更改播放状态
        playControl.playStatusFlag = !playControl.playStatusFlag;
        if (playControl.playStatusFlag) {
          audioRef.value.play()
        } else {
          audioRef.value.pause();
        }

        //更改播放状态动画
        if (playControl.playStatusFlag) {
          audioImgRef.value.style.animationName = "rotate-img";
          audioImgRef.value.style.animationPlayState = "running";
        } else {
          audioImgRef.value.style.animationPlayState = "paused";
        }
      },
    })
    //全屏对象
    let screenControlObj = reactive({
      //显示隐藏flag
      showScreenFlag: false,
      //切换全屏组件显隐
      changeScreenShow() {
        if (loadingFlag.value) {
          return;
        }
        loadingFlag.value = true;
        screenControlObj.showScreenFlag = !screenControlObj.showScreenFlag;
        //显示隐藏
        if (screenControlObj.showScreenFlag) {
          screenControlRef.value.style.display = 'block';
          screenControlRef.value.style.animationName = 'show-screen-control';
        } else {
          screenControlRef.value.style.animationName = 'hide-screen-control';
          setTimeout(() => {
            screenControlRef.value.style.display = 'none';
          }, 800)
        }

        setTimeout(() => {
          loadingFlag.value = false;
        }, 1000)
      },
    })


    // ref引用对象
    let boxRef = ref();
    let sheetBoxRef = ref();
    let audioImgRef = ref();
    let screenControlRef = ref();
    let audioRef = ref();

    //计算属性
    let musicInfo = computed(() => {

      return store.state.music.musicInfo;
    })

    let musicSheet = computed(() => {
      return store.state.music.musicSheet
    })


    watch(musicInfo, (nv, ov) => {
      console.log("watch musicInfo nv:", nv)
      console.log("watch musicInfo ov:", ov)
      playControl.playStatusFlag = false;
      playControl.changePlayStatue();
    }, {
      deep: true
    });


    return {
      playControl,
      musicInfo,
      musicSheet,
      screenControlObj,
      boxRef,
      sheetBoxRef,
      audioImgRef,
      audioRef,
      screenControlRef,
    }
  }
}
</script>

<style>
/*歌单列表弹窗显示*/
@keyframes show-sheet {
  0% {
    transform: translateY(50%);
    opacity: 0;
  }

  70% {
    opacity: 1;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/*歌单列表弹窗隐藏*/
@keyframes hide-sheet {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  70% {
    opacity: 0;
  }

  100% {
    transform: translateY(50%);
    opacity: 0;
  }
}

/*全屏显示*/
@keyframes show-screen-control {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/*全屏隐藏*/
@keyframes hide-screen-control {
  0% {
    opacity: 1;
    transform: translateY(0);

  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

/*图片旋转*/
@keyframes rotate-img {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss" scoped>

$bg-color: #00C48F;

.iphone-play-box {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 375px;
  //height: 64px;
  //background-color: #fff;
  font-size: 30px;
  color: #333;
  transform: translateY(0);
  transition: all .4s;
  z-index: 25;
}

//varlet tabHeight  --bottom-navigation-height
.bottom-tab-height {
  //安全区域+tab栏
  bottom: calc(constant(safe-area-inset-bottom) + var(--bottom-navigation-height) + 12px);
  bottom: calc(env(safe-area-inset-bottom) + var(--bottom-navigation-height) + 12px);

  //animation: ;
  //动画部分
  //安全区域+tab高度 - 自身高度
}

.bottom-height {
  bottom: calc(constant(safe-area-inset-bottom) + 14px);
  bottom: calc(env(safe-area-inset-bottom) + 14px);
}

//show-button 展开按钮
.show-button {
  position: absolute;
  top: -26px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 26px;
  background-color: $bg-color;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: #f3f3f3;
  font-size: 14px;

  .tip-show-icon {
    margin-right: 4px;
    width: 20px;
    height: 20px;
  }

  //.tip-show-text{
  //vertical-align:middle;
  //}
}

//play-audio-box 音乐播放控件盒子
.play-audio-box {
  position: relative;
  width: 365px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 40px;
  background-color: #fff;
  transition: all .4s;
  box-shadow: 0px 0px 15px #c1c1c1;
  z-index: 20;

  .audio-img {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border-radius: 50%;
    background-color: pink;
    overflow: hidden;
    transform: rotate(0);
    animation: null 5s linear infinite;;
    //animation-name: rotate-img;
  }

  .audio-info {
    width: 100px;
    display: flex;
    flex-direction: column;
    color: #333;

    .audio-name {
      margin-bottom: 2px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .audio-author {
      font-size: 14px;
      color: #8a8a8a;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .audio-control {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .play-control-icon {
      width: 30px;
      height: 30px;
    }
  }

  .audio-sheet-icon {
    margin-left: 8px;
    width: 30px;
    height: 30px;
  }

}

//pop-sheett-box 歌单弹窗盒子
.pop-sheet-box {
  display: none;
  position: fixed;
  bottom: -4px;
  right: 0;
  padding: 20px 10px 0;
  width: 375px;
  height: 400px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all .4s;
  z-index: 30;
  opacity: 0;
  animation: null .4s ease;
  animation-fill-mode: forwards;

  .pop-sheet-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .pop-status-box {
      flex-shrink: 0;
      margin-bottom: 10px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .pop-play-status {
        display: flex;
        align-items: center;
        font-size: 16px;

        .play-status-icon {
          margin-right: 10px;
          width: 24px;
          height: 24px;
        }
      }

      .pop-clear-button {
        display: flex;
        align-items: center;
        font-size: 16px;

        .pop-clear-icon {
          margin-right: 10px;
          width: 22px;
          height: 22px;
        }
      }

    }

    .pop-sheet-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 340px;

      .sheet-list-title {
        padding: 6px 0;
        font-size: 16px;
        font-weight: 700;
      }

      .sheet-list-scroll {
        flex: 1;
        overflow-y: scroll;

        .sheet-item {
          margin: 4px 0;
          padding: 4px 2px;
          display: flex;
          align-items: center;

          .sheet-item-num {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            width: 20px;
            height: 20px;
            font-size: 20px;
            font-weight: 600;

            .sheet-playing-icon {
              width: 20px;
              height: 20px;
            }
          }

          .sheet-item-img {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            border-radius: 10px !important;
          }

          .sheet-item-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .sheet-item-name {
              width: 180px;
              margin-bottom: 6px;
              font-size: 16px;
              color: #333;
              font-weight: 700;
              //超出一行省略
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .sheet-item-author {
              font-size: 12px;
              color: #c6c6c6;
            }

            .sheet-active-name {
              color: $bg-color !important;
            }

            .sheet-active-author {
              color: rgba(0, 196, 143, 0.65) !important;
            }
          }


        }

        .sheet-active-bg {
          background-image: linear-gradient(to right, #fff, #00c48f21);
          //background-color: $bg-color;
          //00c48f21
        }
      }
    }
  }

}

//pop-sheet-mask 歌单弹窗外部幕布
.pop-sheet-mask {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 375px;
  background-color: rgba(0, 0, 0, .4);
  z-index: 25;
}

//screen-control-box 全屏弹窗盒子
.screen-control-box {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  width: 375px;
  height: 100%;
  flex: 1;
  z-index: 30;
  border: 1px solid red;
  background-color: #1ea2c9;
  transition: all .4s;
  animation: null .4s ease;
  animation-fill-mode: forwards;

  .screen-control-top {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 375px;
    height: 160px;
    background-color: pink;

    .control-top-left {
      width: 120px;
      height: 120px;
      background-color: #00c48f;
    }

    .control-top-right {
      width: 120px;
      height: 120px;
      background-color: #00c48f;
    }
  }

}


</style>