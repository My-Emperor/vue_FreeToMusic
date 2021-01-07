<template>
  <div class="singerList">
    <singer :singerList="singerList"></singer>
    <div class="page">
      <el-button type="info" @click="changePage('up')" plain :disabled="pageUp">上一页</el-button>
      <el-button type="info" @click="changePage('down')" plain :disabled="pageDown">下一页</el-button>
    </div>
  </div>
</template>

<script>
  import singer from "../singer/Singer"
  export default {
    name: "SingerList",
    components:{
      singer
    },
    props:{
      pageUp:{
        type:Boolean,
      },
      pageDown:{
        type:Boolean,
      },
      singerList:{
        type:Array,
        default(){
          return [];
        }
      },
    },
    methods:{
      changePage(type){
        //发送跳转页面事件
        this.$emit('changePage',type);
      }
    },

  }
</script>

<style lang="less" scoped>
.singerList{
  .page{
    display: flex;
    justify-content: center;
    .el-button{
      margin: 40px 100px;
    }
  }
}
</style>