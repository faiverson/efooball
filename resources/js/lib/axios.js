import axios from 'axios'

export default axios.create({
    baseURL: `/api`,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    withCredentials: true,
})
