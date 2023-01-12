import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Button,
    Container,
    Typography,
    LinearProgress,
    Stack,
} from '@mui/material';
// components
import { useExternalApi } from '../../hooks/ItemsResponse';
import ReportByProdcutTable from './ReportByProductTable'

import Iconify from '../iconify';




export default function UserPage() {

    const [isLoading, setLoading] = useState('Cargando informacion...')

    const [itemList, setListaItems] = useState(undefined);

    const {
        allItems
    } = useExternalApi()

    useEffect(() => {
        allItems(setListaItems)
            .then(() => {
                setLoading('Lista de productos')
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (itemList === undefined) {
        // console.log('No users loaded yet :c')
        return (
            <>
                <Helmet>
                    <title> Gestión de usuarios</title>
                </Helmet>
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h2" gutterBottom align="center" >
                            Cargando productos
                        </Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:clock-outline" />}>
                            {isLoading}
                        </Button>
                    </Stack>
                    <Card>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <LinearProgress color="secondary" />
                        </Stack>
                    </Card>
                </Container>
            </>
        )
    }
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h2" gutterBottom align="center" >
                        Lista de productos
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:layers-outline" />}>
                        {isLoading}
                    </Button>
                </Stack>
            </Container>
            <ReportByProdcutTable ITEMLIST={itemList} />
        </>

    );
}
