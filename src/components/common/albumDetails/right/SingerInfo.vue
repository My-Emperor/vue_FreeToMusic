<template>
<!--歌手信息-->
  <div class="singerInfo" v-if="singerInfo">
    <el-card >
      <div  class="img">
        <el-image
          style="width: 150px; height: 150px"
          :src="singerInfo.picUrl"
          fit="cover"></el-image>
      </div>
      <div class="info">
        <h2>{{singerInfo.name}}</h2>
        <span v-if="singerInfo.alias.length">
          {{singerInfo.alias[0]}}
        </span>
      </div>
      <div class="renzheng">
        <div class="iconfont icon-renzheng">认证</div><span>原创歌手{{singerInfo.name}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: "SingerInfo",
    data(){
      return {
      
      }
    },
    props:{
      singerInfo:{
        type:Object,
        default(){
          return null;
        }
      }
    },
    
  }
</script>

<style lang="less" scoped>
  .singerInfo{
    width: 100%;
    
    .el-card{
      border-radius: 10px;
      display: flex;
      justify-content: center;
      .img{
        margin: 8px 0;
        display: flex;
        justify-content: center;
        .el-image{
          border-radius: 50%;
        }
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 8px;
        h2{
          font-size: 22px;
          margin-bottom: 4px;
        }
        span{
          font-size: 12px;
          color: #c3c3c3;
          
        }
      }
      .renzheng{
        margin-top: 4px;
        display: flex;
        flex-wrap: nowrap;
        div{
          text-align: center;
          line-height: 18px;
          color: #fff;
          font-size: 13px;
          width: 80px;
          height: 18px;
          background-color: #e22f2f;
          border-radius: 10px;
        }
        span{
          margin-left: 4px;
          font-size: 15px;
        }
      }
    }
  }
</style>