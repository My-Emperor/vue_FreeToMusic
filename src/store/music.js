import {MusicApi} from "@/api-modules/music"

const musicApi = new MusicApi();

//
export default {
    namespaced: true, // 开启命名空间
    state: {
        //playAudioControl
        musicInfo: {
            id: '',
            url: '',
            lrc: '',
            author:null, //song.artists
            name:null,
            image: ''
        },
        //歌单
        musicSheet:[],
        //播放状态: 1.列表循环 , 2.单曲循环, 3.随机播放
        musicStatus:0,
    },
    getters: {
        getMusicInfo(state) {
            return state.musicInfo
        },

        getMusicSheet(state){
            return state.musicSheet
        },

        getMusicStatus(state){
            return state.musicStatus
        }
    },
    mutations: {
        //更改歌曲
        setMusicInfo(state, payload) {
            console.log("setMusicInfo:",payload)
            state.musicInfo = payload;
        },

        //更改歌单
        setMusicSheet(state, payload) {
            state.musicSheet = payload;
        },

        setMusicStatus(state, payload){
            state.musicSheet = payload;
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

            let arr = state.musicSheet.filter(item => {
                return item.id == musicInfo.id
            })

            if (arr.length == 0){
                commit('setMusicSheet',[musicInfo,...state.musicSheet]);
            }

        }
    },

}