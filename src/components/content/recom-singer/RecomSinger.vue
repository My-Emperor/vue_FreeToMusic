<template>
  <div class="recom-singer">
    <h2 class="title"><i></i> 推荐歌手</h2>
    <singer :singerList="singerList"></singer>
  </div>
</template>

<script>
import Singer from "components/common/singer/Singer"
export default {
  name: "RecomSinger",

  components:{
    Singer,
  },
  props:{
    singerList:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recom-singer h2 {
  margin: 25px 15px;

  i {
    margin-right: 5px;
    display: inline-block;
    width: 5px;
    height: 17px;
    background-color: rgb(84, 154, 171);
  }
}

</style>