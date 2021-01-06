<template>
  <div class="footer">
    <div>
      <span>MUSIC FREE</span>
      <div class="footer_content">
        <a href="#"><span>网易云音乐:<i class="iconfont icon-wangyiyunyinle"></i></span></a>
        <a href="#"><span>github:<i class="iconfont icon-github"></i></span></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="less" scoped>
.footer{
  height: 180px;
  border-top: 1px solid #d3d3d3;
  background-color: #efefef;
}
.footer_content{
  .iconfont{
    font-size: 30px;
    &:hover{
      color: rgb(84,154,171);
    };
  }
}
</style>