/* eslint-disable global-require */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import LandingLogo from './img_aux/illustration_landing.png'; 

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function ProductHero() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
      <Container sx={{ mt: 15, display: 'flex', position: 'relative'}}>
        <Grid container spacing = {2}>
          <Grid item xs = {12} md = {6}>
            <Box sx = {item}>
              <Typography variant="h2" marked="left" gutterBottom color = 'secondary.light' sx={{ mt: 15, textAlign: 'center' }} >
                Scrapware
              </Typography>
              <Typography variant="h5" color = 'secondary.light' sx={{ my: 5 }}>
                {
                  'El mejor lugar para encontrar lo que tu necesitas'
                }
                {
                  ', ¡las mejores ofertas están esperando!'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs = {12} md = {6}>
            <Box sx = {item}>
              <Box  
                  component = 'img'
                  src = {LandingLogo}
                  alt = 'mainLanding'
                  sx = {{ height: 'auto', width: '200%'}}
                />
              </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
