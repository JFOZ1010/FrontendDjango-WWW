import * as React from 'react';
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import AppForm from '../../layouts/landingpage/modules/views/AppForm';
import withRoot from '../../layouts/landingpage/modules/withRoot';

function InfoUser() {
  const { handleSubmit: registerSubmit, register: registro } = useForm()
  // const [sexo, setSexo] = useState('Otro');


  const onSubmit = data => {
    console.log(data)
  }

  const prueba = {
    'Name': 'Diego Norrea',
    'City': 'Cali',
    'BirthDate': '2000-01-01',
    'Sex': 'Masculino'
  }

  const sexo = [
    {
      value: 'Masculino',
      label: 'Masculino',
    },
    {
      value: 'Femenino',
      label: 'Femenino',
    },
    {
      value: 'Otro',
      label: 'Otro',
    },
  ]

  /* const handleChange = () => {
    setSexo()
  } */

  return (
      <>
        <AppForm >
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Mi perfil
          </Typography>
          <Typography variant="body2" align="center">
              Editar
          </Typography>
          <div>
            <form onSubmit = {registerSubmit(onSubmit)}>
            <TextField
                  label="Nombre"
                  defaultValue={prueba.Name}
                  {...registro('nombre', { required: true })}
                  inputProps={{
                    maxLength: 50
                  }}
                  sx={{ mx: 4, my: 2, width: '40ch' }}
              />
              <TextField
                  label="Ciudad"
                  defaultValue={prueba.City}
                  {...registro('ciudad', { required: true })}
                  inputProps={{
                    maxLength: 50
                  }}
                  sx={{ mx: 4, my: 2, width: '40ch' }}
              />
              <TextField
                  label="Fecha de nacimiento"
                  type="date"
                  defaultValue={prueba.BirthDate}
                  InputLabelProps={{ shrink: true }} 
                  {...registro('fecha', { required: true })}
                  inputProps={{
                    maxLength: 50
                  }}
                  sx={{ mx: 4, my: 2, width: '40ch' }}
              />
              <TextField
                  label="Sexo"
                  select
                  defaultValue={prueba.Sex}
                  {...registro('sexo', { required: true })}
                  sx={{ mx: 4, my: 2, width: '40ch' }}
              >
                {sexo.map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
                ))}
              </TextField>
            </form>
            <Button sx={{ mx: 9, my: 2, width: '40ch' }} variant='contained' onClick={registerSubmit(onSubmit)} >Actualizar</Button>
          </div>
        </AppForm>
      {/* <AppFooter /> */}
    </>
  );
}

export default withRoot(InfoUser);
