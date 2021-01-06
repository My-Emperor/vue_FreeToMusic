<template>
  <div class="songList">
    <song-sheet :imageUrlAttr="'song'" :sheetList="sheetList"></song-sheet>
  </div>
</template>

<script>
  import SongSheet from "../songSheet/SongSheet";
  export default {
    name: "SongList",
    components:{
      SongSheet
    },
    props:{
      sheetList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>