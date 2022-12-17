import * as React from 'react';
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useExternalApi } from '../../hooks/NewResponse';


export default function NewBodyUtil(noticia) {
    const { handleSubmit: registerSubmit, register: registro } = useForm();
    const [titulo, setTitulo] = useState(noticia.noticia.new_title)
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(noticia.noticia.new_description))));
    const [visible, setVisible] = useState(false)

    const handleClose = (event, reason) => {
        if (reason && reason === 'backdropClick') {
          return
        }
        setVisible(false)
      }

    const {
        updateNew
    } = useExternalApi();

    const onSubmit = data => {
        data.new_description = convertToRaw(editorState.getCurrentContent())
        console.log(data)
        updateNew(data, noticia.noticia.new_id)
        setVisible(true)
    }


    return (

        <>

            <div>
                <form onSubmit={registerSubmit(onSubmit)}>
                    <TextField
                        label="Titulo"
                        defaultValue={titulo}
                        onChange={(e) => { setTitulo(e.target.value) }}
                        {...registro('new_title', { required: true })}
                        inputProps={{
                            maxLength: 25
                        }}
                        sx={{ mx: 0, my: 2, width: '100%' }}
                    />
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '80%', minWidth: '80%' }}>
                        <Editor editorStyle={{ minHeight: '400px' }}
                            editorState={editorState}
                            onEditorStateChange={setEditorState} />
                    </div>

                </form>
                <Button sx={{ mx: 0, my: 2, width: '15%' }} variant='contained' onClick={registerSubmit(onSubmit)}  >Subir</Button>
            </div>

            <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
                <DialogTitle>Alerta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Noticia Actualizada
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>


        </>

    )
}