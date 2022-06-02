import axios from 'axios'
import store from '@/store'
import { Promise } from 'core-js'
import router from '@/router'

const request = axios.create({
  // 接口基地址
  baseURL: 'http://edufront.lagounews.com'
  // baseURL: 'http://eduboss.lagounews.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  const { user } = store.state
  // 检测user是否存在
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 封装函数，用于跳转登录页
function RedirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 标记token刷新状态
let isRefreshing = false
// 存储刷新时等待的请求
// eslint-disable-next-line prefer-const
let requests = []

// 通过响应拦截器刷新 Token
request.interceptors.response.use(response => {
  return response
}, async (error) => {
// 存在相应内容，但是出错（401、404）
  if (error.response) {
    // 检测状态码是否为401
    if (error.response.status === 401) {
      // 检测是否存在用户的登陆信息
      if (!store.state.user) {
        RedirectLogin()
        // 如果不存在 ，结束即可
        return Promise.reject(error)
      }

      // 发送请求前检测，是否已经存在刷新 token 的请求了
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 指的是失败请求的配置对象
          requests(error.config)
        })
      }
      isRefreshing = true

      // 假如access_token错误,refresh_token是争取的。用refresh_token发送请求，请求新的access_token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
        // data:qs.stringify({data})
      })
      // 假如refresh_token也是错误的，此接口请求返回-1时
      if (data.state !== 1) {
        // 刷新token失败，清空store和本地存储
        store.commit('setUser', null)
        RedirectLogin()
        return Promise.reject(error)
      }
      // 假如refresh_token是正确的，发送请求成功，请求新的access_token
      store.commit('setUser', data.content)

      // 将 requests 中的所有请求重新发送
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return requests(error.config)
    }
  }
  return Promise.reject(error)
})

export default request
