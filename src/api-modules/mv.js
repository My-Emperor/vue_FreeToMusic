import {http} from "@/utils/http";


class MvApi {
    /**
     * 获取mv列表
     * @param area : 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
     * @param type : 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
     * @param order : 排序,可选值为上升最快,最热,最新,不填则为上升最快
     * @param limit : 取出数量 , 默认为 30
     * @param offset : 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
     * @returns {AxiosPromise}
     */
    getMvList(area, type, order, limit, offset) {
        return http({
            url: "/mv/all",
            params: {
                area,
                type,
                order,
                limit,
                offset
            }
        })
    }
}


export {MvApi}