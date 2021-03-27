<template>
  <div >
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in (bannerInfo)" :key="index">
        <h2 class="medium"><img :src="item.imageUrl"></h2>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "banner",
    props:{
      bannerInfo:{
        //类型为数组或对象时,需要return
        type:Array,
        default(){
          return [];
        },
      }
    }
  }
</script>

<style lang="less" scoped>
  
  .el-carousel__item h2 {
    color: #8db2cb;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  :nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>