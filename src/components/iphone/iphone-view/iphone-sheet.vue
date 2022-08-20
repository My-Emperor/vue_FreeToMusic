<template>
  <div class="sheet-box flex1">
    <!--  两列布局 左侧选择 右侧歌单-->
    <div class="tab-left">
      <var-tabs
          class="tabs-example-vertical"
          layout-direction="vertical"
          active-color="#00C48F"
          v-model:active="currentActive"
      >
        <div v-for="(item1,index1) in sheetObj.catList.categories" :key="index1">
          <div class="tab-title">{{ item1 }}</div>
          <var-tab
              @click="sheetObj.changeCategoriesList(item2.name)"
              v-for="(item2,index2) in sheetObj.getCategoriesList(index1)"
              :key="index2"
              class="var-tab-item">
              {{ item2.name }}
          </var-tab>
        </div>

      </var-tabs>
    </div>
    <div @scroll="sheetObj.scrollEvent" class="scroll-right">
      <song-sheet-box class="sheet-item-box"
                      v-for="(item,index) in sheetObj.sheetList" :key="index"
                      :boxWidth="90"
                      :imgUrl="item.coverImgUrl"
                      :text="item.name">
      </song-sheet-box>
    </div>
  </div>
</template>
<script>

import {SheetApi} from "@/api-modules/sheet"
import {ref, reactive} from "vue"
import songSheetBox from "@/components/iphone/iphone-component/song-sheet-box";
const sheetApi = new SheetApi();
export default {
  name: "iphone-sheet",
  components: {
    songSheetBox
  },
  setup() {
    //加载flag
    let loading =  ref(false);
    //tab列表当前下标
    let currentActive = ref(0);
    //歌单对象
    let sheetObj = reactive({
      // hotList:[],
      //歌单列表
      sheetList: [],
      //分类列表
      catList: [],
      //是否更多flag
      more: true,
      params: {
        order: "hot",//接口默认
        cat: "华语",//指定默认:华语 接口默认:全部
        limit: 20,//限制条数
        offset: 20//偏移量
      },

      //过滤category
      getCategoriesList(catIndex) {
        let list = sheetObj.catList.sub.filter(item => {
          if (item.category == catIndex) {
            return item.name;
          }
        })
        return list;
      },

      //修改类型请求数据
      changeCategoriesList(name){
        sheetObj.params.cat = name;
        //初始化偏移量
        sheetObj.params.offset = 0;
        //重新请求数据
        getPlayList(sheetObj);
      },

      //上拉滚动监听
      scrollEvent(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
          if (!loading.value && sheetObj.more) {
            loading.value = true;
            // 触底
            sheetObj.params.offset += sheetObj.params.limit;
            getPlayList(sheetObj);
          }
        }
      },
    })

    //热门列表分类
    // function getHotList(){
    //   sheetApi.getHotList().then(res => {
    //     console.log(res)
    //   })
    // }

    //--------request API-------
    //获取对应列表
    function getPlayList(params){
      sheetApi.getPlayList(params.order, params.cat, params.limit, params.offset).then(res => {
        sheetObj.more = res.more;
        sheetObj.sheetList = sheetObj.params.offset == 0 ? res.playlists : [...sheetObj.sheetList, ...res.playlists];
        loading.value = false;
      })
    }

    //获取分类
    function getCatList(){
      sheetApi.getCatList().then(res => {
        sheetObj.catList = res;
      })
    }

    //调取API请求获取数据
    getCatList();

    getPlayList(sheetObj.params);

    return {
      sheetObj,
      currentActive
    }
  },
}
</script>

<style lang="scss" scoped>
.sheet-box {
  display: flex;
  height: 100%;
  width: 375px;
  flex: 1;

  .tab-left {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-right: 2px solid #ccc;

    .tabs-example-vertical {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;

      .tab-title {
        padding: 4px 0;
        font-size: 14px;
        background-color: #009d72;
        //background-image: linear-gradient(to right,#fff,#00C48F );
        color: #fff;
        text-align: center;
      }

      .var-tab-item {
        width: 100px;
        height: 50px;
        flex-shrink: 0;
      }
    }
  }

  .scroll-right {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1;
    height: 100%;
    overflow: scroll;
    .sheet-item-box{
      margin: 10px 20px;
      flex-shrink: 0;
    }
  }
}

</style>