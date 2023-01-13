/* eslint-disable no-eval */
import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';
import { useState, React } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// @mui
import {
  Stack,
  Button,
  MenuItem,
  Container,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Box,
  Grid, 
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card, 
  LinearProgress,
} from '@mui/material';
// hooks
import { useExternalApi } from "../../hooks/reportsResponse";
// components
import Iconify from "../iconify/index";

export default function ProductTable() { 

  // Tipo de usuario, se usa para saber qué vista darle a este
  const tipo = window.localStorage.getItem('tipo');
  const { getItemsBySupplier} = useExternalApi()
  // let ITEMLIST 
  const [ITEMLIST, setItemList] = useState({})
  let supplierID
  // const[supplierID, setSupplierID] = useState('')
  // let sup = 1
  const [sup, setSup] = useState(1);
  const handleChangeSup = (event) => {
      setSup(event.target.value);
      // sup = event.target.value
  };
  // const[topN, setTopN] = useState(5)
  let topN 
  const [top, setTop] = useState(2);
  // let top = 2
  const handleChangeTop = (event) => {
      setTop(event.target.value);
      // top = event.target.value
  };
  // let generated = false
  const [generated, setGenerated] = useState(false)

  const generateReport = (u) => {

    if(u==="Admin"){
      // eslint-disable-next-line no-use-before-define
      if(sup===1){
        // setSupplierID('auth0|638b682bbc99c67d7152083b')
        supplierID = 'auth0|638b682bbc99c67d7152083b'
      } else if(sup===2){
          // setSupplierID('auth0|639e3ee1aacda0152647f763')
          supplierID = 'auth0|639e3ee1aacda0152647f763'
      } else {
          // setSupplierID('auth0|639e3f6e9c43cd6f74e81ba0')
          supplierID = 'auth0|639e3f6e9c43cd6f74e81ba0'
      }
    }
    if(u==="Amazon"){
      supplierID = 'auth0|638b682bbc99c67d7152083b'
    }
    if(u==="Mercado"){
      supplierID = 'auth0|639e3ee1aacda0152647f763'
    }
    if(u==="NewEGG"){
      supplierID = 'auth0|639e3f6e9c43cd6f74e81ba0'
    }
      
      if(top===1){
        // setTopN(3)
        topN = 3
      } else if(top===2){
        // setTopN(5)
        topN = 5
      } else {
        // setTopN(10)
        topN = 10
      }
      // setItemList(getItemsBySupplier(supplierID, topN))
      getItemsBySupplier(supplierID, topN, setItemList)
      setGenerated(true)
    }

  const goBack = () => {
    // eslint-disable-next-line no-use-before-define
    setItemList({})
    setGenerated(false)
  }
  const { user, isLoading } = useAuth0()
  // console.log(user)
  // Aquí comienza todo el manejo de lo que se le muestra al usuario:
  // Si está cargando el usuario todavía, no se le muestra nada

  if (isLoading) return <></>

  //  Caso en el que el usuario es un administrador:
  if (tipo.localeCompare('Admin') === 0){
    // Menú principal cuando no se ha clickado el botón
  if (!generated) { 
    // console.log('No users loaded yet :c')
    return(
        <>
        <Helmet>
            <title> Top productos por proveedor </title>
        </Helmet>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h3" gutterBottom align = "center" >
            Generar reporte para obtener los productos más clickeados por proveedor
            </Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                Seleccione el proveedor:
            </Grid>
            <Grid item xs={3}>
            <FormControl sx = {{ minWidth: 200}}>
                <InputLabel id="select-supplier-label">Proveedor</InputLabel>
                            <Select
                            labelId="select-supplier-label"
                            id="select-supplier"
                            value={sup}
                            label="Proveedor"
                            onChange={handleChangeSup}
                            >
                                <MenuItem value={1}>Amazon</MenuItem>
                                <MenuItem value={2}>Mercado Libre</MenuItem>
                                <MenuItem value={3}>NewEgg</MenuItem>
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={2}>
                Seleccione el top de productos:
            </Grid>
            <Grid item xs={3}>
            <FormControl sx = {{ minWidth: 200}}>
                <InputLabel id="select-top-label"># TOP</InputLabel>
                            <Select
                            labelId="select-top-label"
                            id="select-top"
                            value={top}
                            label="# TOP"
                            onChange={handleChangeTop}
                            >
                                <MenuItem value={1}>Top 3 productos</MenuItem>
                                <MenuItem value={2}>Top 5 productos</MenuItem>
                                <MenuItem value={3}>Top 10 productos</MenuItem>
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:backup-table" />} onClick={() => generateReport("Admin")}>
                    Generar reporte
                </Button>
        </Grid>
        </Grid>
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx = {{ mt: 5 }}>
            <Grid item xs = {3}>
                <Button component = {RouterLink} to = {'/dashboard/reports'} variant = 'contained' align="center" startIcon = {<Iconify icon = 'eva:arrow-back-fill'/>}>
                  Regresar
                </Button>
            </Grid>
        </Grid> 
        </Container>
        
        </>
    )
    }
     // Caso en el que no se obtuvieron productos:
     if (ITEMLIST===false){
      return(
        <>
          <Helmet>
          <title> Top productos por proveedor </title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Typography variant="h3" gutterBottom align = "center" >
                 No se encontraron resultados, por favor inténtelo de nuevo más tarde
                </Typography>
          </Box>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
              </Box>
          </Container>
          </>
      )
    }
      if (Object.keys(ITEMLIST).length === 0){
        return(
          <>
          <Helmet>
            <title> Cargando reporte...</title>
          </Helmet>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h2" gutterBottom align = "center" >
                Cargando reporte...
              </Typography>
            </Stack>
            <Card>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <LinearProgress color = "secondary" />
              </Stack>
            </Card>
          </Container>
        </>
        )
      }
        return(
            <>
            <Helmet>
            <title> Top productos por proveedor </title>
            </Helmet>
            <Container>
            <Box
                m={1}
                display="flex"
                justifyContent="flex-end"
                alignItems="right"
                >
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                        Volver a generar el reporte
                </Button>
            </Box>
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id del producto</TableCell>
              <TableCell>Nombre del producto</TableCell>
              <TableCell># de clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ITEMLIST.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.item_id}
                </TableCell>
                <TableCell>{row.item_name}</TableCell>
                <TableCell>{row.item_clic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            </Container>
            </>
        )
    // Caso en el cual no se trata de un administrador
    // El proveedor es Amazon:
    } 
    if(user.sub==="auth0|638b682bbc99c67d7152083b") {
      // Menú principal cuando no se ha clickado el botón
  if (!generated) { 
    // console.log('No users loaded yet :c')
    return(
        <>
        <Helmet>
            <title> Top productos de Amazon </title>
        </Helmet>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h3" gutterBottom align = "center" >
            Generar reporte para obtener los productos de Amazon más clickeados en ScrapWare
            </Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                Seleccione el top de productos:
            </Grid>
            <Grid item xs={3}>
            <FormControl sx = {{ minWidth: 200}}>
                <InputLabel id="select-top-label"># TOP</InputLabel>
                            <Select
                            labelId="select-top-label"
                            id="select-top"
                            value={top}
                            label="# TOP"
                            onChange={handleChangeTop}
                            >
                                <MenuItem value={1}>Top 3 productos</MenuItem>
                                <MenuItem value={2}>Top 5 productos</MenuItem>
                                <MenuItem value={3}>Top 10 productos</MenuItem>
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:backup-table" />} onClick={() => generateReport("Amazon")}>
                    Generar reporte
                </Button>
        </Grid>
        </Grid>
        </Container>
        </>
    )
      // El proveedor es MercadoLibre:
    }
    // Caso en el que no se obtuvieron productos:
    if (ITEMLIST===false){
      return(
        <>
          <Helmet>
          <title> Top productos de Amazon</title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Typography variant="h3" gutterBottom align = "center" >
                 No se encontraron resultados, por favor inténtelo de nuevo más tarde
                </Typography>
          </Box>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
              </Box>
          </Container>
          </>
      )
    }
    if (Object.keys(ITEMLIST).length === 0){
      return(
        <>
        <Helmet>
          <title> Cargando reporte...</title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h2" gutterBottom align = "center" >
              Cargando reporte...
            </Typography>
          </Stack>
          <Card>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <LinearProgress color = "secondary" />
            </Stack>
          </Card>
        </Container>
      </>
      )
    }
      return(
          <>
          <Helmet>
          <title> Top productos de Amazon</title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="right"
              >
              <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
          </Box>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id del producto</TableCell>
            <TableCell>Nombre del producto</TableCell>
            <TableCell># de clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ITEMLIST.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item_id}
              </TableCell>
              <TableCell>{row.item_name}</TableCell>
              <TableCell>{row.item_clic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Container>
          </>
      )
    } 
    // El proveedor es Mercado Libre
    if(user.sub==="auth0|639e3ee1aacda0152647f763"){
      // Menú principal cuando no se ha clickado el botón
  if (!generated) { 
    // console.log('No users loaded yet :c')
    return(
        <>
        <Helmet>
            <title> Top productos de Mercado Libre </title>
        </Helmet>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h3" gutterBottom align = "center" >
            Generar reporte para obtener los productos de Mercado Libre más clickeados en ScrapWare
            </Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                Seleccione el top de productos:
            </Grid>
            <Grid item xs={3}>
            <FormControl sx = {{ minWidth: 200}}>
                <InputLabel id="select-top-label"># TOP</InputLabel>
                            <Select
                            labelId="select-top-label"
                            id="select-top"
                            value={top}
                            label="# TOP"
                            onChange={handleChangeTop}
                            >
                                <MenuItem value={1}>Top 3 productos</MenuItem>
                                <MenuItem value={2}>Top 5 productos</MenuItem>
                                <MenuItem value={3}>Top 10 productos</MenuItem>
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" startIcon={<Iconify icon="material-symbols:backup-table" />} onClick={() => generateReport("Mercado")}>
                Generar reporte
              </Button>
            </Grid>
        </Grid>
        </Container>
        </>
    )
      // El proveedor es MercadoLibre:
    }
    // Caso en el que no se obtuvieron productos:
    if (ITEMLIST===false){
      return(
        <>
          <Helmet>
          <title> Top productos de Mercado Libre</title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Typography variant="h3" gutterBottom align = "center" >
                 No se encontraron resultados, por favor inténtelo de nuevo más tarde
                </Typography>
          </Box>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
              </Box>
          </Container>
          </>
      )
    }
    if (Object.keys(ITEMLIST).length === 0){
      return(
        <>
        <Helmet>
          <title> Cargando reporte...</title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h2" gutterBottom align = "center" >
              Cargando reporte...
            </Typography>
          </Stack>
          <Card>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <LinearProgress color = "secondary" />
            </Stack>
          </Card>
        </Container>
      </>
      )
    }
      return(
          <>
          <Helmet>
          <title> Top productos de Mercado Libre</title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="right"
              >
              <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
          </Box>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id del producto</TableCell>
            <TableCell>Nombre del producto</TableCell>
            <TableCell># de clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ITEMLIST.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item_id}
              </TableCell>
              <TableCell>{row.item_name}</TableCell>
              <TableCell>{row.item_clic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Container>
          </>
      )
    } 
    // NewEGG
    if(user.sub==="auth0|639e3f6e9c43cd6f74e81ba0"){
      // Menú principal cuando no se ha clickado el botón
  if (!generated) { 
    // console.log('No users loaded yet :c')
    return(
        <>
        <Helmet>
            <title> Top productos de NewEgg </title>
        </Helmet>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h3" gutterBottom align = "center" >
            Generar reporte para obtener los productos de NewEgg más clickeados en ScrapWare
            </Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                Seleccione el top de productos:
            </Grid>
            <Grid item xs={3}>
            <FormControl sx = {{ minWidth: 200}}>
                <InputLabel id="select-top-label"># TOP</InputLabel>
                            <Select
                            labelId="select-top-label"
                            id="select-top"
                            value={top}
                            label="# TOP"
                            onChange={handleChangeTop}
                            >
                                <MenuItem value={1}>Top 3 productos</MenuItem>
                                <MenuItem value={2}>Top 5 productos</MenuItem>
                                <MenuItem value={3}>Top 10 productos</MenuItem>
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:backup-table" />} onClick={() => generateReport("NewEGG")}>
                    Generar reporte
                </Button>
        </Grid>
        </Grid>
        </Container>
        </>
    )
    }
    // Caso en el que no se obtuvieron productos:
    if (ITEMLIST===false){
      return(
        <>
          <Helmet>
          <title> Top productos de NewEgg</title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Typography variant="h3" gutterBottom align = "center" >
                 No se encontraron resultados, por favor inténtelo de nuevo más tarde
                </Typography>
          </Box>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
              </Box>
          </Container>
          </>
      )
    }
    if (Object.keys(ITEMLIST).length === 0){
      return(
        <>
        <Helmet>
          <title> Cargando reporte...</title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h2" gutterBottom align = "center" >
              Cargando reporte...
            </Typography>
          </Stack>
          <Card>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <LinearProgress color = "secondary" />
            </Stack>
          </Card>
        </Container>
      </>
      )
    }
      return(
          <>
          <Helmet>
          <title> Top productos de NewEgg</title>
          </Helmet>
          <Container>
          <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="right"
              >
              <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-rounded" />} onClick={goBack}>
                      Volver a generar el reporte
              </Button>
          </Box>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id del producto</TableCell>
            <TableCell>Nombre del producto</TableCell>
            <TableCell># de clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ITEMLIST.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item_id}
              </TableCell>
              <TableCell>{row.item_name}</TableCell>
              <TableCell>{row.item_clic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Container>
          </>
      )
    } 
    }
