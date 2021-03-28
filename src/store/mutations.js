export default {
  //登录
  setIsLogin(state,flag){
    state.isLogin = flag;
  },
  //歌曲列表
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
      state.musicDetailsList.unshift(music);
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
  //清空列表
  clearMusicDetailsList(state,list){
    state.musicDetailsList = list
  },
  //清空歌曲详情
  clearMusicDetails(state,music){
    state.musicDetails = music
  },
  //设置清空列表状态
  setclearListFlag(state,flag){
    state.clearListFlag = flag
  },
  //是否播放
  setIsPlayer(state,flag){
    state.isPlayer = flag;
  },
  //删除列表音乐(无版权音乐)
  removeMusicList(state,musicId){
    console.log(state.musicDetailsList)
    for (let [i,musicObj] of state.musicDetailsList.entries()) {
      console.log(i)
      if (musicObj.id == musicId){
        console.log(true)
        state.musicDetailsList.splice(i,1);
        console.log(state.musicDetailsList)
      }
    }
  }
}