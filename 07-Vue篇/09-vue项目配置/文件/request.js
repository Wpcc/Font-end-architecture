// 监控请求、轨迹回放请求封装
// map组件请求封装

import axios from 'axios'
import { Message } from 'element-ui'

const request2 = axios.create({
  baseURL: process.env.NODE_ENV === 'dev' ? '/' : process.env.VUE_APP_PROXY_CARINFO,
  withCredentials: true,
  timeout: 60000
})

request2.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request2.interceptors.response.use(
  response => {
    if (response.data.code === 1) { // 接口异常
      const msg = response.data.msg
      Message({
        message: msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response.data
  },
  error => {
    const api = ['/map/baseData/getEnumList/deviceType', '/map/baseData/getEnumList/division',
      '/map/baseData/getEnumList/equipmentColour', '/map/baseData/getEnumList/equipmentType'] // 跳过报警的接口
    const url = error.config.url

    if (api.indexOf(url) === -1) { // 不是上面api里的接口才能走报警
      if (error && error.response) {
        switch (error.response.status) {
          case 400: error.message = '请求错误(400)'
            break
          case 401: error.message = '未授权，请重新登录(401)'
            break
          case 403: error.message = '拒绝访问(403)'
            break
          case 404: error.message = '请求出错(404)'
            break
          case 408: error.message = '请求超时(408)'
            break
          case 500: error.message = '服务器错误(500)'
            break
          case 501: error.message = '服务未实现(501)'
            break
          case 502: error.message = '网络错误(502)'
            break
          case 503: error.message = '服务不可用(503)'
            break
          case 504: error.message = '网络超时(504)'
            break
          case 505: error.message = 'HTTP版本不受支持(505)'
            break
          default: error.message = `连接出错(${error.response.status})!`
        }
        Message({
          message: error.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        error.message = '连接服务器失败!'
        Message({
          message: error.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default request2
