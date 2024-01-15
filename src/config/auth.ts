// 权限配置

export type authKey = keyof typeof authType

export const authType = {
  ADMIN: 'admin',
  AGENT: 'agent',
  FINANCE: 'finance',
  VISITOR: 'visitor', // 此指代没有登录
}

export const authName = {
  [authType.ADMIN]: '管理员',
  [authType.AGENT]: '代理',
  [authType.FINANCE]: '财务',
  [authType.VISITOR]: '游客',
}
