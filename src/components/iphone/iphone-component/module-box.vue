<template>
<!--模块-->
  <div class="module-box">
    <div class="module-title">
      {{ title }}
    </div>
    <div class="module-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "module-box",
  props:{
    title:{
      type:String,
      default:'标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.module-box{
  //使用padding避免margin塌陷
  padding: 14px 0 ;
  width: 100%;
  display: flex;
  flex-direction: column;
  .module-title{
    padding-left: 20px;
    margin-bottom: 8px;
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    &:after{
      position: absolute;
      content:" ";
      left: 10px;
      width: 4px;
      height: 22px;
      background-color: #00c48f;
      border-radius: 2px;
    }
  }
}
</style>