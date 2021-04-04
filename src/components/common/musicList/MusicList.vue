<template>
  <div class="musicList">
    <el-table
      :data="musicList"
      stripe
      @row-click="playMusic"
      style="width: 100%">
      <el-table-column show-overflow-tooltip type="index" label="序号">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="歌曲">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手">
        <!--利用作用域插槽将所有歌手显示-->
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.ar" :key="index">
            <span v-if="index != 0"> / </span>{{item.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="al.name" label="专辑">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="dt" label="时长">
        <template slot-scope="scope">
          {{$utils.formatSecondTime(scope.row.dt / 1000)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "MusicList",
    props: {
      musicList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      playMusic(row) {
        this.$emit("getMusic", row.id)
      }
    },
    mounted() {
      // console.log(this.musicList)
    }
  }
</script>

<style lang="less" scoped>
  .musicList {
    width: 100%;
    .el-table {
      cursor: pointer;
    }
  }
</style>