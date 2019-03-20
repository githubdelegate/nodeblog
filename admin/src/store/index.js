import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  adminInfo: {
    admin_id: ''
  }
}

export default new Vuex.Store({
  state,
  mutations
})
