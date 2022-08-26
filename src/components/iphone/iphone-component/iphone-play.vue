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
          <div class="audio-name">{{ musicInfo.name || '测试' }}</div>
          <div class="audio-author">{{ musicInfo.author ? musicInfo.author[0].name : '测试' }}</div>
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

    <!--列表弹窗-->
    <div ref="sheetBoxRef" class="pop-sheet-box">
      <div clss="flex1 flex-col ai-center">
        <div class="pop-status-box">
          <!--  播放状态 -->
          <div class="pop-play-status">
            <img v-if="playControl.sheetStatusList[playControl.sheetStatusIndex].index == 1" class="play-status-icon" src="../../../assets/img/play-audio/play-status-icon1.png" >
            <img v-else-if="playControl.sheetStatusList[playControl.sheetStatusIndex].index == 2" class="play-status-icon" src="../../../assets/img/play-audio/play-status-icon2.png" >
            <img v-else class="play-status-icon" src="../../../assets/img/play-audio/play-status-icon3.png" >
            {{playControl.sheetStatusList[playControl.sheetStatusIndex].label}}
          </div>
          <!-- ... -->
          <!--  清空列表按钮 -->
          <div class="pop-clear-button">
            <img class="pop-clear-icon" src="../../../assets/img/play-audio/sheet-clear-icon.png"> 清空列表
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
  setup(props, context) {
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
      sheetStatusList:[
        {
          label:"顺序播放",
          index:1,
        },
        {
          label:"随机播放",
          index:2,
        },
        {
          label:"单曲循环",
          index:3,
        },
      ],
      //歌单当前状态//默认顺序循环
      sheetStatusIndex:1,

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
        playControl.playStatusFlag = !playControl.playStatusFlag;
        if (playControl.playStatusFlag) {
          console.log('播放')
          console.log(audioRef.value.play())
          audioImgRef.value.style.animationName = "rotate-img"
          audioImgRef.value.style.animationPlayState = "running"
        } else {
          console.log('暂停')
          console.log(audioRef.value.pause())
          audioImgRef.value.style.animationPlayState = "paused"
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
          console.log("显示 ")
          screenControlRef.value.style.display = 'block';
          screenControlRef.value.style.animationName = 'show-screen-control';
        } else {
          console.log('隐藏')
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

    onMounted(() => {
      console.log("boxDom----:", boxRef.value)
      console.log("sheetDom----:", sheetBoxRef.value)
      console.log("audioImg----:", audioImgRef.value)
      console.log("audioRef----:", audioRef.value)
    })

    //计算属性
    let musicInfo = computed(() => {
      return store.state.music.musicInfo;
    })

    //监测的不是一个值，而是一个保存值的结构(不能写成sum.value) 不能监视一个具体的值注意
    watch(playControl, (nv, ov) => {
      console.log('监听成功')
      console.log(nv, ov)
    }, {
      immediate: true
    });

    watch(musicInfo, (nv, ov) => {
      playControl.playStatusFlag = false;
      playControl.changePlayStatue();
      console.log("musicId---------------- watch")
      console.log(nv)
      console.log(ov)
    }, {
      deep: true
    });


    return {
      playControl,
      musicInfo,
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
  background-color: #00c48f;
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
  position: absolute;
  bottom: -70px;
  right: 0;
  padding: 20px 10px 0;
  width: 375px;
  height: 360px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all .4s;
  z-index: 25;
  opacity: 0;
  animation: null .4s ease;
  animation-fill-mode: forwards;
  .pop-status-box{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .pop-play-status{
      display: flex;
      align-items: center;
      font-size: 16px;
      .play-status-icon{
        margin-right: 10px;
        width: 24px;
        height: 24px;
      }
    }
    .pop-clear-button{
      display: flex;
      align-items: center;
      font-size: 16px;
      .pop-clear-icon{
        margin-right: 10px;
        width: 24px;
        height: 24px;
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
  z-index: 20;
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