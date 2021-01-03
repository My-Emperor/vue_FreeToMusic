export default {
  //登录
  setIsLogin(state,flag){
    state.isLogin = flag;
  },
  //歌曲详情
  setMusicDetailsList(state,music){
    console.log(music)
    state.musicDetails = music
    //将歌曲添加到歌单列表中
    state.musicDetailsList.push(music);
  },
  //播放歌曲id
  setPlayerMusicId(state,musicId){
    console.log("music:"+musicId)
    state.playerMusicId = musicId;
  },
  //切换播放模式
  changePlayerMode(state,num){
    state.playerMode = num;
  },
  setIsPlayer(state,flag){
    state.isPlayer = flag;
  }
}