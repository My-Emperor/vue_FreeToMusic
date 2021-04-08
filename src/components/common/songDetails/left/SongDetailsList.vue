<template>
  <div class="songDeteailsList">
    <el-card>
      <div class="top">
        <div class="img">
          <el-image
            :src="songDetails.detailsImg"
            fit="cover"
          ></el-image>
        </div>
        <div class="info">
          <h2 class="title">{{songDetails.detailsName}}</h2>
          <div class="author">
            <el-image :src="songDetails.authorImg + '?param=130y130' " fit="cover"></el-image>
            <span>{{songDetails.authorName}}</span>
          </div>
          <div class="tag" v-if="songDetails.detailsTag.length == 0?false:true">
            <span>标签:</span>
            <ul>
              <li v-for="(item,index) in songDetails.detailsTag" :key="index">
                <el-tag effect="plain" type="info" size="mini">{{item}}</el-tag>
              </li>
            </ul>
          </div>
          <div class="describe">
            <p ref="descRef"><span>描述:</span>{{songDetails.detailsInfo}}</p>
          </div>
          <span v-if="descHeight > 40" @click="showDescribe" class="showDescribe">
            <i v-if="isShowDescribe">收起...</i> <i v-else>全部...</i>
          </span>
        </div>
      </div>
      <transition name="el-fade-in-linear">
        <div class="describeInfo" v-show="isShowDescribe">
          <p>{{songDetails.detailsInfo}}</p>
        </div>
      </transition>
      
      <div class="list">
        <music-list @getMusic="getMusic" :musicList="songDetails.musicList"></music-list>
      </div>
    </el-card>
  </div>
</template>

<script>
  import MusicList from "components/common/musicList/MusicList"
  
  export default {
    name: "SongDetailsList",
    data() {
      return {
        isShowDescribe: false,
        descHeight: null,
      }
    },
    props: {
      songDetails: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    components: {
      MusicList,
    },
    methods: {
      showDescribe() {
        this.isShowDescribe = !this.isShowDescribe;
      },
      getMusic(id) {
        this.$emit("getMusic", id)
      }
    },
    updated() {
      const height = window.getComputedStyle(this.$refs.descRef).height; // 100px.style.offsetHeight;
      this.descHeight = height.split("px")[0] - 0;
    },
  }
</script>

<style lang="less" scoped>
  .songDeteailsList {
    .el-card {
      position: relative;
      border-radius: 10px;
    }
    
    .top {
      display: flex;
      padding-right: 35px;
      margin-bottom: 10px;
      
      .img {
        //规定文本中不进行换行
        flex: 0 0 18.5%;
        white-space: nowrap;
        width: 100%;
        height: 130px;
        background: url("~assets/img/coverall.png") -4px 650px;
        transition: all .4s;
        margin: 20px;
        
        &:hover {
          background: url("~assets/img/coverall.png") -0px 650px;
          transition: all .2s;
        }
        
        .el-image {
          width: 130px;
        }
      }
      
      .info {
        margin-top: 18px;
        
        h2 {
          margin-bottom: 10px;
        }
        
        .author {
          margin-bottom: 15px;
          margin-left: 5px;
          display: flex;
          align-items: center;
          justify-content: left;
          
          .el-image {
            width: 4%;
            border-radius: 50%;
          }
          
          span {
            margin-left: 8px;
          }
        }
        
        .tag {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          margin-bottom: 15px;
          font-size: 14px;
          
          span {
            font-size: 15px;
            font-weight: 700;
            margin-right: 5px;
          }
          
          ul {
            display: flex;
            align-items: center;
            
            li {
              margin-left: 2px;
              
              .el-tag {
                font-size: 12px;
                font-weight: 500;
              }
            }
          }
        }
        
        .describe {
          font-size: 14px;
          line-height: 18px;
          overflow: hidden;
          height: 35px;
          margin-bottom: 8px;
          text-overflow: ellipsis;
          
          p {
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            span {
              font-size: 15px;
              font-weight: 700;
              margin-right: 5px;
            }
          }
        }
        
        .showDescribe {
          font-size: 14px;
          color: #ca3636;
          margin: 5px;
          
          i {
            font-style: normal;
          }
          
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    
    .describeInfo {
      position: absolute;
      top: 130px;
      left: 265px;
      padding: 10px;
      font-size: 14px;
      line-height: 1.4;
      background-color: #fff;
      box-shadow: 0 0 10px #c3c3c3;
      z-index: 9;
      p{
        white-space: pre-wrap;
      }
    }
  }

</style>