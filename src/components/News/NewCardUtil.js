import {
    Link as LinkNew,
  } from 'react-router-dom'
import { Grid, Button, Typography } from '@mui/material';
// @mui
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from 'draft-js';

export default function NewCardUtil(props) {
    // eslint-disable-next-line
    if (props.option === 'recientes'){
        // eslint-disable-next-line
        const noticias = props.new.sort(
            (A,B) => Number( new Date(B.new_date) ) - Number( new Date(A.new_date) )
        )
    }
    // eslint-disable-next-line
    if (props.option === 'antiguas'){
        // eslint-disable-next-line
        const noticias = props.new.sort(
            (A,B) => Number( new Date(A.new_date) ) - Number( new Date(B.new_date) )
        )
    }

    const extracImage = (htmlText) => {
        let result = ''
        if (htmlText.match(/https:([\w\W]+?).jpg/g) != null) {
            result = htmlText.match(/https:([\w\W]+?).jpg/g)[0]
        }
        console.log(result)
        return <CardMedia
            component="img"
            height="140"
            image={result}

        />
    }

    // eslint-disable-next-line
    const newsCards = props.new.map((newI) =>

        <Grid item xs={4} key={newI.new_id}>
            <Card sx={{ minWidth: 275, padding: "10px" }} >
                 {extracImage(stateToHTML(convertFromRaw(JSON.parse(newI.new_description))))}
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {newI.new_date}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {newI.new_title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" 
                    variant="contained" 
                    component={LinkNew} 
                    to={`/dashboard/NewUpdate/${newI.new_id}`}>Actualizar</Button>
                    <Button size="small" 
                    variant="contained" 
                    sx={{ backgroundColor: "#FF0000", margin: '8px' }} 
                    component={LinkNew} to={`/dashboard/NewDelete/${newI.new_id}`}>Borrar</Button>
                </CardActions>
            </Card>
        </Grid>

    );

    return (
        <>
            <Grid container spacing={2}>
                {newsCards}
            </Grid>
        </>
    );
}