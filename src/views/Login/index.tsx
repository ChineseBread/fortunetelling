import { AuthContext } from '@/store'
import { useContext, useState } from 'react'
import { message, Form, Button, Input } from 'antd'
import { login } from '@/service'
import { authKey, storageKey } from '@/config'
import { useNavigate } from 'react-router-dom'
import { setLocalStorage } from '@/utils'

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigator = useNavigate()

  const doLogin = () => {
    form.validateFields().then((res: { email: string, password: string }) => {
      const { password, email } = res
      setLoading(true)
      login(email, password).then((res) => {
        // 登录成功 存储
        if (res.ok) {
          const { token, role } = res
          const contextValue = {
            email,
            token,
            password,
            type: role.toLocaleLowerCase() as authKey,
          }
          console.log('登陆成功!', contextValue)
          // context信息存储
          setAuth(contextValue)
          setLocalStorage(storageKey.USER_INFO, contextValue)
          // 跳转用户页面
          navigator('/auth/overview')
        }
        else {
          message.info(res.msg)
        }
      }).finally(() => {
        setLoading(false)
      })
    }).catch(() => {})
  }

  return (
    <div className="flex flex-row h-screen justify-around items-center bg-gradient-to-r from-sky-100 to-white">
      <Form
        form={form}
        className="w-96"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入你的邮箱',
            },
            {
              message: '邮箱格式错误', validator: (_, value) => {
                if (!value) return Promise.resolve()
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? Promise.resolve() : Promise.reject()
              } },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入你的密码' }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={doLogin} loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
