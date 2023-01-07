/* eslint-disable no-eval */
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, React } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  FormControl,
  Select,
  InputLabel,
  Box,
  Grid
} from '@mui/material';
// components
import Iconify from "../iconify/index.js";
import Scrollbar from "../scrollbar/index.js";
// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user/index.js";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'itemId', label: 'Id', alignRight: false },
  { id: 'itemName', label: 'Nombre', alignRight: false },
  { id: 'itemPrice', label: 'Precio', alignRight: false },
  { id: 'itemClick', label: 'No. Clicks', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.item_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// export default function ProductTable(props) {
//   const [open, setOpen] = useState(null);

//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   // selected names - Hook by template
//   const [selected, setSelected] = useState([]);
//   // selected ids - Hook by Julian
//   // const [selectedIds, setSelectedIds] = useState([])

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterName, setFilterName] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [userrow, setUserrow] = useState({})

//   const [ITEMLIST,setItemList] = useState(props.ITEMLIST)

//   const navigate = useNavigate()

//   //
//   const handleOpenMenu = (event, row) => {
//     setOpen(event.currentTarget);
//     setUserrow(row)
//   };

//   const handleCloseMenu = () => {
//     setOpen(null);
//     setUserrow({})
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = ITEMLIST.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleOnRowClick = (id) => {
//     navigate(`reportPrice/${id}`)
//   }

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }
//     setSelected(newSelected);
//     console.log(newSelected)
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const checkStatus = userrow.status === 'Activo'
//   const filteredProducts = applySortFilter(ITEMLIST, getComparator(order, orderBy), filterName);
//   const isNotFound = !filteredProducts.length && !!filterName;
//   console.log(filteredProducts)

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ITEMLIST.length) : 0;

//   return (
//     <>
//       <Helmet>
//         <title> Top productos por proveedor </title>
//       </Helmet>

//       <Container>


//         <Card>
//           <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

//           <Scrollbar>
//             <TableContainer sx={{ minWidth: 800 }}>
//               <Table >
//                 <UserListHead
//                   order={order}
//                   orderBy={orderBy}
//                   headLabel={TABLE_HEAD}
//                   rowCount={ITEMLIST.length}
//                   numSelected={selected.length}
//                   onRequestSort={handleRequestSort}
//                   onSelectAllClick={handleSelectAllClick}
//                 />                   
//                 <TableBody>
//                   {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                     // id, name, role, status, company, avatarUrl, isVerified <- template
//                     // id, name, role, statnoticiaus, city, avatarUrl, email <- our data
//                      /* eslint-disable */
//                     const { item_id, item_name, item_price, user_id} = row;
//                     const selectedUser = selected.indexOf(item_name) !== -1;

//                     return (
//                       <TableRow hover key={item_id} tabIndex={-1} selected={selectedUser} 
//                       onClick = {()=>{handleOnRowClick(item_id)}} >
//                         <TableCell padding="checkbox">
//                           <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, item_id)} />
//                         </TableCell>

//                         <TableCell component="th" scope="row" padding="none">
//                           <Stack direction="row" alignItems="center" spacing={2}>
//                             <Typography variant="subtitle2" noWrap>
//                               {item_id}
//                             </Typography>
//                           </Stack>
//                         </TableCell>

//                         <TableCell align="left">{item_name}</TableCell>

//                         <TableCell align="left">{item_price}</TableCell>

//                         <TableCell align="left">{item_clic}</TableCell>
//                       </TableRow>
//                     );
//                   })}


//                   {emptyRows > 0 && (
//                     <TableRow style={{ height: 53 * emptyRows }}>
//                       <TableCell colSpan={6} />
//                     </TableRow>
//                   )}
//                 </TableBody>

//                 {isNotFound && (
//                   <TableBody>
//                     <TableRow>
//                       <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                         <Paper
//                           sx={{
//                             textAlign: 'center',
//                           }}
//                         >
//                           <Typography variant="h6" paragraph>
//                             No encontrado
//                           </Typography>

//                           <Typography variant="body2">
//                             No hay resultados para &nbsp;
//                             <strong>&quot;{filterName}&quot;</strong>.
//                             <br /> Verifique o utilice palabras completas
//                           </Typography>
//                         </Paper>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 )}
//               </Table>
//             </TableContainer>
//           </Scrollbar>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={ITEMLIST.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Card>
//       </Container>

//       <Popover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: {
//             p: 1,
//             width: 140,
//             '& .MuiMenuItem-root': {
//               px: 1,
//               typography: 'body2',
//               borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         <MenuItem disabled = {checkStatus} >
//           <Iconify icon={'eva:person-done-fill'} sx={{ mr: 2 }} />
//           Activar
//         </MenuItem>

//         <MenuItem  disabled = {!checkStatus} sx={{ color: 'error.main' }} >
//           <Iconify icon={'eva:person-delete-fill'} sx={{ mr: 2 }} />
//           Desactivar
//         </MenuItem>
//       </Popover>
//     </>
//   );
// }
export default function ProductTable(props) { 
    const [sup, setSup] = useState(1);
    const handleChangeSup = (event) => {
        setSup(event.target.value);
    };
    const [top, setTop] = useState(2);
    const handleChangeTop = (event) => {
        setTop(event.target.value);
    };
    const [generated, setGenerated] = useState(false)
    const generateReport = (e) => {
        // eslint-disable-next-line no-use-before-define
        console.log('Se presionó el botón')
        setGenerated(true);
      }
    const goBack = (e) => {
    // eslint-disable-next-line no-use-before-define
    console.log('Se presionó el botón')
    setGenerated(false);
    }

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
                <Button variant="contained" startIcon={<Iconify icon="material-symbols:backup-table" />} onClick={generateReport}>
                    Generar reporte
                </Button>
        </Grid>
        </Grid>
        </Container>
        
        </>
    )
    } 
    if(generated){
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
            </Container>
            </>
        )
    }


    
}