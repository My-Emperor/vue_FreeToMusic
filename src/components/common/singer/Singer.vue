<template>
  <div class="singer">
    <ul class="singerList">
      <li @click="toSingerDetails(item.id)" class="singerItem" :style="{'flex':isIE?'0 0 11%':'0 0 14.2%'}" v-for="item in singerList" :key="item.id">
        <!--          <img :src="item.img1v1Url" alt="">-->
        <div class="img">
          <el-image
              style="width: 100px; height: 100px"
              :src="item.img1v1Url + '?param=150y150'"
          ></el-image>
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
  data(){
    return{
      isIE:false
    }
  },
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

  },
  mounted() {
    //判断是否是ie浏览器
    //主要解决ie浏览器宽度显示 调整flex-basis值
    //通过判断ie独有属性 window.activeXObject
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isIE = true;
    }
  }
}
</script>

<style lang="less" scoped>
.singerList {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

  .singerItem {
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