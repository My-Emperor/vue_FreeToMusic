<template>
  <div ref="box" :class="[hasTab?'bottom-tab-height':'bottom-height','iphone-play-box']">
    <div @click="playControl.changeScreenShow" class="show-button">
      <img class="tip-show-icon" src="../../../assets/img/play-audio/tip-show-icon.png">
      <div class="tip-show-text">展开</div>
    </div>
    <div :style="{'opacity':playControl.showFlag?'1':'0'}" class="play-audio-box">
      <!--边框简要提示进度条-->
      <div class="flex ai-center">
        <img class="audio-img" :src="musicInfo.image"/>
        <div class="audio-info">
          <div class="audio-name">{{ musicInfo.name || '测试' }}</div>
          <div class="audio-author">{{ musicInfo.author ? musicInfo.author[0].name : '测试' }}</div>
        </div>
      </div>
      <div class="audio-control">
        <!--  left-->
        <img class="play-control-icon" src="../../../assets/img/play-audio/last-icon.png" alt="">
        <!--  play/pause-->
        <img class="play-control-icon" v-if="true" src="../../../assets/img/play-audio/pause-icon.png" alt="">
        <img class="play-control-icon" v-else src="../../../assets/img/play-audio/play-icon.png" alt="">
        <!--  right-->
        <img class="play-control-icon" src="../../../assets/img/play-audio/next-icon.png" alt="">
      </div>
      <img @click="playControl.changeSheetShow"   class="audio-sheet-icon" src="../../../assets/img/play-audio/sheet-icon.png" alt="">


    </div>
    <!--列表弹窗-->
    <div ref="sheetBox" class="pop-sheet-box"> </div>

    <!--&lt;!&ndash;全屏页面&ndash;&gt;-->
    <!--<div ref="screenBox" class="pop-screen-box"></div>-->
  </div>
</template>

<script>
import {ref, reactive, onMounted, computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "iphone-play",
  props: {
    hasTab: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  setup(props,context) {
    const store = useStore();
    console.log(store)
    let loadingFlag = ref(false);
    let playControl = reactive({
      showFlag: true,
      sheetShowFlag: false,
      changeSheetShow() {
        if (loadingFlag.value) {
          return;
        }
        loadingFlag.value = true;

        playControl.sheetShowFlag = !playControl.sheetShowFlag;

        //显示隐藏
        if (playControl.sheetShowFlag) {
          sheetBox.value.style.display = 'block';
          sheetBox.value.style.animationName = 'show-sheet';
        } else {
          sheetBox.value.style.animationName = 'hide-sheet';
          setTimeout(() => {
            sheetBox.value.style.display = 'none';
          }, 800)
        }

        setTimeout(() => {
          loadingFlag.value = false;
        }, 800)

      },

      changeScreenShow() {
        if (loadingFlag.value) {
          return;
        }
        loadingFlag.value = true;
        context.emit('showScreen');
        setTimeout(() => {
          loadingFlag.value = false;
        }, 500)
      }
    })

    let box = ref();
    let sheetBox = ref();

    onMounted(() => {
      console.log("boxDom----:", box.value)
      console.log("sheetDom----:", sheetBox.value)
    })

    //计算属性
    let musicInfo = computed(() => {
      //计算musicInfo是否修改
      return store.state.music.musicInfo;
    })
    return {
      playControl,
      musicInfo,
      box,
      sheetBox
    }
  }
}
</script>


<style>
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


.show-button {
  position: absolute;
  top: -26px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 26px;
  background-color: pink;
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

.show-ani {
  animation: ani-show .6s ease;
}

.hide-ani {
  animation: ani-hide .6s ease;
}

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
  z-index: 20;

  .audio-img {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border-radius: 50%;
    background-color: pink;
    overflow: hidden;
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

.pop-sheet-box {
  display: none;
  position: absolute;
  bottom: 66px;
  right: 5px;
  width: 280px;
  height: 400px;
  background-color: #ccc;
  border-radius: 20px;
  transition: all .4s;
  z-index: 10;
  opacity: 0;
  animation: null .4s ease;
  animation-fill-mode: forwards;
}

//.pop-screen-box{
//  position: fixed;
//  left: 0;
//  top: 0;
//  height: 100vh;
//  width: 375px;
//  background-color: pink;
//
//}

</style>