<template>
  <div class="song content-width">
    <song-filter @getSongSheet="getSongSheet" :hotList="hotList" :catList="catList"></song-filter>
    <song-list :sheetList="songList"></song-list>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="queryInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import SongFilter from "components/common/songList/SongFilter";
  import SongList from "components/common/songList/SongList";
  
  import {getCatList} from "network/home";
  import {getHotList} from "network/home";
  import {getPlayList} from "network/home";
  
  export default {
    name: "Song",
    data() {
      return {
        hotList: [],
        catList: [],
        songList: [],
        songSheetInfo: {
          order: "hot",
          cat: "全部",
          limit: 35,
          offset: 0
        },
        queryInfo: {
          //每页展示条数
          pageSize: 35,
          //当前页码
          pageNum: 1,
          //总页码
          total: 0,
        }
      }
    },
    components: {
      SongFilter,
      SongList
    },
    methods: {
      //更改标签重新获取歌单
      getSongSheet(name) {
        this.songSheetInfo.cat = name;
        //初始化查询页码与偏移量
        this.handleCurrentChange(0);
      },
      
      //更改页码时触发
      handleCurrentChange(pagenum) {
        this.queryInfo.pageNum = pagenum;
        //更新对应页码的歌单偏移量
        this.songSheetInfo.offset = (this.queryInfo.pageNum - 1) * this.songSheetInfo.limit
        //重新加载歌单
        this.getPlayListRef(this.songSheetInfo)
      },
      
      //获取全部歌单分类
      getCatListRef() {
        getCatList().then(res => {
          this.catList = res
        })
      },
      //获取热门歌单分类
      getHotListRef() {
        getHotList().then(res => {
          this.hotList = res.tags
        })
      },
      //获取歌单内容
      getPlayListRef(params) {
        getPlayList(params.order, params.cat, params.limit, params.offset).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!")

          this.songList = res.playlists;
          this.queryInfo.total = res.total
        })
      }
    },
    created() {
      //初始化歌单分类
      this.getCatListRef();
      //初始化热门歌单分类
      this.getHotListRef();
      //初始化默认歌单
      this.getPlayListRef(this.songSheetInfo)
    }
  }
</script>

<style lang="less" scoped>
  .song {
    margin-top: 25px;
    
    .page {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
  }

</style>