import { useContext } from 'react'
import { AuthContext } from '@/store/auth'
const UserTest = () => {
  const { auth } = useContext(AuthContext)

  return (
    <div className="flex flex-col">
      这是用户界面，看到这说明你登陆了
      <div className="my-2">
        token:
        {auth.token}
      </div>
      <div className="my-2">
        email:
        {auth.email}
      </div>
      <div className="my-2">
        password:
        {auth.password}
      </div>
    </div>
  )
}

export default UserTest
