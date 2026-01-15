/**
 * @Author: songshan
 * @Date: 2026-01-15 16:19:53
 * @LastEditTime: 2026-01-15 16:40:00
 * @Description: 拦截器封装请求
 */
import Request from 'luch-request'
import { baseUrl, timeout } from '@/config'

const http = new Request({
  baseURL: baseUrl,
  timeout,
  header: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  custom: {
    auth: true
  }
})

// 设置 config.validateStatus 为 false 后，不会对 HTTP 状态码进行验证
http.config.validateStatus = (statusCode) => {
  return statusCode >= 200 && statusCode < 300
}

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    const token = uni.getStorageSync('token')
    if (token) {
      config.header = {
        ...config.header,
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const { data } = response

    // 根据后端返回的状态码进行处理
    if (data.code === 200 || data.code === 0 || data.code === 1000) {
      return data
    }

    // 处理业务错误
    uni.showToast({
      title: data.message || '请求失败',
      icon: 'none',
      duration: 2000
    })

    return Promise.reject(data)
  },
  (error) => {
    console.log('请求错误详情:', error)

    // 处理 HTTP 错误
    let message = '网络请求失败'

    if (error.statusCode) {
      switch (error.statusCode) {
        case 401:
          message = '未授权,请重新登录'
          // 可以在这里清除 token 并跳转到登录页
          uni.removeStorageSync('token')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址错误'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        default:
          message = `连接错误${error.statusCode}`
      }
    }
    else if (error.errMsg) {
      // 处理 uni.request 的错误
      if (error.errMsg.includes('timeout')) {
        message = '请求超时'
      }
      else if (error.errMsg.includes('fail')) {
        message = '网络连接失败'
      }
    }
    else {
      message = '连接服务器失败'
    }

    uni.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })

    return Promise.reject(error)
  }
)

export default http
