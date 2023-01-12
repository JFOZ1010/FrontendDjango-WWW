import React from 'react'
import { Helmet } from 'react-helmet-async';

// mui
import { Container, Typography, Paper } from '@mui/material';

export default function ProductsNotReady() {
  return (
    <>
        <Helmet>
          <title> Dashboard: Items </title>
        </Helmet>
        <Container>
          <Typography variant="h2" sx={{ mb: 5 }}>
            Productos
          </Typography>
          <Paper
              sx={{
                textAlign: 'center',
              }}
              >
              <Typography variant="h6" paragraph>
                No encontrado
              </Typography>

              <Typography variant="body2">
                No hay productos disponibles
                <br /> Verifique que el admin haya scrapeado productos
              </Typography>
            </Paper>
        </Container>
      </>
  )
}
