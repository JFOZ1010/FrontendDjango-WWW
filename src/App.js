// routes
import {

  Routes,
  Route
} from 'react-router-dom'

// theme #Kevin
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import Home from './layouts/landingpage/Home'
// import SignUp from './layouts/landingpage/SignUp'
import SignUp from './layouts/landingpage/SignUp'
import SignUpAuth from './layouts/landingpage/SignUpAuth'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import InfoUser from './components/User/InfoUser'
import UserPage from './pages/UserPage'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Routes>
        <Route path = "/" element = {<Home /> } /> 
        <Route path = "/dashboard" element = {<DashboardLayout/>}>
          <Route path = "registro" element = {<SignUp/>} />
          <Route path = "prueba" element = {<SignUpAuth/>} />
          <Route path = "actualizar" element = {<InfoUser />} />
          <Route path = "gestion_usuarios" element = {<UserPage/>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
