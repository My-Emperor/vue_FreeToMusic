<template>
  <div class="singer">
    <ul class="singerList">
      <li @click="toSingerDetails(item.id)" class="singerItem" v-for="item in singerList" :key="item.id">
        <!--          <img :src="item.img1v1Url" alt="">-->
        <div class="img">
          <el-image
              style="width: 100px; height: 100px"
              :src="item.img1v1Url"
              fit="cover"></el-image>
        </div>
        <div class="info">
          <span>{{ item.name }}</span>
          <span class="musicSize">单曲:{{ item.musicSize }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Singer",
  props: {
    //推荐歌手列表
    singerList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    toSingerDetails(id){
      this.$router.push({
        path:'singerDetails',
        query:{
          id:id
        }
      })
    },

  }
}
</script>

<style lang="less" scoped>
.singerList {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

  .singerItem {
    flex: 0 0 13.5%;
    padding: 20px;
    cursor: pointer;

    .img{
      display: flex;
      justify-content: center;

      .el-image {
        display: flex;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0px 0px 12px #7b7b7b;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      .musicSize{
        padding-top: 4px;
        font-size: 14px;
        color: #ca3636;
      }
    }
  }
}
</style>