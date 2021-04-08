<template>
  <div class="list">
    <div
      :style="[{'flex': styleAttr == 'singer'? isIE?'0 0 17%':'0 0 18.5%':isIE?'0 0 12%':'0 0 13.5%'}]"
      class="item"
      v-for="item of sheetList"
      :key="item.id"
      @click="toDetail(item)">
      <div class="item-box">
        <el-image
          :src="imageUrlAttr === 'home' ? item.picUrl + '?param=300y300' : item.coverImgUrl + '?param=300y300'"
        ></el-image>
      </div>
      <div class="item-title">
        {{item.name}}
        <span v-if="item.publishTime">{{item.publishTime|formatTime(that)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  // 歌单列表组件
  export default {
    data() {
      return {
        that: this,
        isIE: false
      }
    },
    props: {
      sheetList: {
        type: Array
      },
      //用于判断歌单是首页推荐歌单还是分类页面歌单
      imageUrlAttr: {
        type: String,
        default: "home",
      },
      styleAttr: {
        type: String,
        default: "default",
      },
      songType: {
        type: String,
        default: "default",
      },
    },
    methods: {
      toDetail(item) {
        // console.log(item)
        if (this.songType == 'default') {
          this.$router.push({
            path: '/songDetails',
            query: {
              id: item.id
            }
          })
        } else if (this.songType == 'singer') {
          this.$router.push({
            path: '/albumDetails',
            query: {
              id: item.id
            }
          })
        }
        
      }
    },
    filters: {
      formatTime(time, that) {
        const type = 'YYYY-MM-DD';
        return that.$utils.dateFormat(time, type);
      },
    },
    created() {
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
  .list {
    padding-left: 25px;
    display: flex;
    flex-wrap: wrap;
    
    .item {
      margin-left: 10px;
      padding: 0 12px 30px 5px;
      flex: 0 0 13.5%;
      justify-content: left;
      /*1 0 18.5%*/
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
          height: 130px;
        }
      }
      
      .item-title {
        display: flex;
        flex-direction: column;
        margin: 7px 0;
        font-size: 13px;
        font-weight: 700;
        line-height: 1.3;
        
        span {
          color: #7b7b7b;
          font-size: 14px;
          font-weight: 500;
        }
      }
      
    }
  }
</style>
