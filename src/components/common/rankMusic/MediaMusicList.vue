<template>
  <div class="mediaMusic">
    <h2 class="title"><i></i> 全球媒体榜</h2>
    <ul class="list">
      <li @click="toDetail(item.id)" class="item" v-for="item in mediaList" :key="item.id">
        <div class="img" >
          <el-image :src="item.coverImgUrl + '?param=300y300'"></el-image>
        </div>
        <div class="info">
          <span>{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MediaMusicList",
  props:{
    mediaList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    toDetail(id){
      this.$router.push({
        path: '/songDetails',
        query:{
          id:id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mediaMusic h2 {
  margin: 15px;

  i {
    margin-right: 5px;
    display: inline-block;
    width: 5px;
    height: 17px;
    background-color: rgb(84, 154, 171);
  }
}

.list{
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  .item{
    padding: 20px;
    flex: 0 0 11%;
    .img{
      cursor: pointer;
      .el-image{
        box-shadow: 0px 0px 12px #7b7b7b;
      }
      /deep/ .el-image__inner--center{
        -ms-transform: translate(0);
        transform: translate(0);
        position: static;
        top: 0;
        left: 0;
      }
    }
    .info{
      padding-top: 10px;
    }
  }
}
</style>