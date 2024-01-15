import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './store/auth'
import Login from './views/Login'
import UserLayout from './components/UserLayout'
import { routesConfig } from '@/config'
const routes = Object.values(routesConfig) // 所有路由表

const userRoutes = routes.filter(route => route.key.startsWith('AUTH'))
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<UserLayout />}>
            {userRoutes.map(route => <Route key={route.key} path={route.path} element={<route.component />} />)}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
