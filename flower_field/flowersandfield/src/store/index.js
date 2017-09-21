/**
 * Created by newuser on 2017/9/12.
 */
import Vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import header from './modules/header'

Vue.use(vuex)

export default new vuex.Store({
  mutations,
  actions,
  modules: {
    header,
  }
})
