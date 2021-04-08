<template>
  <div  class="list">
    <el-row :gutter="12">
      <el-col :span="12" v-for="(item,index) in musicList" :key="item.id">
        <el-card shadow="always" @click.native="getMusic(item.id)">
          <span class="index">{{index+1}}</span>
          <!--图片-->
          <div class="img">
            <el-image
              :src="item.al.picUrl + '?param=200y200'"
            ></el-image>
          </div >
          <!--歌曲名称-->
          <span class="musicName">{{item.name}}</span>
          <!--专辑名称-->
          <span class="albomName">
            《{{ item.al.name }}》
          </span>
          <!--歌手-->
          <span class="singerName">{{item.ar[0].name}}</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "SongNew",
    props: {
      musicList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods:{
      getMusic(musicId){
        this.$emit('getMusic',musicId);
      }
    }
  }

</script>

<style lang="less" scoped>
  
  // /deep/  深度选择器
  /deep/ .el-card__body{
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .list {
    .el-card {
      margin: 5px;
      &:hover{
        cursor: pointer;
      }
      span {
        display: flex;
        justify-content: center;
      }
      
      .index {
        width: 1px;
        margin-left: 20px;
      }
      
      .img {
        width: 65px;
        height: 65px;
        margin: 0px 25px;
        padding: 5px;
      }
      .musicName {
        display: block;
        font-size: 14px;
        flex: 1;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        text-align: center;
      }
      
      .albomName {
        display: block;
        margin-left: 10px;
        flex: 1.5;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-size: 14px;
        text-align: center;
      }
      
      .singerName {
        display: block;
        flex: 1;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-size: 14px;
        text-align: center;
        font-weight: 700;
      }
    }
  }

</style>