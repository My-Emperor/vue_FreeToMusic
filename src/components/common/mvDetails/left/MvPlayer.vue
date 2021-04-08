<template>
  <div class="mvPlayer">
    <video class="video" :src="mvUrl" controls  autoplay></video>
    <div v-if="mvDetails" class="mvInfo">
      <div class="title">
        <span class="iconfont icon-MV"></span>
        <h2>{{mvDetails.name}}</h2>
      </div>
      <div class="countTime">
        <span>发布时间: {{mvDetails.publishTime}}</span>
        <span>播放次数: {{mvDetails.playCount | countFilter(this)}}</span>
      </div>
      <div v-if="mvDetails.videoGroup.length==0?false:true" class="tag">
        <span v-for="item in mvDetails.videoGroup" :key="item.id">
          #{{item.name}}
        </span>
      </div>
      <p class="desc">{{mvDetails.desc}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MvPlayer",
    data() {
      return {
        that: this,
      }
    },
    props: {
      mvUrl: {
        type: String,
        default: '',
      },
      mvDetails: {
        type: Object,
        default() {
          return null
        },
      },
    },
    methods: {},
    filters: {
      //次数过滤
      countFilter(num, that) {
        return that.$utils.tranNumber(num, 0);
      },
      
      //时间戳过滤
      formatTimeFilter(time,that){
        return that.$utils.formatMsgTime(time);
      }
    }
  }
</script>

<style lang="less" scoped>
  .mvPlayer {
    .video {
      width: 938px;
      height: 528px;
      /*object-fit: contain;*/
      &:focus {
        outline:none;
      }
    }
    .mvInfo {
      margin-top: 14px;
      
      .title {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        
        span {
          font-size: 20px;
          color: red;
          margin: 0 4px;
        }
        
        h2 {
          font-size: 18px;
        }
      }
      
      .countTime {
        margin: 8px 0;
        
        span {
          margin: 0 12px;
          font-size: 12px;
          color: #c3c3c3;
        }
      }
      .desc{
        padding: 0 10px;
        font-size: 14px;
        line-height: 1.5;
      }
      .tag{
        margin: 10px 5px;
        font-size: 12px;
        span{
          color: #ca3636;
          margin: 0 6px;
        }
      }
    }
  }

</style>