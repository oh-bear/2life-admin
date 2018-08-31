import { getIssues, getComments } from '@/api/feedback'

const feedback = {
  state: {
    list: []
  },
  mutations: {
    SET_FEEDBACK: (state, list) => {
      state.list = list
    }
  },
  actions: {
    async GetFeedback({ commit }) {
      const { data } = await getIssues()
      commit('SET_FEEDBACK', data)
      return data
    },
    async GetComments({ commit }, url) {
      const { data } = await getComments(url)
      return data
    }
  }
}

export default feedback
