//全局store,存放全局使用共享的数据
export default {
    state: {
        //屏幕宽度基准
        innerWidth:1336,
        //是否pc端
        isPc:true,
        //是否显示全局Loading
        loadingFlag:false,
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
        },
        updateLoadingFlag(state,loadingFlag){
            state.loadingFlag = loadingFlag
        }
    },
    actions: {
    },

}