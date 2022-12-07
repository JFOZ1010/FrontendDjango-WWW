import * as React from 'react';
import Wave from 'react-wavify';
import Box from '@mui/material/Box';
// import ProductCategories from './modules/views/ProductCategories';
// import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductAllies from './modules/views/ProductAllies';
// import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

function Home() {
  return (
    <>
      <AppAppBar />
      <ProductHero />
      <Box component="section" sx={{ display: 'flex', background: 'linear-gradient(to right, #4b6cb7, #182848)', overflow: 'hidden' }} >
      <Wave fill = '#fff' paused = {false} options = {{ height: 80, amplitude: 40, speed: 0.20, points: 4}}/>
      </Box>
      <ProductValues />
      <ProductAllies />
      <Box component="section" sx={{ display: 'flex', background: '#fff', overflow: 'hidden' }} >
      <Wave fill = '#182848' paused = {false} options = {{ height: 80, amplitude: 40, speed: 0.20, points: 4}}/>
      </Box>
      <AppFooter />
    </>
  );
}

export default withRoot(Home);
