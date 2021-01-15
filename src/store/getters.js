export default {
  getPlayMusicId:state => {
    return state.playerMusicId;
  },
  getMusicDetailsList:state => {
    return state.musicDetailsList;
  },
  getMusicDetails:state => {
    return state.musicDetails
  },
  
  getSearchKeyWord:state => {
    return state.keywords
  }
  
}
