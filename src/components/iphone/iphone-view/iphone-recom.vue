<template>
  <div class="recom-box">
    <var-swipe v-if="data.bannerList.length > 0" class="swipe-example">
      <var-swipe-item v-for="(item,index) in data.bannerList" :key="index">
        <img class="swipe-example-image" :src="item.imageUrl">
      </var-swipe-item>
    </var-swipe>
    <module-box title="推荐歌单">
      <div class="recom-sheet">
        <div class="recom-sheet-scroll">
          <song-sheet-box v-for="(item,index) in data.songSheetList" :key="index"
                          class="sheet-box"
                          :imgUrl="item.picUrl"
                          :text="item.name">
          </song-sheet-box>
        </div>
      </div>
    </module-box>
    <module-box title="推荐歌曲">
      <div class="recom-music">
        <music-box v-for="(item,index) in data.musicList" :key="index"
                   :musicImageUrl="item.picUrl"
                   :title="item.name"
                   :singer="item.song.artists[0].name"></music-box>
      </div>
    </module-box>
    <module-box title="推荐歌手">
      <div class="recom-singer">
        <singer-box
            v-for="(item,index) in data.singerList" :key="index"
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
    let data = reactive({
      bannerList: [],
      songSheetList: [],
      musicList: [],
      singerList: []
    });

    //getData
    //首页banner
    // store.commit('updateLoadingFlag',true);
    recomApi.getBanner().then(res => {
      data.bannerList = res.banners;
    });
    //推荐歌单
    recomApi.getRecomSongList().then(res => {
      data.songSheetList = res.result;
    })
    //推荐歌曲
    recomApi.getRecomNewMusicList().then(res => {
      data.musicList = res.result;
    })
    //推荐歌手
    recomApi.getRecomSinger(1, 12).then(res => {
      data.singerList = res.artists;
    })

    return {
      data,
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