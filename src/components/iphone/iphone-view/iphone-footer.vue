<template>
  <div class="footer-box">
    <div class="flex ai-center jc-sb">
      <div class="link-url">
        <div class="flex ai-center" style="margin-bottom: 10px">
          <img class="icon" src="../../../assets/img/github.png"/> Github
        </div>
        <div class="flex ai-center">
          <img class="icon" src="../../../assets/img/gitee.png"/> Gitee
        </div>
      </div>
      <img class="logo-image" src="../../../assets/img/logo.png">
    </div>

  </div>
</template>

<script>
export default {
  name: "iphone-footer"
}
</script>

<style lang="scss" scoped>
.footer-box {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  padding: 15px ;

  .link-url{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    color: #cecece;
    .icon{
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
  }
  .logo-image {
    width: 160px;
    height: 44px;
  }

}
</style>