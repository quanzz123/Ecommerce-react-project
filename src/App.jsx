import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import AuthProvider from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>

      <div className="app">
        <NavBar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
 