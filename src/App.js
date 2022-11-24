import {

  Routes,
  Route,
} from 'react-router-dom'
import { useState } from 'react'
import ProtectedRoute from './Auth0/ProtectedRoute'
import AuthRedirect from './Auth0/authRedirect'
import UserContext from './context/user.context'
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import Home from './layouts/landingpage/Home'
import SignUp from './layouts/landingpage/SignUp'
import SignUpAuth from './layouts/landingpage/SignUpAuth'
import Profile from './layouts/landingpage/modules/components/LogComponents/Profile'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import InfoUser from './components/User/InfoUser'



// ----------------------------------------------------------------------

export default function App() {
  const [userType, setUserType] = useState('')
  return (
    <UserContext.Provider value={[userType, setUserType]}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Routes>
          <Route path = "/" element = {<Home /> } /> 
          <Route path = "/dashboard" element = {<ProtectedRoute component={DashboardLayout} />}>
            <Route path = "registro" element = {<SignUp/>} />
            <Route path = "prueba" element = {<SignUpAuth/>} />
            <Route path = "actualizar" element = {<InfoUser />} />
            <Route path="RegistroAdmin" element={<AuthRedirect Component={Profile} tipo='Admin' />} />
            <Route path="RegistroCliente" element={<AuthRedirect Component={Profile} tipo='Cliente' />} />
            <Route path="RegistroSupplier" element={<AuthRedirect Component={Profile} tipo='Supplier' />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
