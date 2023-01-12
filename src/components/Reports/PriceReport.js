import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import {
    Card,
    Button,
    Container,
    Typography,
    LinearProgress,
    Stack,
    Grid,
    Paper
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, Tooltip, Legend, PointElement, LinearScale, LineElement } from 'chart.js'
import ReportProblemSharpIcon from '@mui/icons-material/ReportProblemSharp';
import { useExternalApi } from '../../hooks/reportsResponse';
import Iconify from '../iconify';


ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement)



export default function PriceReport() {

    const navigate = useNavigate()

    const [report, setReport] = useState(undefined)
    const [isLoading, setLoading] = useState('Cargando informacion...')

    const location = useLocation();
    const itemId = location.pathname.split('/')[4]

    const date = location.pathname.split('/')[5]
    console.log(date)
    const price = location.pathname.split('/')[6]

    const {
        itemPriceReport
    } = useExternalApi()
    // const [datos, setDatos] = useState({})

    useEffect(() => {
        itemPriceReport(setReport, itemId)
            .then(() => {
                setLoading('Lista de productos')
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    console.log(report)
    let data
    if (report !== undefined) {
        console.log(report)

        const dates = report.map(history =>
            history.history_id.item_date
        )

        const prices = report.map(history =>
            history.history_id.item_price
        )
        dates.push(date)
        prices.push(price)

        data = {
            labels: dates,
            datasets: [{
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.35,
                fill: false,
            }]
        }

    }



    const options = {
        responsive: true
    }

    if (report === undefined || data === undefined) {
        // console.log('No users loaded yet :c')
        return (
            <>
                <Helmet>
                    <title> Gestión de usuarios</title>
                </Helmet>
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h2" gutterBottom align="center" >
                            Cargando reporte
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
    if (report.length === 0) {
        return (
            <>
                <Helmet>
                    <title> Gestión de usuarios</title>
                </Helmet>
                <Container>
                    <Stack spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center" mb={5}>
                        <Typography variant="h2" gutterBottom align="center" >
                            Este producto no tiene cambios en el precio
                        </Typography>

                    </Stack>
                    <Stack spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center" mb={10}>
                        <ReportProblemSharpIcon sx={{ fontSize: "1000%" }} />
                    </Stack>
                    <Stack spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center" mb={10}>
                        <Button variant="contained" onClick={() => { navigate(`../reportByProduct`) }}>Volver</Button>
                    </Stack>
                </Container>
            </>
        )

    }

    return (
        <>
            <Paper width='100%' elevation={2} sx={{ padding: 6 }} >
                <Grid container spacing={4} justifyContent="center" alignItems="center">

                    <Container sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
                        <Line data={data} options={options} />
                    </Container>

                </Grid>
                <Stack spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center" mb={0}>
                        <Button variant="contained" onClick={() => { navigate(`../reportByProduct`) }}>Volver</Button>
                    </Stack>
            </Paper>
        </>
    );
}