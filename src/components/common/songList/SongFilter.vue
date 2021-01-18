<template>
  <div class="songFilter">
    <div class="selectFilter">
      <span @click="showSelectBox" class="select">{{currentTag}}
        <i class="icon iconfont icon-other_xialaliebiao"></i>
        <transition name="el-fade-in-linear">
          <div v-if="boxFlag" class="selectBox">
            <div v-for="(item1,index1) in catList.categories" :key="index1" class="item">
              <h2>
                <i v-if="index1 == 0" class="iconfont icon-yuyan1"></i>
                <i v-if="index1 == 1" class="iconfont icon-fengge"></i>
                <i v-if="index1 == 2" class="iconfont icon-changjing"></i>
                <i v-if="index1 == 3" class="iconfont icon-qingganyule"></i>
                <i v-if="index1 == 4" class="iconfont icon-zhuti"></i>
                {{item1}}
              </h2>
              <ul class="categoryList">
                  <li v-for="(item2,index2) in getFilterCatList(index1)" :key="index2">
                  <el-button :class="item2.name == currentTag?'category':''" @click="selectTag(item2.name)" size="mini"
                             round>{{item2.name}}</el-button>
                </li>
              </ul>
            </div>
        </div>
        </transition>
      </span>
      <ul>
        <li class="hot">热门标签:</li>
        <li @click="selectTag(item.name)" :class="['tag',item.name == currentTag?'active':'']" v-for="item in hotList"
            :key="item.id">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SongFilter",
    data() {
      return {
        //分类选择
        currentTag: "全部分类",
        //是否弹出分类框
        boxFlag: false,
      }
    },
    props: {
      catList: {},
      hotList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      //选择标签后
      selectTag(name) {
        //更改分类名
        this.currentTag = name;
        //选择标签后发送请求获取对应标签歌单
        //this.$emit
        this.$emit('getSongSheet', name);
      },
      //是否显示标签框
      showSelectBox() {
        this.boxFlag = !this.boxFlag;
      },
      
      //方法结合for循环进行过滤处理
      getFilterCatList(index) {
        // console.log(index)
        const list = this.catList.sub.filter(val => {
          if (val.category == index) {
            return val;
          }
        })
        // console.log(list)
        return list
      },
    },
    
  }
</script>

<style lang="less" scoped>
  .active {
    color: red;
  }
  
  .category {
    background-color: #ea482c;
    color: white;
  }
  
  .songFilter {
    margin: 20px 0px;
    
    .selectFilter {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 60px;
      background-color: #fff;
      
      .selectBox {
        padding: 20px 0px 0px 20px;
        width: 700px;
        height: 400px;
        position: absolute;
        top: 62px;
        left: 0px;
        z-index: 9;
        background-color: #fff;
        border-radius: 5%;
        border: 1px solid #f5f5f5;
        cursor: default;
        color: black;
        overflow-y: scroll;
        
        .item {
          h2 {
            i {
              font-size: 18px;
            }
          }
          
          .categoryList {
            li {
              margin: 10px;
              
              .el-button {
                &:hover {
                  background-color: #ea482c;
                  color: white;
                }
              }
            }
          }
        }
      }
      
      //自定义滚动条的伪对象选择器::-webkit-scrollbar。 --谷歌
      .selectBox::-webkit-scrollbar {
        display: none;
      }
      
      .select {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        width: 100px;
        height: 40px;
        background-color: #fa2800;
        color: #fff;
        font-size: 14px;
        border-radius: 5%;
        cursor: pointer;
        
        .icon {
          margin-left: 5px;
          font-size: 16px;
        }
      }
      
      ul {
        display: flex;
        justify-content: left;
        align-items: center;
        margin: 10px 0px 15px 10px;
        flex-wrap: wrap;
        
        li {
          margin-left: 40px;
          font-size: 14px;
          
        }
        
        .hot {
          margin-left: 25px;
        }
        
        .tag {
          cursor: pointer;
          
          &:hover {
            color: #a8a8a8;
          }
        }
      }
    }
  }


</style>