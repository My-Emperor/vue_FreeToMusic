<template>
  <div class="mv-box flex1">
    <!--<button @click="loginObj.toPage">登录</button>-->
    <div class="select-list-box">
      <!--地区-->
        <var-tabs
            :elevation="false"
            indicator-color="#00C48F"
            active-color="#00C48F"
            v-model:active="mvObj.areaIndex"
        >
          <var-tab v-for="(item,index) in mvObj.areaList" :key="index" @click="mvObj.changeVarTabs(item,'area')">{{item}}</var-tab>
        </var-tabs>
      <!--类型-->
        <var-tabs
            :elevation="false"
            indicator-color="#00C48F"
            active-color="#00C48F"
            v-model:active="mvObj.typeIndex"
        >
          <var-tab v-for="(item,index) in mvObj.typeList" :key="index" @click="mvObj.changeVarTabs(item,'type')">{{item}}</var-tab>
        </var-tabs>
      <!--排序-->
        <var-tabs
            :elevation="false"
            indicator-color="#00C48F"
            active-color="#00C48F"
            v-model:active="mvObj.orderIndex"
        >
          <var-tab v-for="(item,index) in mvObj.orderList" :key="index" @click="mvObj.changeVarTabs(item,'order')">{{item}}</var-tab>
        </var-tabs>
    </div>
    <div @scroll="mvObj.scrollEvent" class="mv-list">
        <div v-for="(item,index) in mvObj.mvList" :key="index" class="mv-item">
          <div class="mv-mask">
            <div class="mv-play-count">点击量：{{item.playCount}}</div>
            <img src="../../../assets/img/play-icon.png" class="mv-play-icon" />
          </div>
          <var-image
              class="mv-img"
              lazy
              loading="https://xxx.xxx/loading.png"
              error="https://xxx.xxx/error.png"
              radius="10px"
              :src="item.cover"
          />
          <div class="mv-info">
            <div class="mv-title">{{item.name}}</div>
            <div class="mv-author">{{item.artistName}}</div>
          </div>
        </div>

    </div>
  </div>

</template>

<script>
import {useRouter} from "vue-router"
import {tranNumber} from "@/utils/index"
import {ref,reactive} from "vue";
// apiModule
import {MvApi} from "@/api-modules/mv";
const mvApi = new MvApi();
export default {
  name: "iphone-mv",
  setup() {
    //加载flag
    let loading =  ref(false);
    let mvObj = reactive({

      //地区列表
      areaList: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      areaIndex: 0,
      //类型列表
      typeList: ['全部', '官方版', '原生', '现场版', '网易出品',""],
      typeIndex: 0,

      //排序列表
      orderList: ['上升最快', '最热', '最新'],
      orderIndex: 0,

      mvList:[],
      more:true,

      params: {
        area: "",//接口默认全部
        type: "",//接口默认全部
        order: "",//接口默认上升最快
        limit: 10,
        offset: 0,
      },

      changeVarTabs(name,type){
        //初始化偏移量
        mvObj.params.offset = 0;
        mvObj.params[type] = name;
        getMvList(mvObj.params);
      },

      //上拉滚动监听
      scrollEvent(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
          if (!loading.value && mvObj.more) {
            loading.value = true;
            // 触底
            mvObj.params.offset += mvObj.params.limit;
            getMvList(mvObj);
          }
        }
      },

    })




    //request Api
    //--------request API-------
    //获取排行
    function getMvList(params){
      mvApi.getMvList(params.area, params.type, params.order, params.limit, params.offset).then(res => {
        mvObj.more = res.hasMore;
        //过滤处理点击次数
        res.data = res.data.map(item => {
            item.playCount =  tranNumber(item.playCount,2);
            return item;
        })

        mvObj.mvList = mvObj.params.offset==0?res.data:[...mvObj.mvList,...res.data]
        loading.value = false;
        console.log(mvObj.mvList)
      })
    }
    getMvList(mvObj.params);
    console.log(tranNumber(17620845,2))
    // const router = useRouter();
    // let loginObj = reactive({
    //   toPage() {
    //     router.push('/login');
    //   }
    // })
    return {
       mvObj
    }
  }
}
</script>

<style lang="scss" scoped>
.mv-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  flex: 1;
  background-color:#f3f3f3;

  .select-list-box {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 16px #cdcaca;
  }

  .mv-list{
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    .mv-item{
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      margin-bottom: 20px;
      width: 340px;
      height: 240px;
      border-radius: 10px;
      background-color: #fff;

      .mv-mask{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 192px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.4);
        .mv-play-count{
          padding:4px;
          padding-right: 6px;
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          top: 0;
          border-top-right-radius: 10px;
          font-size: 12px;
          color: #fff;
        }
        .mv-play-icon{
          width: 60px;
          height: 60px;
        }
      }

      .mv-img{
        flex-shrink: 0;
        width: 100%;
        height: 192px;
      }
      .mv-info{
        padding-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .mv-title{
          margin: 6px 0 4px;
          font-size: 14px;
          color: #333;
        }
        .mv-author{
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }

}


</style>