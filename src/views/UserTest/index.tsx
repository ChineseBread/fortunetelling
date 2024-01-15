import { useContext } from 'react'
import { AuthContext } from '@/store/auth'
const UserTest = () => {
  const { auth } = useContext(AuthContext)

  return (
    <div>
      这是用户界面，看到这说明你登陆了
      {auth.token}
      {auth.email}
      {auth.password}
    </div>
  )
}

export default UserTest
