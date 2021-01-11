import {request} from "./request"

/**
 * 获取banner
 * @returns {AxiosPromise}
 */
export function getBanner() {
  return request({
    url:"/banner",
  })
}

/**
 * 获取推荐表单
 * @param limit 获取条数
 * @returns {AxiosPromise}
 */
export function getRecomSongList(limit) {
  return request({
    url:"/personalized",
    params: {
      limit
    }
  })
}

/**
 * 获取推荐歌曲
 * @returns {AxiosPromise}
 */
export function getRecomNewMusicList() {
  return request({
    url:"/personalized/newsong",
  })
}

/**
 * 获取歌曲详情
 * @param ids 歌曲ids 支持多个id 用,隔开
 * @returns {AxiosPromise}
 */
export function getMusicList(ids) {
  return request({
    url:"/song/detail",
    params:{
      ids
    }
  })
}

/**
 * 获取歌曲url地址
 * @param id 歌曲id
 * @returns {*}
 */
export function getMusicUrl(id) {
  return request({
    url:"/song/url",
    params:{
      id
    }
  })
}

/**
 * 获取推荐歌手信息
 * @param offset
 * @param limit
 * @returns {AxiosPromise}
 */
export function getRecomSinger(offset,limit) {
  return request({
    url:`/top/artists?offset=${offset}&limit=${limit}`,
  })
}

/**
 * 获取排行榜
 * @returns {AxiosPromise}
 */
export function getTopList() {
  return request({
    url:"/toplist",
  })
}

/**
 * 获取歌单分类
 * @returns {AxiosPromise}
 */
export function getCatList() {
  return request({
    url:"/playlist/catlist",
  })
}

/**
 * 获取热门歌单分类
 * @returns {AxiosPromise}
 */
export function getHotList() {
  return request({
    url:"/playlist/hot",
  })
}

/**
 * 获取歌单列表
 * @param order  可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param cat    tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param limit  取出歌单数量 , 默认为 50
 * @param offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @returns {AxiosPromise}
 */
export function getPlayList(order,cat,limit,offset) {
  return request({
    url:"/top/playlist",
    params:{
      order,
      cat,
      limit,
      offset
    }
  })
}

/**
 * 获取歌手列表
 * @param type 类别
 * @param area 语种
 * @param initial 名称字符
 * @param limit 获取数量
 * @param offset 获取偏移量
 * @returns {AxiosPromise}
 */
export function getSingerList(type,area,initial,limit,offset) {
  return request({
    url:"/artist/list",
    params:{
      type,
      area,
      initial,
      limit,
      offset
    }
  })
}

/**
 * 获取mv列表
 * @param area:地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param typ:类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param limit: 取出数量 , 默认为 30
 * @param offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns {AxiosPromise}
 */
export function getMvList(area,type,order,limit,offset) {
  return request({
    url:"/mv/all",
    params:{
      area,
      type,
      order,
      limit,
      offset
    }
  })
}

/**
 * 获取歌单详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getSongDetailsList(id) {
  return request({
    url:"/playlist/detail",
    params:{
      id
    }
  })
}

/**
 * 获取歌单收藏者列表
 * @param id 歌单id
 * @param limit 获取数量 默认为 20
 * @param offset 偏移量
 * @returns {AxiosPromise}
 */
export function getSongSub(id,limit,offset) {
  return request({
    url:"/playlist/subscribers",
    params:{
      id,
      limit,
      offset
    }
  })
}

/**
 * 获取相关推荐歌单
 * @param id 歌单id
 * @returns {AxiosPromise}
 */
export function getSongRecom(id) {
  return request({
    url:"/related/playlist",
    params:{
      id,
    }
  })
}

/**
 * 获取歌单评论
 * @param id 歌单id
 * @param limit 获取数量 默认为 20默认为 20
 * @param offset 偏移量
 * @returns {AxiosPromise}
 */
export function getSongComm(id,limit,offset) {
  return request({
    url:"/comment/playlist",
    params:{
      id,
      limit,
      offset
    }
  })
}
