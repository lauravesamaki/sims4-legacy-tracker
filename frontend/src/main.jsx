import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from '@emotion/react'
import { theme } from './components/Theme'
import './scss/styles.scss'
import './localization/i18n'
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
import AddSim from './pages/AddSim'
import Sims from './pages/Sims'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutUser />}>
            <Route element={<PrivateRoutes />}>
              <Route path='/user/:username' element={<User />} />
              <Route path='/user/:usernmae/sims' element={<Sims />} />
              <Route path='/user/:username/add_sim' element={<AddSim />} />
            </Route>
          </Route>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='rules' element={<Rules />} />
            <Route path='randomizer' element={<Randomizer />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<LogIn />} />     
          </Route>
          <Route path='*' element={<NoPage />} />   
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
