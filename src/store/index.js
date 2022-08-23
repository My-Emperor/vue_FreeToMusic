import { createStore } from 'vuex'

import globale from "./global"
import music from "./music"
export default createStore({
  ...globale,
  modules: {
    music
  }
})
