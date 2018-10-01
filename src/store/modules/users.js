import { reset } from '@/api/users'

const feedback = {
  state: {
    list: []
  },
  mutations: {
  },
  actions: {
    async resetLastTime() {
      const res = reset({ account: process.env.ACCOUNT, password: process.env.PASSWORD })
      return res
    }
  }
}

export default feedback
