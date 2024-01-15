// 网站布局
import { AuthContext, IAuth } from '@/store'
import { Outlet, useNavigate } from 'react-router-dom'
import { routesConfig, storageKey, authName } from '@/config'
import React, { useState, useContext, useEffect } from 'react'
import { Layout, Menu, Button, MenuProps, Tag } from 'antd'
const { Header, Content, Sider } = Layout
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
import { getLocalStorage } from '@/utils'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const routes = Object.values(routesConfig) // 所有路由表

const userRoutes = routes.filter(route => route.key.startsWith('AUTH'))

const UserLayout = () => {
  const navigator = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { auth, setAuth } = useContext(AuthContext)
  const authRoutes = userRoutes.filter(menu => menu.authType?.includes(auth.type))
  const items: MenuItem[] = authRoutes.map(menu => getItem(menu.name, menu.key, <LineChartOutlined />))

  const onMenuChange = (options: {
    key: string
  }) => {
    const path = routesConfig[options.key].path
    navigator(path)
  }

  useEffect(() => {
    // 该组件不仅作为layout 也作为用户刷新页面获取用户登录态的路由守卫
    const authCheck = () => {
      const localAuth = getLocalStorage<IAuth>(storageKey.USER_INFO)
      if (!auth?.token && !localAuth?.token) {
        navigator('/')
        return
      }
      if (!auth?.token && localAuth?.token) setAuth(localAuth) // 这是一个待定的用户信息复制逻辑 有可能出现问题
    }
    authCheck()
  }, [])

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-8 bg-blue-900 m-4 rounded" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['AUTH_OVERVIEW']}
          items={items}
          onClick={onMenuChange}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Tag color="magenta">{ authName[auth.type] }</Tag>
        </Header>
        <Content
          className="my-6 mx-4 bg-white"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default UserLayout
