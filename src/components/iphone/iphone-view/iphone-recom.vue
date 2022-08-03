<template>
<div class="recom-box">
  <var-swipe class="swipe-example" >
    <var-swipe-item>
      <img class="swipe-example-image" src="https://varlet-varletjs.vercel.app/cat.jpg">
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-example-image" src="https://varlet-varletjs.vercel.app/cat2.jpg">
    </var-swipe-item>
    <var-swipe-item>
      <img class="swipe-example-image" src="https://varlet-varletjs.vercel.app/cat3.jpg">
    </var-swipe-item>
  </var-swipe>
</div>
</template>

<script>
export default {
  name: "iphone-recom",
  setup(){

  }
}
</script>

<style lang="scss" scoped>
.recom-box{
  width: 100%;
  height: 100%;
  .swipe-example {
    height: 160px;
    .swipe-example-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }


}
</style>