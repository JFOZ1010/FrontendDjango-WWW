import { Grid, Button, Typography } from '@mui/material';
import { Link as LinkNew } from 'react-router-dom'
// @mui
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

export default function NewCardUtil(news) {

    const newsCards = news.new.map((newI) =>

    <Grid item xs={4} key = {newI.new_id}>
        <Card sx={{ minWidth: 275, padding: "10px" }} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {newI.new_date}
                </Typography>
                <Typography variant="h5" component="div">
                    {newI.new_title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" component={LinkNew} to={`/dashboard/NewUpdate/${newI.new_id}`}>Actualizar</Button>
                <Button size="small" variant="contained" sx={{backgroundColor:"#FF0000", margin:'8px'}} >Borrar</Button>
            </CardActions>
        </Card>
    </Grid>

);
    console.log(news.new[0].new_date)

    return (
        <>
            <Grid container spacing={2}>
            {newsCards}
            </Grid>
        </>
    );
}