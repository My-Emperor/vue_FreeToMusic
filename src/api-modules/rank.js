import {http} from "@/utils/http"

/**
 * 获取榜单
 * @returns {AxiosPromise}
 */

class RankApi {
    getTopList() {
        return http({
            url: "/toplist",
        })
    }
}

export {
    RankApi
}
