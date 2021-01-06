<template>
  <div class="singerList">
    <singer :singerList="singerList"></singer>
  </div>
</template>

<script>
  import singer from "../singer/Singer"
  export default {
    name: "SingerList",
    components:{
      singer
    },
    props:{
      singerList:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    methods:{
    
    }
  }
</script>

<style scoped>

</style>