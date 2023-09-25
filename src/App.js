import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import './App.scss'
import DefaultLayout from './components/layout/DefaultLayout'
const AdminLogin = React.lazy(() => import('./components/AdminLogin/AdminLogin'))
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<AdminLogin />} />
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter >
    </>
  )
}

export default App
