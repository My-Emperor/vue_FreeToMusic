<template>
  <div class="mvList">
    <ul class="list">
      <li @click="toDetils(item.id)" class="item" v-for="item in mvList" :key="item.id">
        <div class="img">
          <el-image
            :src="mvAttr == 'default'?item.cover:item.imgurl"
            fit="cover"
          ></el-image>
          <div class="smoke">
            <span>{{item.artistName}}</span>
            <div>
              <span class="playCount"><i>点击量:</i>{{item.playCount | tranNumber(that)}}</span>
              <span class="playTime">{{item.duration | formatTime(that)}}</span></div>
          </div>
          <div class="smokeIcon">
            <span class="iconfont icon-bofang"></span>
          </div>
        </div>
        <div class="info">
          <h2>
            {{item.name}}
          </h2>
        </div>
      </li>
    </ul>
    <div v-if="mvType == 'default'? true:false" class="page">
      <el-button type="info" @click="changePage('up')" plain :disabled="pageUp">上一页</el-button>
      <el-button type="info" @click="changePage('down')" plain :disabled="pageDown">下一页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MvList",
    data() {
      return {
        that: this,
      }
    },
    props: {
      pageUp: {
        type: Boolean,
      },
      pageDown: {
        type: Boolean,
      },
      mvList: {
        type: Array,
        default() {
          return [];
        }
      },
      mvAttr: {
        type: String,
        default: 'default'
      },
      mvType: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      changePage(type) {
        //发送页码跳转页面事件
        this.$emit('changePage', type);
        // console.log(this.utils)
      },
      
      //跳转至详情页
      toDetils(id) {
        this.$router.push({
          path: '/mvDetails',
          query: {
            id: id,
          }
        })
      },
      
    },
    filters: {
      formatTime(time, that) {
        return that.$utils.formatTime(time);
      },
      tranNumber(num, that) {
        return that.$utils.tranNumber(num, 0);
      }
    }
  }
</script>

<style lang="less" scoped>
  .mvList {
    margin: 20px 0px;
    
    .list {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      align-items: center;
      
      .item {
        flex: 0 0 23%;
        margin: 10px;
        overflow: hidden;
        
        &:hover {
          cursor: pointer;
          .smokeIcon {
            display: block !important;
          }
        }
        
        .img {
          position: relative;
          width: 100%;
          
          .el-image {
            width: 100%;
          }
          /deep/ .el-image__inner--center{
            -ms-transform: translate(0);
            transform: translate(0);
            position: static;
            top: 0;
            left: 0;
          }
          .smokeIcon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-25px, -25px);
            display: none;
            
            span {
              font-size: 50px;
              color: white;
            }
          }
          
          .smoke {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            bottom: 5px;
            width: 100%;
            padding-left: 5px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #e7e7e7;
            
            .playCount {
              font-size: 13px;
              
              i {
                margin-right: 1px;
                font-style: normal;
                font-size: 12px;
              }
            }
            
            .playTime {
              margin: 0 5px 0 10px;
            }
            
            span {
              font-size: 14px;
            }
          }
        }
        
        .info {
          box-sizing: border-box;
          
          h2 {
            font-weight: 500;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
          }
        }
      }
    }
    
    .page {
      display: flex;
      justify-content: center;
      
      .el-button {
        margin: 40px 100px;
      }
    }
  }
</style>