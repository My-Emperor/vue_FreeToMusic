import {http} from "@/utils/http"


class RecomApi {

    /**
     * 获取banner
     * @returns {AxiosPromise}
     */
    getBanner() {
        console.log(http)
        return http({
            url: "/banner",
        })
    }

    /**
     * 获取推荐表单
     * @param limit : 获取条数
     * @returns {AxiosPromise}
     */
    getRecomSongList(limit) {
        return http({
            url: "/personalized",
            params: {
                limit
            }
        })
    }

    /**
     * 获取推荐歌曲
     * @returns {AxiosPromise}
     */
    getRecomNewMusicList() {
        return http({
            url: "/personalized/newsong",
        })
    }

    /**
     * 获取推荐歌手信息
     * @param offset : 位偏移量
     * @param limit : 获取数量
     * @returns {AxiosPromise}
     */
    getRecomSinger(offset, limit) {
        return http({
            url: `/top/artists?offset=${offset}&limit=${limit}`,
        })
    }

}

export {
    RecomApi
}

