import {
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import ProtectedRoute from './Auth0/ProtectedRoute.js';
import AuthRedirect from './Auth0/authRedirect.js';
import UserContext from './context/user.context.js';
import ThemeProvider from './theme/index.js';
import ScrollToTop from './components/scroll-to-top/ScrollToTop.js';
import { StyledChart } from './components/chart/index.js';
import Home from './layouts/landingpage/Home.js';
import SignUp from './layouts/landingpage/SignUp.js';
import SignUpAuth from './layouts/landingpage/SignUpAuth.js';
// import Profile from './layouts/landingpage/modules/components/LogComponents/Profile'
import DashboardLayout from './layouts/dashboard/DashboardLayout.js';
import InfoUser from './components/User/InfoUser.js';
import ListUser from './components/Admin/UserList.js';
import NewCreate from './components/News/NewCreate.js';
import NewUpdate from './components/News/NewUpdate.js';
import BlogPage from './pages/BlogPage.js';
import BlogPageClientes from './pages/BlogPageClientes.js';
import NewDelete from './components/News/NewDelete.js';
import ScrappingGen from './components/Admin/ScrappingGen.js';
import ProductsPage from './pages/ProductsPage.js';
import ItemsBySupplierAdmin from './components/Reports/itemsBySupplierAdmin.js';

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
            <Route path = "noticiasAdmin" element = {<BlogPage/>}/>
            <Route path = "noticiasClientes" element = {<BlogPageClientes/>}/>
            <Route path = "actualizar" element = {<InfoUser />} />
            <Route path = "NewCreate" element = {<NewCreate />} />
            <Route path = "NewUpdate/:newId" element = {<NewUpdate/>}  />
            <Route path = "NewDelete/:newId" element = {<NewDelete/>}  />
            <Route path = "gestion_usuarios" element = {<ListUser/>} />
            <Route path = "scrapping-gen" element = {<ScrappingGen/>} />
            <Route path = "productPage" element = {<ProductsPage/>} />
            <Route path = "reports/itemsBySupplier" element = {<ItemsBySupplierAdmin/>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
