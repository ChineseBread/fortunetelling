import { apiKey, apiConfig, storageKey } from '@/config'
import axios, { type AxiosRequestConfig } from 'axios'
const BASE_URL = import.meta.env.API_KEY as string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertToCamelCase)
  }
  else if (typeof obj === 'object' && obj !== null) {
    const result: { [key: string]: unknown } = {}
    for (const [key, value] of Object.entries(obj)) {
      let camelCaseKey = key.replace(/_(.)/g, (_, char) => char.toUpperCase())
      const firstChar = camelCaseKey.charAt(0)
      if (key.charAt(0) === key.charAt(0).toUpperCase()) {
        camelCaseKey = firstChar.toLowerCase() + camelCaseKey.slice(1)
      }
      result[camelCaseKey] = convertToCamelCase(value)
    }
    return result
  }
  return obj
}

interface IRequestOptions {
  reqOptions?: AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preHandle?: (data: unknown) => any
}

const http = axios.create({
  baseURL: BASE_URL,
})

// 用户请求时拦截
http.interceptors.request.use((config) => {
  // 拿token
  const { token } = JSON.parse(localStorage.getItem(storageKey.Auth) || '{}')
  if (!token) return config
  const method = config.method
  if (method === 'post') {
    config.data = {
      ...config?.data,
      token,
    }
  }
  else {
    config.params = {
      ...config?.params,
      token,
    }
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    return response
  },
  (error) => {
    // 对响应错误进行处理
    if (error.response && error.response.status === 401) {
      // 当接口返回状态码为 401 时，执行跳转到登录页的操作
      console.log('Unauthorized request')
      // 执行跳转到登录页的操作
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export const request = async (key: apiKey, options: IRequestOptions) => {
  const { reqOptions, preHandle } = options
  const result = await http({
    url: apiConfig[key],
    ...reqOptions,
  })
  return preHandle ? preHandle(convertToCamelCase(result)) : convertToCamelCase(result)
}
