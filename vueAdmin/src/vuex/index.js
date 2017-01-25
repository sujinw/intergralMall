import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import com from './modules/com/index'

const store = new Vuex.Store({
  modules: {
    com,
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store;
