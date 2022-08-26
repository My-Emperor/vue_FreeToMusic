<template>
  <div class="singer-box">
    <div calss="singer-image-box">
      <var-image
          class="singer-image"
          lazy
          loading="https://xxx.xxx/loading.png"
          error="https://xxx.xxx/error.png"
          :src="singerImageUrl+'?param=300y300'"
      />
    </div>
    <div class="singer-name">{{ singerName }}</div>
    <div class="singer-nick">{{ singerNickName }}</div>
  </div>
</template>

<script>
export default {
  name: "singerBox",
  props: {
    singerImageUrl: {
      type: String,
      default: "",
      require: true,
    },
    singerName: {
      type: String,
      default: "",
      require: true,
    },
    singerNickName: {
      type: String,
      default: "",
      require: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;

  .singer-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 6px;

    .singer-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  .singer-name {
    width: 54px;
    text-align: center;
    margin-bottom: 4px;
    font-size: 14px;
    color: #8d8d8d;
    //超出一行省略
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }


  .singer-nick{
    width: 54px;
    text-align: center;
    font-size: 12px;
    color: #a8a8a8;
    //超出一行省略
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }

}
</style>