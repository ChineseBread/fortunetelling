// 用户权限透传
import React, { PropsWithChildren, useState } from 'react'
import { authKey } from '@/config'

export interface IAuth {
  email: string
  password: string
  type: authKey
  token?: string
}

const AuthContext = React.createContext<{
  auth: IAuth
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}>({
  auth: {
    email: '',
    password: '',
    type: 'VISITOR',
  },
  setAuth: () => {},
})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<IAuth>({
    email: '',
    password: '',
    type: 'VISITOR',
  })

  const contextValue = {
    auth,
    setAuth,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export { AuthContext }
