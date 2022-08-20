<template>
  <div class="iphone-home-page">
    <!--设计头部布局-->
    <!--  header-->
    <var-app-bar style="flex-shrink: 0" :title="navObj.navTitle" title-position="center"
                 color="#00c48f">
      <template #left v-if="!tabObj.isTabbar">
        <var-button
            round
            text
            color="transparent"
            text-color="#fff"
            @click="navObj.goBack"
        >
          <var-icon name="chevron-left" :size="28"/>
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

    <var-loading class="loading-mask" description="loading..." type="circle" color="#00C48F" :loading="loadingFlag">
      <div class="iphone-container flex1">
        <!--主体内容-->
        <router-view></router-view>
        <!--底部-->
        <iphone-footer></iphone-footer>
        <!--控制器-->
        <iphone-play :hasTab="tabObj.isTabbar"></iphone-play>
      </div>
    </var-loading>

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
import iphoneFooter from "@/components/iphone/iphone-component/iphone-footer"
import {onMounted, reactive, watch, computed} from "vue"
import {useRouter, useRoute} from "vue-router"
import {useStore} from "vuex";


export default {
  name: "iphone-home",
  components: {
    iphoneFooter,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    //tabbar
    let tabObj = reactive({
      tabActive: 0,
      isTabbar: true,
      tabList: [
        {
          label: "推荐",
          index: "0",
          path: "/recom",
          varletIcon: "home"
        },
        {
          label: "排行",
          index: "1",
          path: "/rank",
          varletIcon: "magnify"
        },
        {
          label: "歌单",
          index: "2",
          path: "/sheet",
          varletIcon: "format-list-checkbox"
        },
        {
          label: "MV",
          index: "3",
          path: "/mv",
          varletIcon: "account-circle"
        },
      ],
      changeTab(active) {
        console.log(active)
        router.replace(tabObj.tabList[active].path)
      }
    })
    //navigator
    let navObj = reactive({
      navTitle: route.meta.title,
      goBack() {
        router.back();
      },
      searchButton() {
        router.push('/search');
        console.log(route.fullPath)
      }
    })

    let loadingFlag = computed(() => {
      return store.state.loadingFlag;
    })

    onMounted(async () => {
      // 初始化时判断tabActiveIndex
      tabObj.tabActive = tabObj.tabList.findIndex((item) => {
        return item.path == route.fullPath;
      });
      console.log(tabObj.tabActive)
    })

    //监听route
    watch(route, (nv) => {
      let index = tabObj.tabList.findIndex(item => {
        return item.path == nv.fullPath
      })
      tabObj.isTabbar = index == -1 ? false : true;
    }, {
      //监视的配置
      immediate: true //首次更新
    });


    return {
      tabObj,
      navObj,
      loadingFlag
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

  :deep .var-loading__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .loading-mask {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
  }

  .iphone-container {
    position: relative;
    width: 375px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
}
</style>