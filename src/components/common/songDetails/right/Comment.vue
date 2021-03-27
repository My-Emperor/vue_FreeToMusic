<template>
<!--精彩评论-->
  <div class="comments">
    <el-card>
      <div class="title">
        <span class="iconfont icon-pinglun1"></span><i>热门评论</i>
      </div>
      <div class="section">
        <ul>
          <li v-for="item in commList" :key="item.id">
            <div class="img">
              <img :src="item.user.avatarUrl + '?param=50y50'" >
            </div>
            <div class="info">
              <span class="username">
                {{item.user.nickname}}
              </span>
              <span class="cont">
                {{item.content}}
              </span>
            </div>
          </li>
        </ul>
      </div>
      
    </el-card>
  </div>
</template>

<script>

  export default {
    name: "Comment",
    data(){
      return {
      
      }
    },
    props:{
      commList:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    
  }
</script>

<style lang="less" scoped>
  .comments{
    width: 380px;
    .el-card{
      border-radius: 10px;
      .title{
        margin-bottom: 5px;
        span{
          font-size: 18px;
        }
        i{
          margin-left: 10px;
          font-style: normal;
          font-size: 15px;
        }
      }
      .section{
        ul{
          li{
            display: flex;
            flex-wrap: nowrap;
            margin: 16px 8px;
            .img{
              width: 50px;
          
              img{
                width: 100%;
                border-radius: 50%;
              }
            }
            .info{
              margin-left: 12px;
              width: 250px;
              span{
                display: block;
              }
              .username{
                font-weight: 700;
                font-size: 14px;
              }
              .cont{
                width: 100%;
                font-size: 13px;
                margin-top: 12px;
                background-color: #f7f7f7;
                line-height: 1.4;
                padding: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>