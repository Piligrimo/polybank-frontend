import { createStore } from 'vuex'
import { api } from './api'

export const store = createStore({
  state () {
    return {
      user: null,
      loading: false
    }
  },
  mutations: {
    SET_USER(state, payload) {
        state.user = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    }
  },
  actions: {
    async GET_USER({ commit }) {
        const user = await api.me() 
        console.log(user, 'GET_USER');
        commit('SET_USER', user)
        return user
    }, 
    async CALL_REQUEST({commit}, callback){
        commit('SET_LOADING', true)
        const result = await callback()
        console.log(result);
        commit('SET_LOADING', false)
        return result
    }
  }
})

// 5 октября 1997 10:30