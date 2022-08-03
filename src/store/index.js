import { createStore } from 'vuex'

export default createStore({
  state: {
    //屏幕宽度基准
    innerWidth:1336,
    //是否pc端
    isPc:true,
  },
  getters: {
  },
  mutations: {
    //修改屏幕宽度
    updateInnerWidth(state,innerWidth){
      console.log("state:",state.innerWidth)
      console.log("params",innerWidth)
      state.innerWidth = innerWidth;
    },
    //是否pc
    updateIsPc(state,isPc){
      state.isPc = isPc;
    }
  },
  actions: {
  },
  modules: {
  }
})
