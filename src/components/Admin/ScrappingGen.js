import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/box';
import Paper from '@mui/material/paper';
import Stack from '@mui/material/stack'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import { useExternalApi } from '../../hooks/ItemsResponse';


export default function ScrappingGen() {

    const { ScrappingAmazon, ScrappingMercadolibre, ScrappingNewegg } = useExternalApi()
    const [ message, setMessage ] = useState({ 'message': 'Generar scrapping', 'res': 0})
    const [ visible, setVisible ] = useState(false)

    const onSubmit = async () => {
        setVisible(true)
        setMessage({ 'message': 'Scrappeando en Amazon...', 'res': 0});
        await ScrappingAmazon(setMessage)
        
        if (message.res === 0) {
            setTimeout( async () => {
                setMessage({ 'message': 'Scrappeando en Mercadolibre...', 'res': 0});
                await ScrappingMercadolibre(setMessage)
                
                if (message.res === 0) {
                    setTimeout( async () => {
                        setMessage({ 'message': 'Scrappeando en Newegg...', 'res': 0});
                        await ScrappingNewegg(setMessage)
                        
                        if (message.res === 0) {
                            setTimeout( () => {
                                setMessage({ 'message': 'El proceso ha finalizado', 'res': 0})
                                setVisible(false)
                            }, 2000)
                        } else {
                            setVisible(false)
                        }
                    }, 2000)
                } else {
                    setVisible(false)
                }
            }, 2000)
        } else {
            setVisible(false)
        }
    }


    return (
        <>  
            <Box textAlign='center' >
                <Typography variant="h2" align="center" >
                    Generación de Scrapping
                </Typography>
                <Box  display="flex" justifyContent="center" alignItems="center" mt = {2}>
                <Paper elevation={3} sx={{ width: 0.6 }} >
                    <Typography variant="body2" align="justify" p = {3} style={{whiteSpace: 'pre-line'}} >
                    En esta sección se realiza el proceso de scrapping en las páginas: Mercadolibre, Amazon y NewEgg.
                    Tenga en consideración que dicho proceso puede tener una duración mayor a 20 minutos dependiendo de la cantidad de datos obtenidos,
                    si el tiempo supera con creces este valor, es posible que haya ocurrido algún tipo de fallo dentro del proceso. <br/>
                    Los resultados de este proceso serán mostrados en el apartado de "Tienda".
                    </Typography>
                </Paper>
                </Box>
                <Button 
                sx={{ 
                    ml: { xs: 3, md: 4}, 
                    mr: { xs: 3, md: 4} , 
                    my: 2, 
                    ':hover' : { bgcolor: '#be2113', color:'white'}
                }} 
                variant='contained' 
                onClick={ () => {onSubmit() }}
                >
                    <Stack direction="row" alignItems="center" justifyContent = "center" >
                        { visible && <CircularProgress color="inherit" sx={{ marginRight: 2 }} /> }
                        <Typography variant="body1" align="center" >
                            {message.message}
                        </Typography>
                    </Stack>
                </Button>
                
                
            </Box>
        </>
    );
}

