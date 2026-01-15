/**
 * @Author: songshan
 * @Date: 2026-01-15 16:32:52
 * @LastEditTime: 2026-01-15 16:50:00
 * @Description: 配置文件
 */

// 基础地址
export const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://192.168.50.29:8001'
  : 'https://xxxx.xxxx.xxxx'

// 不需要鉴权的路径
export const UNNEEDAUTHPATH = ['/login/index', '/index/index', '/guide/index']

// 请求超时时间
export const timeout = 30000
