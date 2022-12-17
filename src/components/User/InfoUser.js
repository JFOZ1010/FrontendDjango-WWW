import * as React from 'react';
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import AppForm from '../../layouts/landingpage/modules/views/AppForm';
// import withRoot from '../../layouts/landingpage/modules/withRoot';
import { useExternalApi } from '../../hooks/UserResponse';

function InfoUser() {
  const { handleSubmit: registerSubmit, register: registro } = useForm()
  
  const { user, isLoading } = useAuth0()
  const [user1, setUser1] = useState({})
  const [mensaje, setMensaje] = useState('Actualizar')

  const { getUser, updateUser } = useExternalApi()

  const tipo = window.localStorage.getItem('tipo');

  const onSubmit = data => {
    console.log(data)
    setMensaje('Actualizando...')
    if (tipo.localeCompare('Cliente') === 0) {
      updateUser(data, user.sub, 3, setMensaje)
    }else if (tipo.localeCompare('Admin') === 0) {
      updateUser(data, user.sub, 1, setMensaje)
    } else {
      console.log("Hay problemas")
    }
    setTimeout(() => {
    }, 2000)
  }

  const sexo = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
    { value: 'Otro', label: 'Otro' },
  ]

  useEffect(() => {
    getUser(user.sub, setUser1)
    // eslint-disable-next-line
  }, [])

  if (JSON.stringify(user1) === '{}' && !isLoading ) return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  )
  
  return (
      <>
        <AppForm >
          <Typography variant="h2" gutterBottom marked="center" align="center" sx={{ marginLeft: 6 }}>
            Mi perfil
          </Typography>
          <Typography variant="body1" align="center" sx={{ marginLeft: 6 }}>
              Modifique su información
          </Typography>
            <form onSubmit = {registerSubmit(onSubmit)}>
              <TextField
                label="Nombre"
                defaultValue={user1.name}
                {...registro('nombre', { required: true })}
                inputProps={{
                  maxLength: 100
                }}
                fullWidth 
                sx={{ mx: 3, my: 2 }}
              />
              <TextField
                label="Ciudad"
                defaultValue={user1.city}
                {...registro('ciudad', { required: true })}
                inputProps={{
                  maxLength: 50
                }}
                fullWidth
                sx={{ mx: 3, my: 2 }}
              />
              <TextField
                label="Fecha de nacimiento"
                type="date"
                defaultValue={user1.birth_date}
                InputLabelProps={{ shrink: true }} 
                {...registro('fecha', { required: true })}
                inputProps={{
                  maxLength: 50
                }}
                fullWidth
                sx={{ mx: 3, my: 2}}
              />
              <TextField
                label="Sexo"
                select
                defaultValue={user1.sex}
                {...registro('sexo', { required: true })}
                fullWidth
                sx={{ mx: 3, my: 2}}
              >
                {sexo.map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                  ))
                }
              </TextField>
            </form>
            <Button 
              sx={{ 
                ml: { xs: 3, md: 4}, 
                mr: { xs: 3, md: 4} , 
                my: 2, 
                ':hover' : { bgcolor: '#155FA8', color:'white'}
              }} 
              fullWidth 
              variant='contained' 
              onClick={registerSubmit(onSubmit)}
            >
              {mensaje}
            </Button>
        </AppForm>
      </>
  );
}

export default InfoUser;
