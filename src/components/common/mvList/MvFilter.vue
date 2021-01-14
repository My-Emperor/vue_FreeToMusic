<template>
  <div class="mvFilter">
    <div class="filter filter-language">
      <ul>
        <li v-for="(item,index) in languageFilter"
            :key="index"
            @click="selectLanguage(item.value,item.label)"
            :class="item.label === languageActive ? 'active':''">
          {{item.label}}
        </li>
      </ul>
    </div>
    <div class="filter filter-source">
      <ul>
        <li v-for="(item,index) in sourceFilter"
            :key="index"
            @click="selectSource(item.value,item.label)"
            :class="item.label === sourceActive ? 'active':''">
          {{item.label}}
        </li>
      </ul>
    </div>
    <div class="filter filter-grateful">
      <ul>
        <li v-for="(item,index) in gratefulFilter"
            :key="index"
            @click="selectGrateful(item.value,item.label)"
            :class="item.label === gratefulActive ? 'active':''">
          {{item.label}}
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "MvFilter",
    props: {
      languageFilter: {
        type: Array,
        default() {
          return []
        },
      },
      sourceFilter: {
        type: Array,
        default() {
          return []
        },
      },
      gratefulFilter: {
        type: Array,
        default() {
          return []
        },
      },
      languageActive: {
        type: String,
        default: "",
      },
      sourceActive: {
        type: String,
        default: "",
      },
      gratefulActive: {
        type: String,
        default: "",
      },
    },
    methods: {
      //
      selectLanguage(value,label) {
        this.$emit('changeType',{
          type:'language',
          value:value,
          label:label
        })
      },
      selectSource(value,label) {
        this.$emit('changeType',{
          type:'source',
          value:value,
          label:label
        })
      },
      selectGrateful(value,label) {
        this.$emit('changeType',{
          type:'grateful',
          value:value,
          label:label
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .mvFilter {
    
    .filter {
      margin: 10px 2px;
      height: 50px;
      display: flex;
      align-items: center;
      
      ul {
        display: flex;
        justify-content: left;
        align-items: center;
        
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0px 8px;
          padding: 0px;
          width: 60px;
          height: 30px;
          border-radius: 10px;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .active {
      color: #fff;
      background-color: #ea482c;
    }
  }

</style>