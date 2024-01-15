// 网站布局
import { AuthContext } from '@/store'
import { Route, Routes } from 'react-router-dom'
import { routes } from '@/config'
import React, { useState, useContext } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
const { Header, Content, Sider } = Layout

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

const userRoutes = routes.filter(route => route.key.startsWith('AUTH'))

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { auth } = useContext(AuthContext)
  const { type } = auth

  const authRoutes = userRoutes.filter(menu => menu.authType?.includes(type))
  const items: MenuItem[] = authRoutes.map(menu => getItem(menu.key, menu.name))

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            {authRoutes.map(route => <Route key={route.key} path={`/auth${route.path}`} element={<route.component />} />)}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default UserLayout
