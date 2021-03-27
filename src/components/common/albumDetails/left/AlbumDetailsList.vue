<template>
  <div class="albumDeteailsList" v-if="album">
    <div class="top" v-if="album">
      <div class="img">
        <el-image
          :src="album.picUrl"
          fit="cover"
        ></el-image>
      </div>
      <div class="info">
        <h2 class="title">{{album.name}}</h2>
        <div class="author">
          <span>  </span>
        </div>
        <div class="describe">
          <p ref="descRef"><span>描述:</span>{{album.description}}</p>
        </div>
        <span v-if="descHeight > 40" @click="showDescribe" class="showDescribe">
            <i v-if="isShowDescribe">收起...</i> <i v-else>全部...</i>
        </span>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div class="describeInfo" v-show="isShowDescribe">
        <p>{{album.description}}</p>
      </div>
    </transition>
    
    <div class="list">
      <music-list @getMusic="getMusic" :musicList="albumMusic"></music-list>
    </div>
  </div>
</template>

<script>
  import MusicList from "components/common/musicList/MusicList"
  
  export default {
    name: "AlbumDetailsList",
    data() {
      return {
        isShowDescribe: false,
        descHeight: null,
      }
    },
    props: {
      album: {
        type: Object,
        default() {
          return null;
        }
      },
      albumMusic: {
        type: Array,
        default() {
          return [];
        }
      },
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
      //获取元素高度
      const height = window.getComputedStyle(this.$refs.descRef).height; // 100px.style.offsetHeight;
      this.descHeight = height.split("px")[0] - 0;
    },
  }
</script>

<style lang="less" scoped>
  .albumDeteailsList {
    margin-bottom: 20px;
    position: relative;
    border-radius: 10px;
    
    .top {
      display: flex;
      padding-right: 35px;
      margin-bottom: 10px;
      
      .img {
        //规定文本中不进行换行
        flex: 0 0 17.5%;
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
          margin: 15px 0 10px 0;
        }
        
        .author {
          margin-bottom: 15px;
        }
        
        .describe {
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 18px;
          overflow: hidden;
          height: 35px;
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
      width: 500px;
      height: 400px;
      line-height: 1.4;
      background-color: #fff;
      box-shadow: 0 0 10px #c3c3c3;
      z-index: 9;
      overflow-y: scroll;
      
      p {
        white-space: pre-wrap;
      }
    }
    
    //自定义滚动条的伪对象选择器::-webkit-scrollbar。 --谷歌
    .describeInfo::-webkit-scrollbar {
      display: none;
    }
  }

</style>