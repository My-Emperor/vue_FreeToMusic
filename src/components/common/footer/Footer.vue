<template>
  <div class="footer">
    <div class="footer_content content-width">
      <span>MUSIC FREE</span>
      <div class="link">
        <a href="https://github.com/My-Emperor" target="_blank"><span><i class="iconfont icon-github"></i>Github</span></a>
        <a href="https://gitee.com/wm1045266943/vue_freetomusic" target="_blank"><span><i class="iconfont icon-gitee Gitee"></i>Gitee</span></a>
        <a href="https://music.163.com/" target="_blank"><span><i class="iconfont icon-wangyiyunyinle wyy"></i>网易云音乐</span></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="less" scoped>
  .footer {
    height: 180px;
    border-top: 1px solid #d3d3d3;
    background-color: #efefef;
    
    .footer_content {
      padding: 10px 100px;
      
      span {
        font-size: 18px;
        font-weight: 700;
        
      }
      
      .link {
        margin: 8px 0;
        font-size: 14px;
        color: #ca3636;
        
        a {
          display: block;
          margin: 10px 20px;
          
          &:hover {
            color: rgb(84, 154, 171);
          }
          
          span {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 16px;
            
            i {
              font-size: 25px;
              margin: 0 5px;
            }
            .wyy,
            .Gitee{
              margin: 0 4px;
              font-size: 28px;
            }
          }
        }
        
      }
      
    }
    
  }
</style>