import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
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
import AddSim from './pages/sims/AddSim'
import EditSim from './pages/sims/EditSim'
import Sims from './pages/sims/Sims'
import Trees from './pages/tree/Trees'
import AddRelationship from './pages/relationship/AddRelationship'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LayoutUser />}>
                <Route element={<PrivateRoutes />}>
                  <Route path='/user/:username' element={<User />} />
                  <Route path='/user/:usernmae/sims' element={<Sims />} />
                  <Route path='/user/:username/add_sim' element={<AddSim />} />
                  <Route path='/user/:username/edit_sim' element={<EditSim />} />
                  <Route path='/user/:username/relationships/add_relationship' element={<AddRelationship />} />
                  <Route path='/user/:username/trees' element={<Trees />} />
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
      </PersistGate>
    </Provider>
  </StrictMode>,
)
