<template>
  <div class="iphone-home-page">
    <!--设计头部布局-->
    <!--  header-->
    <var-app-bar
        title="标题"
        title-position="center"
        color="#00c48f"
    />
    <div class="iphone-container flex1" >
      <router-view></router-view>
    </div>
    <!--设计底部tabbar-->
    <var-bottom-navigation
        active-color="rgb(84,154,171)"
        v-model:active="tabObj.tabActive"
        :safe-area="true"
        :border="true"
        @change="tabObj.changeTab"
    >
      <var-bottom-navigation-item v-for="(item,index) in tabObj.tabList" :key="index" :label="item.name"
                                  :icon="item.varletIcon"/>
    </var-bottom-navigation>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue"
import {useRouter, useRoute} from "vue-router"

export default {
  name: "iphone-home",
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log(route.fullPath)
    let tabObj = reactive({
      tabActive: 0,
      tabList: [
        {
          name: "推荐",
          path: "/recom",
          varletIcon: "home"
        },
        {
          name: "排行",
          path: "/rank",
          varletIcon: "magnify"
        },
        {
          name: "歌单",
          path: "/sheet",
          varletIcon: "format-list-checkbox"
        },
        {
          name: "MV",
          path: "/mv",
          varletIcon: "account-circle"
        },
      ],
      changeTab(active) {
        router.push(tabObj.tabList[active].path)
      }
    })


    onMounted(() => {
      //初始化时判断tabActiveIndex
      tabObj.tabActive = tabObj.tabList.findIndex((item) => {
        return item.path == route.fullPath;
      });
    })

    return {
      tabObj
    }
  }
}
</script>

<style lang="scss" scoped>
.iphone-home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  //padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS<11.2 */
  //padding-bottom: env(safe-area-inset-bottom); /* 兼容iOS>= 11.2 */

  .iphone-container{
    width: 375px;
    overflow: scroll;
  }
}
</style>