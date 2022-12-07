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
// import Profile from './layouts/landingpage/modules/components/LogComponents/Profile'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import InfoUser from './components/User/InfoUser'
import ListUser from './components/Admin/UserList'
import NewCreate from './components/News/NewCreate';
import NewUpdate from './components/News/NewUpdate';
import BlogPage from './pages/BlogPage';
import NewDelete from './components/News/NewDelete'

export default function App() {
  const [userType, setUserType] = useState('')
  // const { newId } = useParams();
  return (
    <UserContext.Provider value={[userType, setUserType]}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Routes>
          <Route path = "/" element = {<Home /> } /> 
          <Route path="/RegistroCliente" element={<AuthRedirect Component={SignUp} tipo='Cliente' />} />
          <Route path = "/dashboard" element = {<ProtectedRoute component={DashboardLayout} />}>
            {/* <Route path = "registro" element = {<SignUp/>} /> */}
            <Route path = "prueba" element = {<SignUpAuth/>} />
            <Route path = "actualizar" element = {<InfoUser />} />
            <Route path = "blog" element = {<BlogPage/>}/>
            <Route path = "actualizar" element = {<InfoUser />} />
            <Route path = "NewCreate" element = {<NewCreate />} />
            <Route path = "NewUpdate/:newId" element = {<NewUpdate/>}  />
            <Route path = "NewDelete/:newId" element = {<NewDelete/>}  />
            <Route path = "gestion_usuarios" element = {<ListUser/>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
