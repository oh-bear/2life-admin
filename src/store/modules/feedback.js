import { getIssues, getComments, reply, commitComment, closeIssue } from '@/api/feedback'
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
    },
    ADD_LABEL: (state, obj) => {
      const index = _.findIndex(state.list, val => val.id === obj.id)
      state.list[index].labels.push({ name: obj.name, color: obj.color })
    }
  },
  actions: {
    async GetFeedback({ commit }) {
      const { data } = await getIssues()
      commit('SET_FEEDBACK', data)
      return data
    },
    async GetComments({ state }, url) {
      const { data } = await getComments(url)
      return data
    },
    async Commit({ commit }, obj) {
      const { data } = await reply(obj)
      if (data.code !== 0) return data
      const res = await commitComment({ number: obj.number, content: obj.content })
      return res.status === 201 ? { reply: data, commit: res.data } : false
    },
    async CloseIssue({ commit }, obj) {
      const { data } = await closeIssue(obj)
      return data
    }
  }
}

export default feedback
