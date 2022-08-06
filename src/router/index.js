import { createRouter, createWebHashHistory } from 'vue-router'

//首页
const HOME = ()=> import('../views/home');
const LOGIN = ()=>import('../views/login')
const RECOM = ()=>import('../components/iphone/iphone-view/iphone-recom')
const RANK = ()=>import('../components/iphone/iphone-view/iphone-rank')
const SHEET = ()=>import('../components/iphone/iphone-view/iphone-sheet')
const MV = ()=>import('../components/iphone/iphone-view/iphone-mv')
const SEARCH = ()=>import('../components/iphone/iphone-view/iphone-search')
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'home',
    redirect: "/recom",
    //懒加载的方式
    component: HOME,
    children: [
      {
        //推荐
        path: "/recom",
        component: RECOM,
        meta: { title: '首页'}
      },
      {
        //排行
        path: "/rank",
        component: RANK,
        meta: { title: '排行'}
      },
      {
        //推荐
        path: "/sheet",
        component: SHEET,
        meta: { title: '歌单'}
      },
      {
        //mv
        path: "/mv",
        component: MV,
        meta: { title: 'MV'}
      },
      {
        //search
        path: "/search",
        component: SEARCH,
        meta: { title: '搜索'}
      },
    ]

  },
  {
    path: '/login',
    name: 'login',
    //懒加载的方式
    component: LOGIN,
    meta: { title: '登录'}

  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


export default router
