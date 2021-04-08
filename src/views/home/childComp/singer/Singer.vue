<template>
  <div class="singer content-width">
    <singer-filter
      :languageFilter="languageFilter"
      :categoryFilter="categoryFilter"
      :nameFilter="nameFilter"
      :languageActive="languageActive"
      :categoryActive="categoryActive"
      :nameActive="nameActive"
      @changeType="changeType">
    </singer-filter>
    
    <singer-list @changePage="changePage" :pageDown="pageDown" :pageUp="pageUp" :singerList="singerList"></singer-list>
  </div>
</template>

<script>
  import SingerFilter from "components/common/singerList/SingerFilter";
  import SingerList from "components/common/singerList/SingerList";
  
  import {getSingerList} from "../../../../network/home";
  
  export default {
    name: "Singer",
    data() {
      return {
        //语种
        languageFilter: [
          {
            value: -1,
            label: "全部"
          }, {
            value: 7,
            label: "华语"
          }, {
            value: 96,
            label: "欧美"
          }, {
            value: 8,
            label: "日本"
          }, {
            value: 16,
            label: "韩国"
          }, {
            value: 0,
            label: "其他"
          },
        ],
        //类别
        categoryFilter: [
          {
            value: -1,
            label: "全部"
          }, {
            value: 1,
            label: "男歌手"
          }, {
            value: 2,
            label: "女歌手"
          }, {
            value: 3,
            label: "乐队"
          },
        ],
        //名称
        nameFilter: [],
        
        languageActive: "全部",
        
        categoryActive: "全部",
        
        nameActive: "热门",
        
        singerInfo: {
          // 请求参数
          // 返回数量
          limit: 35,
          // 偏移数量
          offset: 0,
          // 分类 -1:全部
          type: -1,
          // 语种 -1:全部
          area: -1,
          // 字母A_Z -1:热门
          initial: -1
        },
        singerList: [],
        queryInfo: {
          //每页展示条数
          pageSize: 35,
          //当前页码
          pageNum: 1,
        },
      }
    },
    components: {
      SingerFilter,
      SingerList,
    },
    methods: {
      getNameFilter() {
        let ens = []
        for (let i = 0; i < 26; i++) {
          ens.push({
            value: String.fromCharCode(97 + i),
            label: String.fromCharCode(65 + i)
          })
        }
        ens.unshift({
          value: -1,
          label: '热门'
        })
        ens.push({
          value: 0,
          label: '其他'
        })
        return ens;
      },
      
      //修改分类
      changeType(obj) {

        if (obj.type == "language") {
          this.languageActive = obj.label;
          this.singerInfo.area = obj.value;
        } else if (obj.type == "category") {
          this.categoryActive = obj.label;
          this.singerInfo.type = obj.value;
        } else if (obj.type == "name") {
          this.nameActive = obj.label;
          this.singerInfo.initial = obj.value;
        } else {
          return null;
        }
        //重置查询偏移量
        this.singerInfo.offset = 0;
        //更新查询条件后发送请求获取对应条件歌手列表
        this.getSingerListRef(this.singerInfo)
      },
      
      //跳转页码事件
      changePage(type) {
        if (type == 'up') {
          this.singerInfo.offset -= 35;

          this.getSingerListRef(this.singerInfo)
        } else if (type == 'down') {
          this.singerInfo.offset += 35;

          this.getSingerListRef(this.singerInfo)
        } else {
          return
        }
      },
      
      getSingerListRef(params) {
        getSingerList(params.type, params.area, params.initial, params.limit, params.offset).then(res => {

          // if (res.code != 200) return this.$message.error("ERROR!");
          this.singerList = res.artists;
        })
      }
    },
    computed: {
      pageDown: function () {
        return this.singerList.length < 35 ? true : false;
      },
      pageUp: function () {
        return this.singerInfo.offset == 0 ? true : false;
      },
    },
    mounted() {
      this.nameFilter = this.getNameFilter()
      
    },
    created() {
      //初始化默认歌手列表
      this.getSingerListRef(this.singerInfo);
    }
  }
</script>

<style lang="less" scoped>
  .singer {
    margin-top: 25px;
    
  }
</style>