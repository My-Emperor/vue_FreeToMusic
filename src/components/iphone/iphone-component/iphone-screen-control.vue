<template>
  <div class="screen-control-box">
    <div class="screen-control-top">
      <div @click="screenControlObj.hideScreen()" class="control-top-left"></div>
      <div></div>
      <div class="control-top-right"></div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import {reactive} from "vue";
export default {
  name: "iphone-screen-play",
  setup(props,context){
    let screenControlObj = reactive({

      hideScreen(){
        console.log(`12312312`)
        context.emit('hideScreen');
      }
    })

    return {
      screenControlObj
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-control-box{
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 100%;
  flex: 1;
  z-index: 10;
  border: 1px solid red;
  background-color: #1ea2c9;
  transition: all .4s;

  .screen-control-top{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 375px;
    height: 160px;
    background-color: pink;
    .control-top-left{
      width: 120px;
      height: 120px;
      background-color: #00c48f;
    }
    .control-top-right{
      width: 120px;
      height: 120px;
      background-color: #00c48f;
    }
  }

}
</style>