import * as React from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import AppFormNew from '../../layouts/landingpage/modules/views/AppFormNew';
import { useExternalApi } from '../../hooks/NewResponse';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function NewCreate() {
  const { handleSubmit: registerSubmit, register: registro } = useForm()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const nav = useNavigate()
  const [visible, setVisible] = useState(false)
  const [mensaje, setMensaje] = useState('Actualizar')


  const {
    createNew
  } = useExternalApi()

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    nav('/dashboard/noticiasAdmin')
  }

 // crear una function arrow llamada onSubmit, que valide la creacion de una noticia
const onSubmit = data => {
  console.log(data)
  setMensaje('Creando noticia')
  // data.new_description = convertToRaw(editorState.getCurrentContent())
  // data.new_description = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  // console.log("data descripcion", data.new_description)

  if(data.new_title.length <= 7){
    setMensaje('Faltan datos')
    setVisible(true)
    // return
  }else if(data.new_title.length > 25){
    setMensaje('Digite un titulo mas corto')
    setVisible(true)
    // return
  }else{
    console.log(editorState)
    data.new_description = convertToRaw(editorState.getCurrentContent())
    console.log(editorState)
    setMensaje('Noticia creada')
    createNew(data)
    setVisible(true)
  }
  setTimeout(() => {
  }, 2000)
 }

  // useEffect(() => {
  //     // console.log(convertToRaw(editorState.getCurrentContent()));
  //     // console.log(editorState)
  // }, [editorState]);

  return (
    <>
      <AppFormNew>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Crear Noticia
        </Typography>

        <div>
          <form onSubmit={registerSubmit(onSubmit)}>
            <TextField
              label="Titulo"
              {...registro('new_title', { required: true })}
              inputProps={{
                maxLength: 100
              }}
              sx={{ mx: 0, my: 2, width: '100%' }}
            />
            <div style={{ border: "1px solid black", padding: '2px', minHeight: '80%', minWidth: '80%' }}>
              <Editor editorStyle={{ minHeight: '400px' }} editorState={editorState} onEditorStateChange={setEditorState} />
            </div>

          </form>
          <Button sx={{ mx: 0, my: 2, width: '15%' }} variant='contained' onClick={registerSubmit(onSubmit)} >Subir</Button>
        </div>
      </AppFormNew>

      <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
        <DialogTitle>Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mensaje} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Volver al dashboard
          </Button>
        </DialogActions>
      </Dialog>
      {/* <AppFooter /> */}
    </>
  )

}