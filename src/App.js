import {
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import ProtectedRoute from './Auth0/ProtectedRoute';
import AuthRedirect from './Auth0/authRedirect';
import UserContext from './context/user.context';
import ThemeProvider from './theme/index';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { StyledChart } from './components/chart/index';
import Home from './layouts/landingpage/Home';
import SignUp from './layouts/landingpage/SignUp';
import SignUpAuth from './layouts/landingpage/SignUpAuth';
// import Profile from './layouts/landingpage/modules/components/LogComponents/Profile'

import DashboardLayout from './layouts/dashboard/DashboardLayout'
import InfoUser from './components/User/InfoUser'
import ListUser from './components/Admin/UserList'
import NewCreate from './components/News/NewCreate';
import NewUpdate from './components/News/NewUpdate';
import BlogPage from './pages/BlogPage';
import BlogPageClientes from './pages/BlogPageClientes';
import NewDelete from './components/News/NewDelete';
import ScrappingGen from './components/Admin/ScrappingGen';
import ProductsPage from './pages/ProductsPage'
import ItemByCat from './components/Reports/ItemByCat'
import ReportByProduct from './components/Admin/ReportByProduct'
import PriceReport from './components/Reports/PriceReport'
import ItemsBySupplierAdmin from './components/Reports/itemsBySupplierAdmin';

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
            <Route path = "reports/itembycat" element = {<ItemByCat />} />
            <Route path = "reports/itemsBySupplier" element = {<ItemsBySupplierAdmin/>} />
            <Route path = "reportByProduct" element = {<ReportByProduct/>} />
            <Route path = "reportByProduct/reportPrice/:productId/:date/:price" element = {<PriceReport/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
