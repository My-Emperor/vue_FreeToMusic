<template>
  <!--推荐mv-->
  <div class="related">
    <h2><span class="iconfont icon-tuijian"></span>相关推荐</h2>
    <div class="list">
      <ul>
        <li @click="toDetail(item.id)" v-for="item in mvRecomList" :key="item.id">
          <div class="img">
            <img :src="item.cover+'?param=318y178'">
            <div  class="smokeIcon">
              <span class="iconfont icon-bofang"></span>
            </div>
          </div>
          <div class="info">
            <span><i class="iconfont icon-MV"></i>{{item.name}}</span>
            <p>By.{{item.artistName}}</p>
          </div>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Related",
    props: {
      mvRecomList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    methods:{
      toDetail(id){
        this.$emit("changeMvDetail",id);
      }
    }
  }
</script>

<style lang="less" scoped>
  .related {
    h2 {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      
      span {
        font-size: 20px;
        margin-right: 6px;
      }
    }
    
    .list {
      ul {
        li {
          margin: 14px 0;
          &:hover{
            cursor: pointer;
            .smokeIcon{
              display: block !important;
            }
          }
          .img {
            width: 100%;
            position: relative;
            img {
              width: 100%;
            }
            .smokeIcon{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-25px,-25px);
              display: none;
              span {
                font-size: 50px;
                color: white;
              }
            }
          }
          .info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            span{
              display: flex;
              align-items: center;
              i{
                font-size: 26px;
                color: red;
                margin-right: 6px;
              }
            }
            p{
              font-size: 12px;
              color: #c3c3c3;
            }
          }
        }
      }
    }
  }

</style>