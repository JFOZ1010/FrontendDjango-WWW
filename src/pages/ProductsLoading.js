/*
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { PropTypes } from 'prop-types';
// mui
import { Container, Typography, Button, Stack, LinearProgress, Card } from '@mui/material';

import Iconify from '../components/iconify';

ProductLoading.propTypes = {
    status: PropTypes.string.isRequired,
}; 

export default function ProductLoading({status, ...other}) {
    return(
      <>
        <Helmet>
          <title> Lista de Items</title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h2" gutterBottom align = "center" >
              Cargando Items
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:clock-outline" />}>
              {status}
            </Button>
          </Stack>
          <Card>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <LinearProgress color = "secondary" />
            </Stack>
          </Card>
        </Container>
      </>
    )
}
*/