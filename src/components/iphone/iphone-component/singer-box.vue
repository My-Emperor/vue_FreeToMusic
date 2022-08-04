<template>
<div class="singer-box">
  <div calss="singer-image-box">
    <var-image
        class="singer-image"
        lazy
        loading="https://xxx.xxx/loading.png"
        error="https://xxx.xxx/error.png"
        :src="singerImageUrl"
    />
  </div>
  <div class="singer-name">{{singer}}</div>
</div>
</template>

<script>
export default {
  name: "singerBox",
  props:{
    singerImageUrl:{
      type:String,
      default:"",
      require:true,
    },
    singer:{
      type:String,
      default:"",
      require:true,
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 6px;
  .singer-image{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 6px;
    .singer-image{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .singer-name{
    font-size: 14px;
    color: #8d8d8d;
  }
}
</style>