<template>
  <!--排行榜-->
  <div class="rank-box flex1">
    <module-box title="云音乐特色榜">
      <div class="rank-hot-list">
        <song-sheet-box v-for="(item,index) in rankObj.hotList" :key="index"
                        :boxWidth="70"
                        :imgUrl="item.coverImgUrl"
                        :text="item.name">
        </song-sheet-box>
      </div>
    </module-box>
    <module-box title="全球媒体榜">
      <div class="rank-all-list">
        <song-sheet-box v-for="(item,index) in rankObj.allList" :key="index"
                        class="rank-all-item"
                        :boxWidth="70"
                        :imgUrl="item.coverImgUrl"
                        :text="item.name">
        </song-sheet-box>
        <div class="empty-rank-item" v-for="(item,index) in 4 - (rankObj.allList.length % 4)" :key="index" >
        </div>
      </div>
    </module-box>
  </div>
</template>

<script>
import moduleBox from "../iphone-component/module-box"
import songSheetBox from "../iphone-component/song-sheet-box"
import {reactive} from "vue"

// apiModule
import {RankApi} from "@/api-modules/rank";
const rankApi = new RankApi();

export default {
  name: "iphone-rank",
  components: {
    moduleBox,
    songSheetBox
  },
  created() {},
  setup() {
    let rankObj = reactive({
      hotList: [],
      allList: [],
    });

    //--------request API-------
    //获取排行
    function getTopList(){
      rankApi.getTopList().then(res => {
        rankObj.hotList = res.list.splice(0, 4);
        rankObj.allList = res.list.splice(4, res.list.length)
      })
    }

    getTopList();

    return {
      rankObj
    }
  },

}
</script>

<style lang="scss" scoped>
.rank-box {
  display: flex;
  flex-direction: column;

  .rank-hot-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .rank-all-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;

    .rank-all-item {
      margin: 10px;
    }

    .empty-rank-item{
      margin: 10px;
      width: 62px;
    }
  }

}
</style>