<template>
  <div class="list">
    <div
      class="item"
      v-for="item of sheetList"
      :key="item.id"
      @click="toDetail(item)">
      <div class="item-box">
        <el-image
          :src="imageUrlAttr === 'home' ? item.picUrl : item.coverImgUrl"
          fit="cover"
        ></el-image>
      </div>
      <div class="item-title">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  // 歌单列表组件
  export default {
    data() {
      return {}
    },
    props: {
      sheetList: {
        type: Array
      },
      //用于判断歌单是首页推荐歌单还是分类页面歌单
      imageUrlAttr: {
        type: String,
        default: "home",
      }
    },
    methods: {
      toDetail(item) {

        this.$router.push({
          path: '/songDetails',
          query:{
            id:item.id
          }
        })
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .list {
    padding-left: 25px;
    display: flex;
    flex-wrap: wrap;
    
    .item {
      margin-left: 10px;
      padding: 0 12px 30px;
      flex: 0 0 13.5%;
      cursor: pointer;
  
      .item-box {
        //规定文本中不进行换行
        white-space: nowrap;
        width: 100%;
        height: 130px;
        background: url("../../../assets/img/coverall.png") -4px 650px;
        transition: all .4s;
        
        &:hover {
          background: url("../../../assets/img/coverall.png") -0px 650px;
          transition: all .2s;
        }
        
        .el-image {
          width: 130px;
        }
      }
      
      .item-title {
        margin: 7px 0;
        font-size: 13px;
        font-weight: 700;
      }
    }
  }
</style>
