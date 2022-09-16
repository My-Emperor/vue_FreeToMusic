<template>
  <div class="footer-box">
    <div class="flex ai-center jc-sb">
      <div class="link-url">
        <div @click="gitObj.toLinkPage(0)" class="flex ai-center" style="margin-right: 12px">
          <img class="icon" src="../../../assets/img/github.png"/> Github
        </div>
        <div @click="gitObj.toLinkPage(1)" class="flex ai-center">
          <img class="icon" src="../../../assets/img/gitee.png"/> Gitee
        </div>
      </div>
      <img class="logo-image" src="../../../assets/img/logo.png">
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "iphone-footer",
  setup() {
    let gitObj = reactive({
      gitList: [
        "https://github.com/My-Emperor/vue_FreeToMusic",
        "https://gitee.com/wm1045266943/vue_freetomusic",
      ],
      toLinkPage(type) {
        window.location.href = gitObj.gitList[type]
      },
    })
    return {
      gitObj
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-box {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  padding: 10px 15px;
  height: 600px;

  .link-url {
    display: flex;
    font-size: 14px;
    color: #cecece;

    .icon {
      width: 28px;
      height: 28px;
      margin-right: 4px;
    }
  }

  .logo-image {
    width: 160px;
    height: 44px;
  }

}
</style>