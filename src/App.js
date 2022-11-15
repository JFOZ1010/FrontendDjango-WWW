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
import SignUp from './layouts/landingpage/SignUp'


// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Routes>
        <Route path = "/" element = {<Home /> } /> 
        <Route path = "registro" element = {<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}
