
import { Link as LinkNew } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Card, Button, Container, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Helmet } from 'react-helmet-async';


// @mui
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import NewCardUtil from '../components/News/NewCardUtil';

import { useExternalApi } from '../hooks/NewResponse';
// components
import Iconify from '../components/iconify';


// import { useNavigate } from 'react-router'
// import NewCreate from '../src/components/News/NewCreate'


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'recientes', label: 'Recientes' },
  { value: 'antiguas', label: 'Antiguas' },
];


// ----------------------------------------------------------------------
// python3 manage.py runserver 6060

// crear una funcion para mostrar la data obtenida de allNew useExternalApi


export default function BlogPage() {

  // eslint-disable-next-line
  const [new1, setNew1] = useState({})
  const [menuOption, setMenuOption] = useState('recientes')

  const { allNew } = useExternalApi()


  useEffect(() => {
    allNew(setNew1)
    // const aux = Object.values(new1)
    // setNew1(aux)

    // eslint-disable-next-line
  }, [])

  // if (JSON.stringify(new1) === '{}' ) return <div> Cargando <LinearProgress /> </div>
  // // console.log(JSON.stringify(new1))

    if (JSON.stringify(new1) === '{}' ) {
      // console.log('No users loaded yet :c')
      return(
        <>
          <Helmet>
            <title> Noticias </title>
          </Helmet>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h2" gutterBottom align = "center" >
                Cargando noticias
              </Typography>
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

  return (

    <>

      <Helmet>
        <title> Noticias </title>
      </Helmet>
      {/* {console.log(JSON.stringify(new1))} */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h2" gutterBottom align = "center" >
            Noticias
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} component={LinkNew} to={'/dashboard/NewCreate'}>
            Nueva noticia
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <TextField select size="small" value= {menuOption} onChange = {(e) => {setMenuOption(e.target.value)}}>
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <NewCardUtil new={new1} option = {menuOption} />
      </Container>
    </>
  );
  // nav = useNavigate()
}
