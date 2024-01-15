import Login from '@/views/Login'
import { authType } from './auth'
import UserTest from '@/views/UserTest'

interface IRoute {
  key: string
  name: string
  path: string
  component: () => React.ReactNode
  authType?: string[]
  children?: IRoute[]
}

export const routes: IRoute[] = [
  {
    name: '登录',
    key: 'LOGIN',
    path: '/login',
    component: Login,
  },
  {
    name: '登录',
    key: 'LOGIN',
    path: '/',
    component: Login,
  },
  {
    name: '看板',
    key: 'AUTH_OVERVIEW',
    path: '/overview',
    component: UserTest,
    authType: [authType.ADMIN, authType.FINANCE, authType.AGENT],
  },
  {
    name: '广告列表',
    key: 'AUTH_ADVERTISEMENT',
    path: '/advertisement',
    component: UserTest,
    authType: [authType.ADMIN, authType.AGENT],
  },
  {
    name: '订单列表',
    key: 'AUTH_ORDER_LIST',
    path: '/order',
    component: UserTest,
    authType: [authType.AGENT, authType.ADMIN, authType.FINANCE],
  },
  {
    name: '财务列表',
    key: 'AUTH_FINANCE_LIST',
    path: '/finance',
    component: UserTest,
    authType: [authType.AGENT, authType.ADMIN, authType.FINANCE],
  },
  {
    name: '数据统计',
    key: 'AUTH_DATA',
    path: '/data',
    component: UserTest,
    authType: [authType.ADMIN, authType.FINANCE, authType.AGENT],
  },
]
