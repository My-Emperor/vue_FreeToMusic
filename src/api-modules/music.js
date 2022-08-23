import {http} from "@/utils/http";

class MusicApi {
    /**
     * 获取歌曲url地址
     * @param id : 歌曲id
     * @returns {*}
     */
    getMusicUrl(id) {
        return http({
            url: "/song/url",
            params: {
                id
            }
        })
    }

    getMusicLyric(id){
        return http({
            url:"/lyric",
            params: {
                id
            }
        })
    }

}

export {
    MusicApi
}