<template>
  <div class="flex1">

  </div>
</template>

<script>

import {SheetApi} from "@/api-modules/sheet"
import {reactive} from "vue"
const sheetApi = new SheetApi();
export default {
  name: "iphone-sheet",
  setup(){
    let sheetObj = reactive({
      sheetList:[],
    })
    sheetApi.getCatList().then(res => {
      console.log(res)
    })
    sheetApi.getHotList().then(res => {
      console.log(res)
    })
    return {
      sheetObj
    }

  },
}
</script>

<style scoped>

</style>