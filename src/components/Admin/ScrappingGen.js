import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/box';
import Stack from '@mui/material/stack'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import { useExternalApiItem } from '../../hooks/ItemsResponse';


export default function ScrappingGen() {

    const { ScrappingAmazon, ScrappingMercadolibre, ScrappingNewegg } = useExternalApiItem()
    const [ message, setMessage ] = useState({ 'message': '', 'res': 0})
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
                                setMessage({ 'message': 'Todos los datos fueron correctamente scrapeados', 'res': 0})
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
            <Box textAlign='center'>
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
                Generar Scrapping
                </Button>
                
                
            </Box>
            <Stack direction="row" alignItems="center" justifyContent = "center" >
                { visible && <CircularProgress /> }
                <Typography variant="body1" align="center" sx={{ marginLeft: 2 }}>
                    {message.message}
                </Typography>
            </Stack>
        </>
    );
}

