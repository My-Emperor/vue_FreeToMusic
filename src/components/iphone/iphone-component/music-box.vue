<template>
  <div class="music-box">
    <var-image
        class="music-image"
        lazy
        loading="https://xxx.xxx/loading.png"
        error="https://xxx.xxx/error.png"
        :src="musicImageUrl+'?param=50y50'"
        radius="4px"
    />
    <div class="flex-col ai-start jc-center">
      <div class="music-title">{{ title }}</div>
      <div class="music-singer">{{ singer }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "music-box",
  props: {
    musicImageUrl: {
      type: String,
      default: "",
      require: true,
    },
    title: {
      type: String,
      default: "标题",
      require: true,
    },
    singer: {
      type: String,
      default: "作者",
      require: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.music-box {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 6px 16px;
  border-radius: 8px;
  background-color: #fff;

  .music-image {
    margin-right: 16px;
    width: 50px;
    height: 50px;
    background-color: rgba(0,0,0,0.1);
    border-radius: 6px;
  }

  .music-title {
    width: 220px;
    margin-bottom: 12px;
    font-size: 16px;
    color: #333;
    //超出一行省略
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }

  .music-singer {
    padding-left: 2px;
    font-size: 12px;
    color: #8d8d8d;
  }
}

</style>