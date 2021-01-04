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


export function getTopList() {
  return request({
    url:"/toplist",
  })
}





