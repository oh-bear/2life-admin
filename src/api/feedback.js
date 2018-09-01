import axios from 'axios'

export function getIssues() {
  return axios({
    url: `${process.env.GITHUB_API}oh-bear/2life/issues`,
    method: 'get'
  })
}

export function getComments(url) {
  return axios({ url })
}

export function closeIssue(obj) {
  return axios.patch(`${process.env.GITHUB_API}oh-bear/2life/issues/${obj.number}`, obj.data)
}
