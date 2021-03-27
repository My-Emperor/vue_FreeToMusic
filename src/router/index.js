import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import("@/views/login/Login");
const Home = () => import("@/views/home/Home");
const Recom = () => import("@/views/home/childComp/recom/Recom");
const Rank = () => import("@/views/home/childComp/rank/Rank");
const Singer = () => import("@/views/home/childComp/singer/Singer");
const Song = () => import("@/views/home/childComp/song/Song");
const Mv = () => import("@/views/home/childComp/mv/Mv");
const SongDetails = () => import("@/views/home/childComp/songDetails/SongDetails");
const MvDetails = () => import("@/views/home/childComp/mvDetails/MvDetails")
const SingerDetails =() => import("@/views/home/childComp/singerDetails/SingerDetails")
const AlbumDetails =() => import("@/views/home/childComp/albumDetails/AlbumDetails")
const Search =() => import("@/views/home/childComp/search/Search")
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/login",
    component: Login
  },
  { //首页
    path: "/home",
    component: Home,
    redirect: "/recom",
    children: [
      {
        //推荐
        path: "/recom",
        component: Recom
      },
      {
        //排行
        path: "/rank",
        component: Rank
      },
      {
        //歌手
        path: "/singer",
        component: Singer
      },
      {
        //歌单
        path: "/song",
        component: Song
      },
      {
        //mv
        path: "/mv",
        component: Mv
      },
      {
        //歌单详情
        path: "/songDetails",
        component: SongDetails
      },
      {
        //mv详情
        path: "/mvDetails",
        component: MvDetails
      },
      {
        //歌手详情
        path: "/singerDetails",
        component: SingerDetails
      },
      {
        //专辑详情
        path: "/albumDetails",
        component: AlbumDetails
      },
      {
        //搜索详情
        path: "/search",
        component: Search
      },
    ]
  }
];

const router = new VueRouter({
  // BUG: 刷新出现Cannot GET /recom
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
