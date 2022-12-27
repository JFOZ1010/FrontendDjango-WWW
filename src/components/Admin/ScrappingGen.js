import * as React from 'react';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '../../layouts/landingpage/modules/components/Typography';
import { useExternalApiItem } from '../../hooks/ItemsResponse';

export default function ScrappingGen() {

    const { ScrappingAmazon } = useExternalApiItem()
    const [ message, setMessage ] = useState('')


    return (
        <>
            <Button 
            sx={{ 
                ml: { xs: 3, md: 4}, 
                mr: { xs: 3, md: 4} , 
                my: 2, 
                ':hover' : { bgcolor: '#be2113', color:'white'}
            }} 
            variant='contained' 
            onClick={ () => { ScrappingAmazon(setMessage) }}
            >
            Generar Scrapping
            </Button>

            <Typography variant="body1" align="center" sx={{ marginLeft: 6 }}>
                {message}
            </Typography>
        </>
    );
}

