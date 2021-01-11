<template>
  <div class="musicList">
    <el-table
      :data="musicList"
      stripe
      @row-click="playMusic"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="[{ textAlign: 'center' },{ cursor: 'pointer' }]"
      style="width: 100%">
      <el-table-column show-overflow-tooltip width="50" type="index" label="序号">
      </el-table-column>
      <el-table-column show-overflow-tooltip width="395" prop="name" label="歌曲">
      </el-table-column>
      <el-table-column show-overflow-tooltip width="130" prop="ar[0].name" label="歌手">
      </el-table-column>
      <el-table-column show-overflow-tooltip width="250" prop="al.name" label="专辑">
      </el-table-column>
      <el-table-column show-overflow-tooltip width="80" prop="dt" label="时长">
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
    }
  }
</script>

<style lang="less" scoped>
  .musicList {
    .el-table-column {
    }
  }
</style>