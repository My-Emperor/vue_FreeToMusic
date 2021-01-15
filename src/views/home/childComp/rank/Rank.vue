<template>
  <div class="rank content-width">
    <cloud-music-list :cloudList="cloudList"></cloud-music-list>
    <media-music-list :mediaList="mediaList"></media-music-list>
  </div>
</template>

<script>
import CloudMusicList from "components/common/rankMusic/CloudMusicList";
import MediaMusicList from "components/common/rankMusic/MediaMusicList";

import {getTopList} from "network/home";

export default {
  name: "Rank",
  data(){
    return {
      cloudList:[],
      mediaList:[]
    }
  },
  components: {
    CloudMusicList,
    MediaMusicList,
  },
  methods: {
    getTopListRef() {
      getTopList().then(res => {
        const list = res.list;
        this.cloudList = list;
        this.mediaList = list.splice(4,res.list.length);
      })
    }
  },
  created() {
    //初始化榜单
    this.getTopListRef();
  }
}
</script>

<style scoped>
.rank {
  margin-top: 25px;
}
</style>