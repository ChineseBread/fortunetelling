// 用户登录相关
import { request } from '@/utils'
export interface IUserResponse {
  ok: boolean
  token: string
  role: string // admin / agent / finance
  msg?: string
}
export const login = (email: string, password: string): Promise<IUserResponse> => {
  return request('LOGIN', {
    reqOptions: {
      method: 'get',
      params: {
        email,
        password,
      },
    },
  })
}
