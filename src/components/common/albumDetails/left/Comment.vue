<template>
  <div class="comment">
    <div class="top">
      <span class="iconfont icon-pinglun4"></span>
      <h2>Comment <span>共{{total}}条评论</span></h2>
    </div>
    <div class="hotComm" v-if="hotCommList.length">
      <div class="title">
        <span class="iconfont icon-HOT"></span>
        <h2>热门评论</h2>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in hotCommList" :key="item.id">
            <div class="img">
              <img :src="item.user.avatarUrl">
            </div>
            <div class="info">
              <h2>{{item.user.nickname}}
                <div class="like"><span class="iconfont icon-dianzan"></span>
                  ({{item.likedCount}})
                  <i>-</i>{{item.time | timeFilter(that) }}
                </div>
              </h2>
              <div class="cont">
                {{item.content}}
                <div class="beReplied" v-if="item.beReplied.length">
                  <p v-for="item in item.beReplied" :key="item.beRepliedCommentId">
                    <span>@{{item.user.nickname}} </span>回复: {{item.content}}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="newComm" v-if="newCommList.length">
      <div class="title">
        <span class="iconfont icon-new"></span>
        <h2>最新评论</h2>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in newCommList" :key="item.id">
            <div class="img">
              <img :src="item.user.avatarUrl">
            </div>
            <div class="info">
              <h2>{{item.user.nickname}}
                <div class="like"><span class="iconfont icon-dianzan"></span>
                  ({{item.likedCount}})
                  <i>-</i>{{item.time | timeFilter(that) }}
                </div>
              </h2>
              <div class="cont">
                {{item.content}}
                <div class="beReplied" v-if="item.beReplied.length">
                  <p v-for="item in item.beReplied" :key="item.beRepliedCommentId">
                    <span>@{{item.user.nickname}} </span>回复: {{item.content}}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    data() {
      return {
        that: this,
      }
    },
    props: {
      hotCommList: {
        type: Array,
        default() {
          return [];
        }
      },
      newCommList: {
        type: Array,
        default() {
          return [];
        }
      },
      total:{
        type:Number,
        default:0,
      }
    },
    filters: {
      timeFilter(time, that) {
        return that.$utils.formatMsgTime(time);
      },
    }
  }
</script>

<style lang="less" scoped>
  .comment {
    margin-top: 30px;
    
    .top {
      padding-left: 8px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      border-bottom: 1px solid #d9d9d9;
      
      h2 {
        display: flex;
        align-items: center;
        font-size: 18px;
        margin-left: 8px;
        font-weight: 500;
        span{
          margin-left: 10px;
          font-size: 14px;
          color: #c3c3c3;
        }
      }
      
      span {
        font-size: 30px;
      }
    }
    
    .hotComm {
      margin-top: 12px;
      
      .title {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-left: 10px;
        
        h2 {
          font-size: 16px;
          margin-left: 10px;
          font-weight: 500;
          color: #ca3636;
        }
        
        span {
          color: red;
          font-size: 15px;
        }
      }
      
      .list {
        margin-top: 18px;
        
        ul {
          li {
            display: flex;
            flex-wrap: nowrap;
            margin: 12px 8px 20px 8px;
            
            .img {
              width: 55px;
              
              img {
                width: 100%;
                border-radius: 50%;
                box-shadow: 0 0 12px #7b7b7b;
              }
            }
            
            .info {
              padding-left: 20px;
              width: 100%;
              
              h2 {
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                font-size: 15px;
                
                .like {
                  font-size: 12px;
                  font-weight: 500;
                  color: #7b7b7b;
                  
                  span {
                    margin: 0 1px;
                    font-size: 16px;
                  }
                  
                  i {
                    margin: 0 2px 0 8px;
                  }
                }
              }
              
              .cont {
                padding: 4px 8px;
                margin-top: 12px;
                font-size: 14px;
                background-color: #f7f7f7;
                line-height: 1.5;
                
                .beReplied {
                  background-color: #fff;
                  padding: 3px 12px;
                  margin: 0px 4px;
                  
                  p {
                    margin: 10px 0;
                    line-height: 1.4;
                    font-size: 12px;
                    
                    span {
                      color: #e22727;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    .newComm {
      .title {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-left: 10px;
        
        h2 {
          font-size: 16px;
          margin-left: 8px;
          font-weight: 500;
          color: #50ce50;
        }
        
        span {
          font-size: 28px;
          color: #50ce50;
        }
      }
      .list {
        margin-top: 18px;
    
        ul {
          li {
            display: flex;
            flex-wrap: nowrap;
            margin: 12px 8px 20px 8px;
        
            .img {
              width: 55px;
          
              img {
                width: 100%;
                border-radius: 50%;
                box-shadow: 0 0 12px #7b7b7b;
              }
            }
        
            .info {
              padding-left: 20px;
              width: 865px;
          
              h2 {
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                font-size: 15px;
            
                .like {
                  font-size: 12px;
                  font-weight: 500;
                  color: #7b7b7b;
              
                  span {
                    margin: 0 1px;
                    font-size: 16px;
                  }
              
                  i {
                    margin: 0 2px 0 8px;
                  }
                }
              }
          
              .cont {
                padding: 4px 8px;
                margin-top: 12px;
                font-size: 14px;
                background-color: #f7f7f7;
                line-height: 1.5;
            
                .beReplied {
                  background-color: #fff;
                  padding: 3px 12px;
                  margin: 0px 4px;
              
                  p {
                    margin: 10px 0;
                    line-height: 1.4;
                    font-size: 12px;
                
                    span {
                      color: #e22727;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>