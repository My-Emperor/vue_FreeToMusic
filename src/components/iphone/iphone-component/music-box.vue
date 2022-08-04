<template>
  <div class="music-box">
    <var-image
        class="music-image"
        lazy
        loading="https://xxx.xxx/loading.png"
        error="https://xxx.xxx/error.png"
        :src="musicImageUrl"
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
  padding: 12px;
  margin: 6px 16px;
  border-radius: 8px;
  background-color: #fff;

  .music-image {
    margin-right: 16px;
    width: 60px;
    height: 60px;
    background-color: pink;
    border-radius: 6px;
  }

  .music-title {
    margin-bottom: 12px;
    font-size: 18px;
    color: #333;
  }

  .music-singer {
    padding-left: 2px;
    font-size: 12px;
    color: #8d8d8d;
  }
}

</style>