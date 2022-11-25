import * as React from 'react';
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw,convertFromRaw} from 'draft-js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { useExternalApi } from '../../hooks/NewResponse';


export default function NewBodyUtil(noticia) {
    const { handleSubmit: registerSubmit, register: registro } = useForm();
    const [titulo, setTitulo] = useState(noticia.noticia.new_title)
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(noticia.noticia.new_description))));

    // const {
    //     updateNew,
    // } = useExternalApi();

    const onSubmit = data => {
        data.new_description = convertToRaw(editorState.getCurrentContent())
        console.log(data)
        // createNew(data)
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
                            maxLength: 100
                        }}
                        sx={{ mx: 0, my: 2, width: '100%' }}
                    />
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '80%', minWidth: '80%' }}>
                        <Editor editorStyle={{ minHeight: '400px' }}
                            editorState={editorState}
                            onEditorStateChange={setEditorState} />
                    </div>

                </form>
                <Button sx={{ mx: 0, my: 2, width: '15%' }} variant='contained' onClick={onSubmit}  >Subir</Button>
            </div>


        </>

    )
}