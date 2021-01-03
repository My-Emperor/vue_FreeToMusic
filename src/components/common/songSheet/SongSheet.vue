<template>
  <div  class="list">
    <div
      class="item"
      :class="numClass"
      v-for="item of sheetList"
      :key="item.id"
      @click="toDetail(item)">
      <div class="item-box">
        <el-image
          :src="item.picUrl"
          :alt="item.copywriter"
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
      num: {
        type: Number,
        default: 8
      }
    },
    components: {},
    computed: {
      numClass() {
        return this.num == 2 ? 'two' : 'eight'
      }
    },
    watch: {},
    methods: {
      toDetail(item) {
        console.log(item)
        let query = {
          id: item.id
        }
        this.$router.push({
          name: 'playlistDetail',
          query
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
      padding: 0 14px 40px;
      flex: 0 0 13.5%;
      .item-box{
        //规定文本中不进行换行
        white-space: nowrap;
        width: 100%;
        height: 130px;
        background : url("../../../assets/img/coverall.png") -4px 650px;
        transition: all .4s;
        &:hover{
          background : url("../../../assets/img/coverall.png") -0px 650px;
          transition: all .2s;

        }
        .el-image {
          width: 130px;
        }
      }
    .item-title{
      margin: 6px 0 ;
      font-size: 14px;
      font-weight: 700;
    }
    }
  }
</style>
