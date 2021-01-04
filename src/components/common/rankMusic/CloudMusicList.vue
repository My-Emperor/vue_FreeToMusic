<template>
  <div class="cloudMusic">
    <h2 class="title"><i></i> 云音乐特色榜</h2>
    <ul class="list">
      <li  class="item" v-for="item in cloudList" :key="item.id">
        <div class="img" @click="getSheetDetails(item.id)">
          <el-image :src="item.coverImgUrl"></el-image>
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
  name: "CloudMusicList",
  props:{
    cloudList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    getSheetDetails(sheetId){
      console.log(sheetId)
    }
  }
}
</script>

<style lang="less" scoped>
.cloudMusic h2 {
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
  justify-content:left;
  flex-wrap: wrap;
  .item{
    padding: 20px;
    flex: 0 0 11%;


    .info{
      padding-top: 10px;
    }
  }
}
</style>