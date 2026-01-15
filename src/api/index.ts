/** 
 * @Author: songshan
 * @Date: 2026-01-15 16:28:09
 * @LastEditTime: 2026-01-15 16:46:32
 * @Description: 接口汇总
 */
import http from '@/utils/request'

// 定义接口返回类型
export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
}

// 用户相关 API
export const userApi = {
  // 获取用户信息
  getUserInfo() {
    return http.get<UserInfo>('/api/base/open/captcha?height=45&width=150&color=%232c3142')
  }
}

