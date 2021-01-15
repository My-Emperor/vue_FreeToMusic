export default {
  //登录
  setIsLogin(state,flag){
    state.isLogin = flag;
  },
  //歌曲详情
  setMusicDetailsList(state,music){
    var flag = true;
    console.log(music)
    state.musicDetails = music
    state.musicDetailsList.forEach(item => {
      if (item.id == music.id){
        flag = false;
      }
    })
    if (flag){
      //将歌曲添加到歌单列表中
      state.musicDetailsList.push(music);
    }
    
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
  //设置关键字
  setSearch(state,keyword){
    state.keywords = keyword
  },
  
  setIsPlayer(state,flag){
    state.isPlayer = flag;
  }
}