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
 * @param id 歌曲id
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








