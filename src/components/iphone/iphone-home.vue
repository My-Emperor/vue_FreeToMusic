<template>
  <div class="iphone-home-page">
    <!--设计头部布局-->
    <!--  header-->
    <var-app-bar :title="navObj.navTitle" title-position="center"
                 color="#00c48f">
      <template #left v-if="!tabObj.isTabbar">
        <var-button
            round
            text
            color="transparent"
            text-color="#fff"
            @click="navObj.goBack"
        >
          <var-icon name="chevron-left" :size="28" />
        </var-button>
      </template>
      <template #right>
        <var-button
            round
            text
            title-position="center"
            color="#00c48f"
            text-color="#ffffff"
            @click="navObj.searchButton"
        >
          <var-icon name="magnify" :size="24"/>
        </var-button>
      </template>
    </var-app-bar>

    <div class="iphone-container flex1">
      <router-view></router-view>
      <iphone-footer></iphone-footer>
    </div>
    <!--设计底部tabbar-->
    <var-bottom-navigation
        v-if="tabObj.isTabbar"
        active-color="rgb(84,154,171)"
        v-model:active="tabObj.tabActive"
        :border="true"
        @change="tabObj.changeTab"
    >
      <var-bottom-navigation-item
          v-for="(item,index) in tabObj.tabList"
          :key="index"
          :label="item.label"
          :name="item.index"
          :icon="item.varletIcon"
      />
    </var-bottom-navigation>
  </div>
</template>

<script>
import iphoneFooter from "@/components/iphone/iphone-view/iphone-footer"
import {onMounted, reactive , watch} from "vue"
import {useRouter, useRoute} from "vue-router"

export default {
  name: "iphone-home",
  components:{
    iphoneFooter,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    //tabbar
    let tabObj = reactive({
      tabActive: 0,
      isTabbar:true,
      tabList: [
        {
          label: "推荐",
          index:"0",
          path: "/recom",
          varletIcon: "home"
        },
        {
          label: "排行",
          index:"1",
          path: "/rank",
          varletIcon: "magnify"
        },
        {
          label: "歌单",
          index:"2",
          path: "/sheet",
          varletIcon: "format-list-checkbox"
        },
        {
          label: "MV",
          index:"3",
          path: "/mv",
          varletIcon: "account-circle"
        },
      ],
      changeTab(active) {
        console.log(active)
        router.push(tabObj.tabList[active].path)
      }
    })
    //navigator
    let navObj = reactive({
      navTitle:route.meta.title,
      goBack(){
        router.back();
      },
      searchButton() {
        router.push('/search');
        console.log(route.fullPath)
      }
    })
    onMounted(() => {
      // 初始化时判断tabActiveIndex
      tabObj.tabActive = tabObj.tabList.findIndex((item) => {
        return item.path == route.fullPath;
      });
      console.log(tabObj.tabActive)
    })
    watch(route, (nv) => {
      // console.log('route的值发生变化了');
      // console.log(nv)
      // console.log(`newValue:${nv}, oldValue:${ov}`);
      let index = tabObj.tabList.findIndex(item => {
        return item.path == nv.fullPath
      })
      tabObj.isTabbar = index == -1?false:true;
    }, {
      //监视的配置
      immediate: true //首次更新
    });
    return {
      tabObj,
      navObj
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
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS<11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容iOS>= 11.2 */
  background-color: #fff;
  .iphone-container {
    width: 375px;
    overflow: scroll;
  }
}
</style>