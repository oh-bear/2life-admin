import axios from 'axios'

export function reset(data) {
  return axios({
    url: `${process.env.TWIN_API}admin/user/reset_last_times`,
    method: 'get',
    params: data
  })
}
