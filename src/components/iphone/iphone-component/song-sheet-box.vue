<template>
  <!--歌单盒子-->
  <div class="song-sheet-box" :style="{'width':boxWidth+'px'}">
    <var-image
        class="song-sheet-img"
        lazy
        loading="https://xxx.xxx/loading.png"
        error="https://xxx.xxx/error.png"
        radius="4px"
        :src="imgUrl+`?param=${5*boxWidth}y${5*boxWidth}`"
    />
    <div class="song-sheet-text">{{ text }}</div>
  </div>
</template>

<script>

export default {
  name: "song-sheet-box",
  props: {
    text: {
      type: String,
      default: "",
      required: true
    },
    imgUrl: {
      type: String,
      default: "",
      required: true
    },
    boxWidth:{
      type:Number,
      default:62,
    }
  }
}
</script>

<style lang="scss" scoped>
.song-sheet-box {
  display: flex;
  flex-direction: column;
  align-items: center;


  .song-sheet-img {
    margin-bottom: 6px;
    //position: absolute;
    //top: 50%;
    //transform: translateY(-50%);
    //background-color: rgba(0,0,0,0.1);
    flex-basis: content;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  .song-sheet-text {
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>