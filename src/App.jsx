import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { Home } from './pages/Home'
import { useState } from 'react'
import { UserMsg } from './cmps/UserMsg'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToyIndex } from './pages/ToyIndex'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <section className='main-app'>
              <AppHeader />
              <main className='container'>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/toy" element={<ToyIndex/>} />
                  </Routes>
              </main>
              <UserMsg />
      </section>
    </Router >

  )
}


