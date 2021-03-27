<template>
  <div class="recom-music">
    <h2 class="title"><i></i> 推荐歌曲</h2>
    <song-new @getMusic="getMusic" :musicList="musicList"></song-new>
  </div>
</template>

<script>
  import SongNew from "components/common/songNew/SongNew"
  
  export default {
    name: "RecomMusic",
    data() {
      return {}
    },
    components: {
      SongNew
    },
    props: {
      musicList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      getMusic(musicId) {
        this.$emit('getMusic', musicId)
      }
    },
    created: function () {
    
    }
  }
</script>

<style lang="less" scoped>
  .recom-music h2 {
    margin: 15px;
    
    i {
      margin-right: 5px;
      display: inline-block;
      width: 5px;
      height: 17px;
      background-color: rgb(84, 154, 171);
    }
  }
</style>