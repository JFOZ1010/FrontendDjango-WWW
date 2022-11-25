// routes
import {

  Routes,
  Route
} from 'react-router-dom'

// import Router from './routes';
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
import NewCreate from './components/News/NewCreate';
import NewUpdate from './components/News/NewUpdate';
import BlogPage from './pages/BlogPage';



// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Routes>
        <Route path = "/" element = {<Home /> } /> 
        <Route path = "/dashboard" element = {<DashboardLayout/>}>
          <Route path = "blog" element = {<BlogPage/>}/>
          <Route path = "registro" element = {<SignUp/>} />
          <Route path = "prueba" element = {<SignUpAuth/>} />
          <Route path = "actualizar" element = {<InfoUser />} />
          <Route path = "NewCreate" element = {<NewCreate />} />
          <Route path = "NewUpdate" element = {<NewUpdate />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
