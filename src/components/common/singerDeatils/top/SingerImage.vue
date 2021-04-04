<template>
  <div class="image" v-if="singerInfo">
    <div class="img">
      <el-image
        style="width: 250px; height: 250px"
        :src="singerInfo.picUrl + '?param=250y250'"
        fit="cover"
      ></el-image>
    </div>
    <div class="info">
      <h2 class="name">{{singerInfo.name}}</h2> <span class="alias" v-if="singerInfo.alias.length">{{singerInfo.alias[0]}}</span>
      <div class="num">
        <div>
          <i class="iconfont icon-zhuanji1"></i><span>{{singerInfo.musicSize}}</span>
        </div>
        <div><i class="iconfont icon-zhuanji"></i><span>{{singerInfo.albumSize}}</span></div>
        <div><i class="iconfont icon-mv"></i><span>{{singerInfo.mvSize}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SingerImage",
    props: {
      singerInfo: {
        type: Object,
        default() {
          return null;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #dbdbdb;
    
    .img {
      .el-image {
        border-radius: 50%;
      }
    }
    
    .info {
      margin: 8px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .name {
        font-size: 22px;
      }
      
      .alias {
        font-size: 14px;
        color: #7b7b7b;
      }
      
      .num {
        display: flex;
        align-items: center;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 45px;
          i {
            font-size: 40px;
            width: 40px;
            height: 40px;
          }
          span{
            font-size: 14px;
          }
        }
        
        
      }
    }
  }

</style>