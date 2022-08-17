<template>
  <div class="recom-box">
    <var-swipe v-if="recomObj.bannerList.length > 0" class="swipe-example">
      <var-swipe-item v-for="(item,index) in recomObj.bannerList" :key="index">
        <img class="swipe-example-image" :src="item.imageUrl">
      </var-swipe-item>
    </var-swipe>
    <module-box title="推荐歌单">
      <div class="recom-sheet">
        <div class="recom-sheet-scroll">
          <song-sheet-box v-for="(item,index) in recomObj.songSheetList" :key="index"
                          class="sheet-box"
                          :imgUrl="item.picUrl"
                          :text="item.name">
          </song-sheet-box>
        </div>
      </div>
    </module-box>
    <module-box title="推荐歌曲">
      <div class="recom-music">
        <music-box v-for="(item,index) in recomObj.musicList" :key="index"
                   :musicImageUrl="item.picUrl"
                   :title="item.name"
                   :singer="item.song.artists[0].name"></music-box>
      </div>
    </module-box>
    <module-box title="推荐歌手">
      <div class="recom-singer">
        <singer-box
            v-for="(item,index) in recomObj.singerList" :key="index"
            :singerImageUrl="item.picUrl"
            :singerName="item.name"
            :singerNickName="item.alias[0]"
        ></singer-box>
      </div>
    </module-box>
  </div>
</template>

<script>

import moduleBox from '@/components/iphone/iphone-component/module-box'
import songSheetBox from '@/components/iphone/iphone-component/song-sheet-box'
import musicBox from '@/components/iphone/iphone-component/music-box'
import singerBox from '@/components/iphone/iphone-component/singer-box'
import {reactive} from "vue";
// apiModule
import {RecomApi} from "@/api-modules/recom";

const recomApi = new RecomApi();

export default {
  name: "iphone-recom",
  components: {
    moduleBox,
    songSheetBox,
    musicBox,
    singerBox
  },

  setup() {
    let recomObj = reactive({
      bannerList: [],
      songSheetList: [],
      musicList: [],
      singerList: []
    });

    //--------request API-------
    //getData
    //首页banner
    function getBanner() {
      recomApi.getBanner().then(res => {
        recomObj.bannerList = res.banners;
      });
    }

    //推荐歌单
    function getRecomSongList() {
      recomApi.getRecomSongList().then(res => {
        recomObj.songSheetList = res.result;
      })
    }

    //推荐歌曲
    function getRecomNewMusicList() {
      recomApi.getRecomNewMusicList().then(res => {
        recomObj.musicList = res.result;
      })
    }

    //推荐歌手
    function getRecomSinger(offset = 1, limit = 12) {
      recomApi.getRecomSinger(offset, limit).then(res => {
        recomObj.singerList = res.artists;
      })
    }


    //请求APi
    getBanner();
    getRecomSongList();
    getRecomNewMusicList();
    getRecomSinger();


    return {
      recomObj,
    }
  },

}
</script>

<style lang="scss" scoped>
.recom-box {
  flex: 1;
  width: 100%;
  background-color: #f3f3f3;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 375px;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .swipe-example {
    height: 160px;

    .swipe-example-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      background-color: pink;
    }
  }

  .recom-sheet {
    display: flex;
    padding: 0 20px 0 6px;
    width: 375px;
    overflow-x: scroll;

    .recom-sheet-scroll {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;
      width: 100%;

      .sheet-box {
        flex-shrink: 0;
        margin: 4px 8px;
      }
    }
  }

  .recom-music {
    display: flex;
    flex-direction: column;

    .recom-music-item {
      padding: 20px;
      background-color: pink;
    }
  }

  .recom-singer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 6px;
  }
}
</style>