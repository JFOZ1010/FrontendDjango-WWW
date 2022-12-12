import { useEffect, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Helmet } from 'react-helmet-async';


// @mui
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import NewCardUtilCliente from '../components/News/NewCardUtilCliente';

import { useExternalApi } from '../hooks/NewResponse';
// components


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

  if (JSON.stringify(new1) === '{}' ) return <div> Cargando <LinearProgress /> </div>
  // console.log(JSON.stringify(new1))

  return (

    <>

      <Helmet>
        <title> Noticia </title>
      </Helmet>
      {/* {console.log(JSON.stringify(new1))} */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Noticias
          </Typography>
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
        <NewCardUtilCliente new={new1} option = {menuOption} />
      </Container>
    </>
  );
  // nav = useNavigate()
}
