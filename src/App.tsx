import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './store/auth'
import Login from './views/Login'
import UserLayout from './components/UserLayout'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<UserLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
