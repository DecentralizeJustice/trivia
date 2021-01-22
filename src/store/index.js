import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { gameInfo } from './gameInfo.js'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  modules: {
    gameInfo
  },
  plugins: [vuexLocal.plugin]
})
