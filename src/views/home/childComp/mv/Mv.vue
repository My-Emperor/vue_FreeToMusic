<template>
  <div class="mv content-width">
    <mv-filter :languageFilter="area"
               :sourceFilter="type"
               :gratefulFilter="order"
               :languageActive="languageActive"
               :sourceActive="sourceActive"
               :gratefulActive="gratefulActive"
               @changeType="changeType"></mv-filter>
    <mv-list @changePage="changePage" :pageDown="pageDown" :pageUp="pageUp" :mvList="mvList"></mv-list>
  </div>
</template>

<script>
  import MvFilter from "components/common/mvList/MvFilter";
  import MvList from "components/common/mvList/MvList";
  
  import {getMvList} from "network/home";
  
  export default {
    name: "Mv",
    data() {
      return {
        //地区
        area: [
          {
            value: 0,
            label: "全部"
          },
          {
            value: 1,
            label: "内地"
          },
          {
            value: 2,
            label: "港台"
          },
          {
            value: 3,
            label: "欧美"
          },
          {
            value: 4,
            label: "日本"
          },
          {
            value: 5,
            label: "韩国"
          },
        ],
        //类型
        type: [
          {
            value: 0,
            label: "全部"
          },
          {
            value: 1,
            label: "官方版"
          },
          {
            value: 2,
            label: "原生"
          },
          {
            value: 3,
            label: "现场版"
          },
          {
            value: 4,
            label: "网易出品"
          },
        ],
        //排序
        order: [
          {
            value: 0,
            label: "上升最快"
          },
          {
            value: 1,
            label: "最热"
          },
          {
            value: 2,
            label: "最新"
          },
        ],
        
        //
        languageActive: "全部",
        sourceActive: "全部",
        gratefulActive: "上升最快",
        
        mvInfo: {
          area: "全部",
          type: "全部",
          order: "上升最快",
          limit: 16,
          offset: 0,
        },
        mvList:[],
      }
    },
    components: {
      MvFilter,
      MvList
    },
    methods: {
      //修改分类
      changeType(obj) {
        if (obj.type == "language") {
          this.languageActive = obj.label;
          this.mvInfo.area = obj.label;
        } else if (obj.type == "source") {
          this.sourceActive = obj.label;
          this.mvInfo.type = obj.label;
        } else if (obj.type == "grateful") {
          this.gratefulActive = obj.label;
          this.mvInfo.order = obj.label;
        } else {
          return null;
        }
        //重置查询偏移量
        this.mvInfo.offset = 0;
        //更新查询条件后发送请求获取对应条件歌手列表]
        this.getMvListRef(this.mvInfo);
      },
  
      //跳转页码事件
      changePage(type) {
        if (type == 'up') {
          this.mvInfo.offset -= 16;
          this.getMvListRef(this.mvInfo)
        } else if (type == 'down') {
          this.mvInfo.offset += 16;
          this.getMvListRef(this.mvInfo)
        } else {
          return
        }
      },
      
      getMvListRef(params) {
        getMvList(params.area, params.type, params.order, params.limit, params.offset).then(res => {
          // if (res.code != 200) return this.$message.error("ERROR!");
          this.mvList = res.data;
        })
      },
    },
    computed: {
      pageDown: function () {
        return this.mvList.length < 16 ? true : false;
      },
      pageUp: function () {
        return this.mvInfo.offset == 0 ? true : false;
      },
    },
    created() {
      //初始化mv分类
      this.getMvListRef(this.mvInfo);
    }
  }
</script>

<style lang="less" scoped>
  .mv {
    margin-top: 25px;
  }

</style>