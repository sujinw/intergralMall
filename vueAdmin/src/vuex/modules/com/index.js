import * as types from '../../types'
/**
 * App通用配置
 */
const state = {
  isLogin: true
}

const actions = {
  //本程序主要设置标题栏，对于通用程序，则可以设置返回按钮，底部导航栏
  comConf({ commit }, settings) {
    commit(types.COM_CONF, settings)
  },

}
const getters = {
  comConf: state => state,

}
const mutations = {
  [types.COM_CONF](state, settings) {
    state = Object.assign(state, settings)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
