import * as React from 'react';
import { useEffect, useState } from 'react'
import Typography from '../../layouts/landingpage/modules/components/Typography';
import AppFormNew from '../../layouts/landingpage/modules/views/AppFormNew';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useExternalApi } from '../../hooks/NewResponse';
import NewBodyUtil from './NewBodyUtil';


export default function NewCreate(){
    const [noticia, setNoticia] = useState({});
    const [flag, setFlag] = useState(false)
    
    const {
        // updateNew,
        getNew
    } = useExternalApi();
    


    useEffect(() => {
      setFlag(true)
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      getNew(11,setNoticia)
      // eslint-disable-next-line
    },[flag])

    if (JSON.stringify(noticia) === '{}') return <div>Cargando</div>

    return (
        <>
        <AppFormNew>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Actualizar Noticia
          </Typography>
          <NewBodyUtil noticia = { noticia } />
         
        </AppFormNew>
      {/* <AppFooter /> */}
    </>
    )

}