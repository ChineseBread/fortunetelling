import { AuthContext } from '@/store'
import { useContext } from 'react'
import { Form, Button, Input } from 'antd'
const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const [form] = Form.useForm()

  const doLogin = () => {

  }

  return (
    <div>
      <div className=''>
        <Form
          form={form}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入你的邮箱' }]}
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
            <Button type="primary" onClick={doLogin}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
