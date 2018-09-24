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

export function reply(data) {
  return axios.post(`${process.env.TWIN_API}admin/reply`, data)
}

export function commitComment(obj) {
  return axios({
    method: 'post',
    url: `${process.env.GITHUB_API}oh-bear/2life/issues/${obj.number}/comments`,
    headers: {
      'Accept': 'application/vnd.github.squirrel-girl-preview+json',
      'Authorization': process.env.ACCESS_TOKEN
    },
    data: {
      body: obj.content
    }
  })
}

export function closeIssue(obj) {
  return axios.patch(`${process.env.GITHUB_API}oh-bear/2life/issues/${obj.number}`, obj.data)
}
