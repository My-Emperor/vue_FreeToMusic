<template>
  <div ref="box" :class="[hasTab?'bottom-tab-height':'bottom-height','iphone-play-box']">
    <div @click="playControl.changeShow" class="show-button"></div>
    <div :style="{'opacity':playControl.showFlag?'1':'0'}" class="play-audio-box">
      <!--边框简要提示进度条-->
      <div class="flex ai-center">
        <img class="audio-img" src=""/>
        <div class="audio-info">
          <div class="audio-name">测试</div>
          <div class="audio-author">insaoi测试</div>
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
    </div>
  </div>

</template>

<script>
import {ref, reactive, onMounted} from "vue"


export default {
  name: "iphone-play",
  props: {
    hasTab: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  setup() {
    let loadingFlag = ref(false);
    let playControl = reactive({
      showFlag: true,
      changeShow() {
        if (loadingFlag.value){
          return;
        }
        loadingFlag.value = true;
        //切换
        playControl.showFlag = !playControl.showFlag;
        if (playControl.showFlag) {
          box.value.style.transform = "translateY(0)"
        } else {
          box.value.style.transform = "translateY(100%)"
        }
        setTimeout(() => {
          loadingFlag.value = false;
        }, 500)
      }
    })
    let box = ref();
    onMounted(() => {
      console.log("boxDom----:", box.value)
    })
    return {
      playControl,
      box
    }
  }
}
</script>

<style lang="scss" scoped>

.iphone-play-box {
  position: fixed;
  display: flex;
  width: 375px;
  //height: 64px;
  padding: 6px 0;
  background-color: #fff;
  font-size: 30px;
  color: #333;
  transform:translateY(0);
  transition: all .4s;
}

//varlet tabHeight  --bottom-navigation-height
.bottom-tab-height {
  //安全区域+tab栏
  bottom: calc(constant(safe-area-inset-bottom) + var(--bottom-navigation-height));
  bottom: calc(env(safe-area-inset-bottom) + var(--bottom-navigation-height));

  //animation: ;
  //动画部分
  //安全区域+tab高度 - 自身高度
}

.bottom-height {
  bottom: constant(safe-area-inset-bottom);
  bottom: env(safe-area-inset-bottom);
}


.show-button {
  position: absolute;
  top: -24px;
  right: 0;
  width: 120px;
  height: 20px;
  background-color: pink;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.show-ani {
  animation: ani-show .6s ease;
}

.hide-ani {
  animation: ani-hide .6s ease;
}

.play-audio-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  transition: all .4s;

  .audio-img {
    margin-right: 8px;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    background-color: pink;
  }

  .audio-info {
    width: 120px;
    display: flex;
    flex-direction: column;
    color: #333;

    .audio-name {
      margin-bottom: 2px;
      font-size: 16px;
    }

    .audio-author {
      font-size: 14px;
    }
  }

  .audio-control {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .play-control-icon {
      width: 36px;
      height: 36px;
    }
  }


}

</style>