import {http} from "@/utils/http";

class SheetApi {
    /**
     * 获取歌单分类
     * @returns {AxiosPromise}
     */
    getCatList() {
        return http({
            url: "/playlist/catlist",
        })
    }

    /**
     * 获取热门歌单分类
     * @returns {AxiosPromise}
     */
    getHotList() {
        return http({
            url: "/playlist/hot",
        })
    }

    /**
     * 获取歌单列表
     * @param order : 可选值 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
     * @param cat : tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
     * @param limit : 取出歌单数量 , 默认为 50
     * @param offset : 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
     * @returns {AxiosPromise}
     */
    getPlayList(order, cat, limit, offset) {
        return http({
            url: "/top/playlist",
            params: {
                order,
                cat,
                limit,
                offset
            }
        })
    }

}

export {
    SheetApi
}
