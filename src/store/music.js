import {MusicApi} from "@/api-modules/music"

const musicApi = new MusicApi();

//
export default {
    namespaced: true, // 开启命名空间
    state: {
        //playAudioControl所需
        musicInfo: {
            id: '',
            url: '',
            lrc: '',
            author:null, //song.artists
            name:null,
            image: ''
        }
    },
    getters: {
        //获取
        getMusicInfo(state) {
            return state.musicInfo
        }
    },
    mutations: {
        //更改
        setMusicInfo(state, payload) {
            state.musicInfo = payload;
        }
    },
    actions: {
        //异步更新
        async updateMusicInfo({state, commit}, payload) {
            console.log("payLoad:---",payload)
            let res1 = await musicApi.getMusicUrl(payload.info.id)  //更新url
            let res2 = await musicApi.getMusicLyric(payload.info.id)  //更新lrc

            let musicInfo = {
                id: payload.info.id,
                url: res1.data[0].url,
                lrc: res2.lrc.lyric,
                author:payload.info.song.artists, //song.artists
                name:payload.info.name,
                image: payload.info.picUrl
            }

            commit('setMusicInfo', musicInfo)
        }
    },

}