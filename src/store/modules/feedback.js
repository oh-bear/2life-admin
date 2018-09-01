import { getIssues, getComments, closeIssue } from '@/api/feedback'
import _ from 'lodash'

const feedback = {
  state: {
    list: []
  },
  mutations: {
    SET_FEEDBACK: (state, list) => {
      const arr = []
      _.forEach(list, val => {
        if (_.findIndex(arr, item => item.title === val.title && item.body === val.body) !== -1) return
        arr.push(val)
      })
      state.list = arr
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
    },
    async CloseIssue({ commit }, obj) {
      const { data } = await closeIssue(obj)
      return data
    }
  }
}

export default feedback
