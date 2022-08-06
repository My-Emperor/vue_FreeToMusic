<template>
  <div :class="[hasTab?'bottom-tab-height':'bottom-height','iphone-play-box']">

    <div class=""></div>
    音乐控制器
  </div>
</template>

<script>
export default {
  name: "iphone-play",
  props:{
    hasTab: {
      type:Boolean,
      default: true,
      require: true,
    },

  },
  setup(){
    return{}
  }
}
</script>

<style lang="scss" scoped>
.iphone-play-box{
  position: fixed;
  display: flex;
  width: 375px;
  height: 52px;
  background-color: rgba(0,0,0,0.2);
  font-size: 30px;
  color: #333;
  transition: all .3s;
}
//varlet tabHeight  --bottom-navigation-height
.bottom-tab-height{
  bottom: calc(constant(safe-area-inset-bottom) + var(--bottom-navigation-height));
  bottom: calc(env(safe-area-inset-bottom) + var(--bottom-navigation-height));
}
.bottom-height{
  bottom:constant(safe-area-inset-bottom);
  bottom:env(safe-area-inset-bottom);
}

</style>