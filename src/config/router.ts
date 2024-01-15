// import Login from '@/views/Login'
import { authType } from './auth'
import UserTest from '@/views/UserTest'

interface IRoute {
  key: string
  name: string
  path: string
  component: () => React.ReactNode
  authType?: string[]
}

export const routesConfig: { [key: string]: IRoute } = {
  AUTH_OVERVIEW: {
    name: '看板',
    key: 'AUTH_OVERVIEW',
    path: '/auth/overview',
    component: UserTest,
    authType: [authType.ADMIN, authType.FINANCE, authType.AGENT],
  },
  AUTH_ADVERTISEMENT: {
    name: '广告列表',
    key: 'AUTH_ADVERTISEMENT',
    path: '/auth/advertisement',
    component: UserTest,
    authType: [authType.ADMIN, authType.AGENT],
  },
  AUTH_ORDER_LIST: {
    name: '订单列表',
    key: 'AUTH_ORDER_LIST',
    path: '/auth/order',
    component: UserTest,
    authType: [authType.AGENT, authType.ADMIN, authType.FINANCE],
  },
  AUTH_FINANCE_LIST: {
    name: '财务列表',
    key: 'AUTH_FINANCE_LIST',
    path: '/auth/finance',
    component: UserTest,
    authType: [authType.AGENT, authType.ADMIN, authType.FINANCE],
  },
  AUTH_DATA: {
    name: '数据统计',
    key: 'AUTH_DATA',
    path: '/auth/data',
    component: UserTest,
    authType: [authType.ADMIN, authType.FINANCE, authType.AGENT],
  },
}
// {
//   name: '登录',
//   key: 'LOGIN',
//   path: '/login',
//   component: Login,
// },
// {
//   name: '登录',
//   key: 'LOGIN',
//   path: '/',
//   component: Login,
// },
