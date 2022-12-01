import { useLocation, Link as LinkNew } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react'
import { Button, Grid} from '@mui/material';
// import WestIcon from '@mui/icons-material/West';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useExternalApi } from '../../hooks/NewResponse';





export default function NewDelete() {
    const [response, setResponse] = useState({});
    const [flag, setFlag] = useState(false)
    const location = useLocation();
    const id = location.pathname.split('/')

    const {
        // updateNew,
        deleteNew
    } = useExternalApi();



    useEffect(() => {
        setFlag(true)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        deleteNew(id[3], setResponse)
        console.log(response)
        // eslint-disable-next-line
    }, [flag])

    return (
        <>


            <Grid container spacing={4}>
            <Grid item xs={2}> </Grid>
            <Grid item xs={4}>
                <Typography variant="h5" component="div">
                    New deleted succesfully
                </Typography>
                <Button variant="contained" component={LinkNew} to={'/dashboard/blog'}>
                    Volver
                </Button>

            </Grid>
            <Grid item xs={4}> </Grid>

            </Grid>



        </>
    )

}