<template>
  <!-- 歌单详情 -->
  <div class="song-sheet-box">
    <!--歌单信息-->
    <div class="sheet-info-box">
      <!--歌单图片-->
      <var-image class="sheet-image"
                 lazy
                 loading="https://xxx.xxx/loading.png"
                 error="https://xxx.xxx/error.png"
                 radius="8px"
                 :src="sheetObj.deatilsImg"></var-image>
      <!--歌单详情-->
      <div class="sheet-info">
        <!--名称-->
        <div class="sheet-info-title">{{ sheetObj.detailsName }}</div>
        <!--标签-->
        <div class="sheet-info-tags">
          <var-chip v-for="(item,index) in sheetObj.deatilsTag" :key="index" size="small" type="success"
                    class="tags-item">{{ item }}
          </var-chip>
        </div>
        <!--作者-->
        <div class="sheet-author">
          <var-image class="sheet-author-img"
                     lazy
                     loading="https://xxx.xxx/loading.png"
                     error="https://xxx.xxx/error.png"
                     radius="50%"
                     :src="sheetObj.authorImg"></var-image>
          <div class="sheet-author-name">{{ sheetObj.authorName }}</div>
        </div>
        <!--简介-->
        <div class="sheet-tip">
          {{ sheetObj.deatilsInfo }}
          <var-icon class="sheet-chevron-right" color="#79746EFF" name="chevron-right"/>
        </div>
      </div>
    </div>
    <!--歌单菜单-->
    <div class="sheet-menu">
      <!--播放/添加-->
      <div class="sheet-menu-item">
        <img class="menu-item-img" src="../../../assets/img/sheet/sheet-add.png">
        <!--<div class="menu-item-text">添加</div>-->
      </div>
      <!--推荐-->
      <div class="sheet-menu-item">
        <img class="menu-item-img" src="../../../assets/img/sheet/sheet-add.png">
        <!--<div class="menu-item-text">推荐</div>-->
      </div>
      <!--评论-->
      <div class="sheet-menu-item">
        <img class="menu-item-img" src="../../../assets/img/sheet/sheet-comment.png">
        <!--<div class="menu-item-text">评论</div>-->
      </div>
      <!--收藏-->
      <div class="sheet-menu-item">
        <img class="menu-item-img" src="../../../assets/img/sheet/sheet-collection.png">
        <!--<div class="menu-item-text">收藏</div>-->
      </div>
    </div>
    <!--歌单列表-->
    <div class="music-list-box">
      <div class="music-list-top">
        全部播放
      </div>

      <div class="music-list">
        <div v-for="(item,index) in sheetObj.musicList" :key="index" class="music-item">
          <img src="../../../assets/img/sheet/music-add.png" class="music-item-add" />
          <var-image class="music-item-img"
                     lazy
                     loading="https://xxx.xxx/loading.png"
                     error="https://xxx.xxx/error.png"
                     radius="4px"
                     :src="item.al.picUrl"></var-image>
          <div class="music-item-info">
            <div class="music-item-name">{{item.name}}</div>
            <div class="music-item-author">
              <span v-for="(item2,index2) in item.ar" :key="index2" style="flex-shrink: 0">
                {{item2.name}} <span v-if="index2 < item.ar.length-1">/</span>
              </span><span style="flex-shrink: 0"> - {{ item.al.name}}</span>
            <!--  作者 - 专辑  -->
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {useRoute} from "vue-router"
import {SheetApi} from "@/api-modules/sheet";

const sheetApi = new SheetApi();
export default {
  name: "iphone-song-sheet",
  setup(props, context) {
    const route = new useRoute()
    let sheetObj = reactive({
      sheetId: route.query.sheetId,
      detailsName: "",
      deatilsImg: "",
      deatilsInfo: "",
      deatilsTag: "",
      playCount: "",
      authorName: "",
      authorImg: "",
      musicListId: "",
      musicList: "",
    })

    //--------request API-------
    //getData
    function getSongDetailsList(id) {
      sheetApi.getSongDetailsList(id).then(res => {
        sheetObj.detailsName = res.playlist.name;
        sheetObj.deatilsImg = res.playlist.coverImgUrl;
        sheetObj.deatilsInfo = res.playlist.description;
        sheetObj.deatilsTag = res.playlist.tags;
        sheetObj.playCount = res.playlist.playCount;
        sheetObj.authorName = res.playlist.creator.nickname;
        sheetObj.authorImg = res.playlist.creator.avatarUrl;
        console.log(res.playlist)
        const arr = [];
        res.playlist.trackIds.forEach(val => {
          arr.push(val.id);
        })
        sheetObj.musicListId = arr.join(',');
        console.log(sheetObj.musicListId)
        getMusicList(sheetObj.musicListId)
      });
    }

    //获取歌曲列表
    function getMusicList(ids) {
      sheetApi.getMusicList(ids).then(res => {
        sheetObj.musicList = res.songs;
        console.log("sheetObj:",sheetObj.musicList)
      })
    }

    //获取推荐歌单

    //获取歌单收藏列表

    //获取歌单评论

    //请求api
    // getSongDetailsList(5069871738);
    getSongDetailsList(sheetObj.sheetId);

    return {
      sheetObj
    }

  }
}
</script>

<style lang="scss" scoped>
.song-sheet-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f9f9f9;

  .sheet-info-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 0;
    margin-bottom: 10px;


    .sheet-image {
      margin-right: 8px;
      flex-shrink: 0;
      width: 120px;
      height: 120px;
    }

    .sheet-info {
      display: flex;
      flex-direction: column;

      .sheet-info-title {
        margin-bottom: 4px;
        font-size: 18px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        //设置行数 两行省略
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .sheet-info-tags {
        margin-bottom: 4px;
        display: flex;
        align-items: center;

        .tags-item {
          margin-right: 4px;
        }
      }

      .sheet-author {
        margin-bottom: 4px;
        display: flex;
        align-items: center;

        .sheet-author-img {
          margin-right: 6px;
          width: 28px;
          height: 28px;
        }

        .sheet-author-name {
          display: flex;
          color: #333;
        }

      }

      .sheet-tip {
        position: relative;
        width: 200px;
        color: #79746EFF;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;

        .sheet-chevron-right {
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translateY(-50%);
        }
      }

    }
  }

  .sheet-menu {
    margin: 10px 0 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .sheet-menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border-radius: 50%;
      background-color: #f1f1f1;

      .menu-item-img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .music-list-box{
    padding: 10px 8px 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background-color: #fff;
    .music-list-top{
      margin-bottom: 10px;
      padding-left: 10px;
    }
    .music-list{
      display: flex;
      flex-direction: column;
      align-items: center;

      .music-item{
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .music-item-add{
          margin-right: 10px;
          display: flex;
          width: 20px;
          height: 20px;
          border-radius: 8px;
          background-color: #ff000021;
          padding: 4px;
        }
        .music-item-img{
          margin-right: 10px;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }
        .music-item-info{
          width: 260px;
          display: flex;
          flex-direction: column;
          .music-item-name{
            margin-bottom: 4px;
            font-size: 16px;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
          .music-item-author{
            flex-shrink: 0;
            align-items: center;
            font-size: 12px;
            color:#79746EFF;
            overflow:hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }

}

</style>