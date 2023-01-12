import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, Paper }  from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie} from 'react-chartjs-2';
import { useExternalApi } from '../../hooks/reportsResponse';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ItemByCat() {

    const [cat, setCat] = useState('')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const { getItemByCat } = useExternalApi()

    const handleChange = (event) => {
        setCat(event.target.value);
    };

    useEffect(() => {
        if (cat !== '') {
            getItemByCat(cat, setData)
            setLoading(true)
            setLoading2(true)
        }
        // eslint-disable-next-line
    }, [cat])
    let datos = {}

    useEffect(() => {
        if (JSON.stringify(data) !== '{}') {
            if (data === 0) {
                setLoading2(false)
            } else {
                setLoading(false)
            }
        }
    }, [data])

    if (JSON.stringify(data) !== '{}') {

        const nombres = data.map( item => item.item_name.substring(0, 80).concat('...'))
        const clics = data.map( item => item.item_clic)
        // eslint-disable-next-line
        datos = {
                labels: nombres,
                datasets: [
                {
                    label: '# de clics',
                    data: clics,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
                ],
            }
    }

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" >
                <FormControl sx = {{ minWidth: 200}}>
                    <InputLabel id="select-cat-labelid">Categoría</InputLabel>
                    <Select
                    labelId="select-cat-labelid"
                    id="select-cat-id"
                    value={cat}
                    label="Categoría"
                    onChange={handleChange}
                    >
                        <MenuItem value={1}>Procesadores</MenuItem>
                        <MenuItem value={2}>Rams</MenuItem>
                        <MenuItem value={3}>Tarjetas de video</MenuItem>
                        <MenuItem value={4}>Discos SSD</MenuItem>
                    </Select>
                </FormControl>
                
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" mt = {4}>
                <Paper elevation={5} sx={{ width: 0.5}} >
                    {!loading && <Box sx = {{p: 3}}><Pie data={datos}
                    height="600px"
                    width="400px"
                    options={{ maintainAspectRatio: false }}
                    /></Box>}
                    {!loading2 && <p>No se encontro datos</p>}
                </Paper>
            </Box>
            
        </>
    );
}

