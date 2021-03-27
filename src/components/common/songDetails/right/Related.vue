<template>
  <!--推荐歌单-->
  <div class="related">
    <el-card>
      <div class="title">
        <span class="iconfont icon-tuijian"></span><i>推荐歌单</i>
      </div>
      <div class="section">
        <ul>
          <li @click="toDetail(item.id)" v-for="item in recomList" :key="item.id">
            <div class="img">
              <img :src="item.coverImgUrl + '?param=50y50'">
            </div>
            <div class="info">
              <span class="songName">{{item.name}}</span>
              <span class="nickName">{{item.creator.nickname}}</span>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "RelatedRecom",
    props: {
      recomList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods:{
      toDetail(id){
        this.$emit('changeSongDetail',id);
      }
    }
  }
</script>

<style lang="less" scoped>
  .related {
    width: 380px;
    margin: 10px 0;
    
    .el-card {
      border-radius: 10px;
      
      .title {
        margin-bottom: 5px;
        
        span {
          font-size: 20px;
        }
        
        i {
          margin-left: 8px;
          font-style: normal;
          font-size: 15px;
        }
      }
      
      .section {
        ul {
          li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin: 14px;
            &:hover{
              cursor: pointer;
            }
            .img {
              width: 50px;
              
              img {
                width: 100%;
                border-radius: 20%;
                
              }
            }
            
            .info {
              margin-left: 12px;
              width: 240px;
              
              span {
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              
              .songName {
                font-size: 15px;
                font-weight: 700;
              }
              
              .nickName {
                margin-top: 12px;
                font-size: 12px;
                color: #a5a5c1;
              }
            }
          }
        }
      }
    }
  }
</style>