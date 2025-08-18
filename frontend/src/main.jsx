import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Randomizer from './pages/Randomizer'
import NoPage from './pages/NoPage'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import PrivateRoutes from './pages/PrivateRoutes'
import User from './pages/User'
import LayoutUser from './pages/LayoutUser'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutUser />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/user' element={<User />} />
          </Route></Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='rules' element={<Rules />} />
          <Route path='randomizer' element={<Randomizer />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<LogIn />} />
          <Route path='*' element={<NoPage />} />        
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
