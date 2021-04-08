<template>
  <div class="mvDetails content-width">
    <div class="left">
      <el-card>
        <mv-player :mvUrl="mvUrl" :mvDetails="mvDetails"></mv-player>
        <comment v-if="newCommList.length" :newCommList="newCommList" :hotCommList="hotCommList"></comment>
        <div class="page" v-if="newCommList.length">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-size="pageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageInfo.total">
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card>
        <related @changeMvDetail="changeMvDetail" :mvRecomList="mvRecomList"></related>
      </el-card>
    </div>
  </div>
</template>

<script>
  import MvPlayer from "components/common/mvDetails/left/MvPlayer";
  import Comment from "components/common/mvDetails/left/Comment";
  import Related from "components/common/mvDetails/right/Related";
  
  import {getMvUrl} from "network/home";
  import {getMvComment} from "network/home";
  import {getMvDetails} from "network/home";
  import {getMvRecom} from "network/home";
  
  export default {
    name: "MvDetails",
    data() {
      return {
        mvId: null,
        mvUrl: '',
        mvDetails: null,
        commQueryInfo: {
          id: null,
          limit: 15,
          offset: 0
        },
        newCommList: [],
        hotCommList: [],
        mvRecomList:[],
        pageInfo: {
          //每页展示条数
          pageSize: 15,
          //当前页码
          pageNum: 1,
          //总页码
          total: 0,
        }
      }
    },
    components: {
      Related,
      Comment,
      MvPlayer,
    },
    methods: {
      //更改页码时触发
      handleCurrentChange(pagenum) {
        this.pageInfo.pageNum = pagenum;
        //更新对应页码的歌单偏移量
        this.commQueryInfo.offset = (this.pageInfo.pageNum - 1) * this.commQueryInfo.limit
        //重新获取评论 (评论中自动删除了hotComment 所以不需要判断处理)
        this.getMvCommentRef(this.commQueryInfo);
      },
      
      //更换mv
      changeMvDetail(id){
        this.mvId = id;
        this.commQueryInfo.id = id;
        this.getMvUrlRef(this.mvId);
        this.getMvDetailsRef(this.mvId);
        this.getMvCommentRef(this.commQueryInfo)
        this.getMvRecomRef(this.mvId)
      },
      
      //获取mv的url地址
      getMvUrlRef(id) {
        getMvUrl(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.mvUrl = res.data.url;
        })
      },
      
      //获取mv详情
      getMvDetailsRef(id) {
        getMvDetails(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.mvDetails = res.data
        })
      },
      
      //获取歌曲评论
      getMvCommentRef(params) {
        getMvComment(params.id, params.limit, params.offset).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.newCommList = res.comments;
          this.hotCommList = res.hotComments;
          this.pageInfo.total = res.total;
        })
      },
      
      //获取相关推荐mv
      getMvRecomRef(id){
        getMvRecom(id).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.mvRecomList = res.mvs;
        })
      }
    },
    mounted() {
      this.mvId = this.$route.query.id;
      this.commQueryInfo.id = this.$route.query.id;
      this.getMvUrlRef(this.mvId);
      this.getMvDetailsRef(this.mvId);
      this.getMvCommentRef(this.commQueryInfo)
      this.getMvRecomRef(this.mvId)
    },
    created() {
    }
  }
</script>

<style lang="less" scoped>
  .mvDetails {
    margin-top: 25px;
    
    .left {
      width: 980px;
    }
    
    .right {
      width: 360px;
    }
    .page{
      display: flex;
      justify-content: center;
    }
  }

</style>