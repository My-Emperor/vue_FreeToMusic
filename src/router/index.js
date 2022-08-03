import { createRouter, createWebHistory } from 'vue-router'

//首页
const HOME = ()=> import('../views/home.vue');
const RECOM = ()=>import('../components/iphone/iphone-view/iphone-recom')
const RANK = ()=>import('../components/iphone/iphone-view/iphone-rank')
const SHEET = ()=>import('../components/iphone/iphone-view/iphone-sheet')
const MV = ()=>import('../components/iphone/iphone-view/iphone-mv')
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
        component: RECOM
      },
      {
        //推荐
        path: "/rank",
        component: RANK
      },
      {
        //推荐
        path: "/sheet",
        component: SHEET
      },
      {
        //mv
        path: "/mv",
        component: MV
      },
    ]

  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
