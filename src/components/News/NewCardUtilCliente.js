import { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
// @mui
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewCardUtil(props) {

    const [card, setCard] = useState(-1)
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line
    if (props.option === 'recientes') {
        // eslint-disable-next-line
        const noticias = props.new.sort(
            (A, B) => Number(new Date(B.new_date)) - Number(new Date(A.new_date))
        )
    }
    // eslint-disable-next-line
    if (props.option === 'antiguas') {
        // eslint-disable-next-line
        const noticias = props.new.sort(
            (A, B) => Number(new Date(A.new_date)) - Number(new Date(B.new_date))
        )
    }

    useEffect(() => {
        handleClickOpen()
    }, [card])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // eslint-disable-next-line
    const newsDialogs = props.new.map((newI) =>
        <Dialog key={newI.new_id}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="12sm"
        >
            <DialogTitle id="alert-dialog-title">
                {newI.new_title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <td dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(JSON.parse(newI.new_description))) }} />
                    {console.log()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );

    const extracImage = (htmlText) => {
        let result = ''
        if (htmlText.match(/https:([\w\W]+?).jpg/g) != null) {
            result = htmlText.match(/https:([\w\W]+?).jpg/g)[0]
        }else {
            result = "https://img.freepik.com/premium-vector/pc-components-cpu-gpu-motherboard-cooler-ssd-hand-drawn-memory-modules-system-unit-power-supply-vector-personal-computer-parts-isolated-set_102902-6145.jpg?w=1380"
        }
        console.log(result)
        return <CardMedia
            component="img"
            height="140"
            image={result}

        />
    }

    // eslint-disable-next-line
    const newsCards = props.new.map((newI, index) =>
        <Grid item xs={4} key={newI.new_id}>
            <Card sx={{ minWidth: 275, padding: "10px" }}>
                {extracImage(stateToHTML(convertFromRaw(JSON.parse(newI.new_description))))}

                {/* {console.log(stateToHTML(convertFromRaw(JSON.parse(newI.new_description))).match(/"https:([\w\W]+?)"/g)[0] )} */}
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {newI.new_date}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {newI.new_title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" onClick={() => { setCard(index) }} >Ver mas</Button>
                </CardActions>
            </Card>

        </Grid>


    );

    return (
        <>
            <Grid container spacing={2}>
                {newsCards}
                {newsDialogs[card]}
            </Grid>
        </>
    );
}