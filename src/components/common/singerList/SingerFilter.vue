<template>
  <div class="singerFilter">
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
    <div class="filter filter-category">
      <ul>
        <li v-for="(item,index) in categoryFilter"
            :key="index"
            @click="selectCategory(item.value,item.label)"
            :class="item.label === categoryActive ? 'active':''">
          {{item.label}}
        </li>
      </ul>
    </div>
    <div class="filter filter-name">
      <ul>
        <li v-for="(item,index) in nameFilter"
            :key="index"
            @click="selectName(item.value,item.label)"
            :class="[
               item.label === '热门' ? 'other':'',
               item.label === '其他' ? 'other':'',
               item.label === nameActive ? 'active':'']">
          {{item.label}}
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "SingerFilter",
    data() {
      return {}
    },
    props: {
      languageFilter: {
        type: Array,
        default() {
          return []
        },
      },
      categoryFilter: {
        type: Array,
        default() {
          return []
        },
      },
      nameFilter: {
        type: Array,
        default() {
          return []
        },
      },
      languageActive: {
        type: String,
        default: "",
      },
      categoryActive: {
        type: String,
        default: "",
      },
      nameActive: {
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
      selectCategory(value,label) {
        this.$emit('changeType',{
          type:'category',
          value:value,
          label:label
        })
      },
      selectName(value,label) {
        this.$emit('changeType',{
          type:'name',
          value:value,
          label:label
        })
      },
      
    }
  }
</script>

<style lang="less" scoped>
  .singerFilter {
    
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
    
    .filter-name {
      ul {
        li {
          margin: 0px 8px;
          padding: 15px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
        
        .other {
          margin: 0px 8px;
          padding: 0px;
          width: 60px;
          height: 30px;
          border-radius: 10px;
        }
      }
    }
    
    .active {
      color: #fff;
      background-color: #ea482c;
    }
  }

</style>