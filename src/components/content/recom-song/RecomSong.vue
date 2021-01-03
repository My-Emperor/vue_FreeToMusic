<template>
  <div class="recom-song">
    <h2 class="title"> <i></i> 推荐歌单</h2>
    <song-sheet :sheetList="songList"></song-sheet>
  </div>
</template>

<script>
  import SongSheet from "components/common/songSheet/SongSheet";
  
  export default {
    name: "RecomSong",
    data(){
      return {}
    },
    components:{
      SongSheet
    },
    props:{
      //查询推荐歌单
      songList:{
        type:Array,
        default(){
          return [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.recom-song h2{
  margin: 15px;

  i{
    margin-right: 5px;
    display: inline-block;
    width: 5px;
    height: 17px;
    background-color: rgb(84,154,171);
  }
}

</style>