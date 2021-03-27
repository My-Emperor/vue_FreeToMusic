<template>
  <!--收藏者列表-->
  <div class="songLike">
    <el-card>
      <div class="title">
        <span class="iconfont icon-shoucang2"></span><i>喜欢歌单的人</i>
      </div>
      <div class="section">
        <ul>
          <li v-for="item in likeList" :key="item.id">
            <img :src="item.avatarUrl + '?param=38y38'" :title="item.nickname">
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SongLike",
    props: {
      likeList: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .songLike {
    width: 380px;
    
    .el-card {
      border-radius: 10px;
      
      .title {
        margin-bottom: 5px;
        
        span {
          font-size: 18px;
        }
        
        i {
          margin-left: 10px;
          font-style: normal;
          font-size: 15px;
        }
      }
      
      .section {
        ul {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          
          li {
            margin: 5px;
            width: 38px;
            height: 38px;
            
            img {
              width: 100%;
              border-radius: 20%;
            }
          }
        }
      }
    }
  }
</style>