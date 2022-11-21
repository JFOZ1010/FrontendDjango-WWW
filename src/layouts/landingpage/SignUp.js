import * as React from 'react';
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from './modules/components/Typography';
import AppForm from './modules/views/AppForm';
import withRoot from './modules/withRoot';

function SignUp() {
  const { handleSubmit: registerSubmit, register: registro } = useForm()
  // const [sexo, setSexo] = useState('Otro');


  const onSubmit = data => {
    console.log(data)
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
            Registrarse
          </Typography>
          <Typography variant="body2" align="center">
              ScrapWare
          </Typography>
          <div>
            <form onSubmit = {registerSubmit(onSubmit)}>
            <TextField
                  label="Nombre"
                  {...registro('nombre', { required: true })}
                  inputProps={{
                    maxLength: 50
                  }}
                  sx={{ mx: 4, my: 2, width: '40ch' }}
              />
              <TextField
                  label="Ciudad"
                  {...registro('ciudad', { required: true })}
                  inputProps={{
                    maxLength: 50
                  }}
                  sx={{ mx: 4, my: 2, width: '40ch' }}
              />
              <TextField
                  label="Fecha de nacimiento"
                  type="date"
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
                  defaultValue = {''}
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
            <Button sx={{ mx: 9, my: 2, width: '40ch' }} variant='contained' onClick={registerSubmit(onSubmit)} >Registrarse</Button>
          </div>
        </AppForm>
      {/* <AppFooter /> */}
    </>
  );
}

export default withRoot(SignUp);
