<template>
<!--歌单盒子-->
  <div class="song-sheet-box">
    <div class="song-sheet-bg">
      <var-image
          class="song-sheet-img"
          lazy
          loading="https://xxx.xxx/loading.png"
          error="https://xxx.xxx/error.png"
          :src="imgUrl"
      />
    </div>
    <div class="song-sheet-text">{{text}}</div>
  </div>
</template>

<script>

export default {
  name: "song-sheet-box",
  props:{
    text:{
      type:String,
      default:"",
      required:true
    },
    imgUrl:{
      type:String,
      default:"",
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
.song-sheet-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  .song-sheet-bg{
    margin-bottom: 4px;
    position: relative;
    width: 80px;
    height: 62px;
    //background: url("../../../assets/img/coverall.png") -21.3333333333333vw -16.5333333333333vw;
    .song-sheet-img{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: pink;
      width: 59px;
      height: 59px;
    }
  }
  .song-sheet-text{
    padding: 0 6px;
    width: 100%;
    font-size: 14px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
}
</style>