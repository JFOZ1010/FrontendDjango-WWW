/* eslint-disable no-eval */
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';

import { useState, React } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import { fCurrency } from '../../utils/formatNumber';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';




// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'itemId', label: 'Id', alignRight: false },
  { id: 'itemName', label: 'Name', alignRight: false },
  { id: 'itemPrice', label: 'Price', alignRight: false }
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

export default function ProductTable(props) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  // selected names - Hook by template
  const [selected, setSelected] = useState([]);
  // selected ids - Hook by Julian
  // const [selectedIds, setSelectedIds] = useState([])

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [userrow, setUserrow] = useState({})

  const [ITEMLIST,setItemList] = useState(props.ITEMLIST)

  const navigate = useNavigate()

  const handleCloseMenu = () => {
    setOpen(null);
    setUserrow({})
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ITEMLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOnRowClick = (id,date,price) => {
    navigate(`reportPrice/${id}/${date}/${price}`)
    console.log('clic')
    // return <PriceReport id = {id} date = {date}/>
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    console.log(newSelected)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const checkStatus = userrow.status === 'Activo'
  const filteredProducts = applySortFilter(ITEMLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredProducts.length && !!filterName;
  console.log(filteredProducts)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ITEMLIST.length) : 0;

  return (
    <>
      <Helmet>
        <title> Reportes de productos </title>
      </Helmet>

      <Container>


        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ITEMLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />                   
                <TableBody>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // id, name, role, status, company, avatarUrl, isVerified <- template
                    // id, name, role, statnoticiaus, city, avatarUrl, email <- our data
                     /* eslint-disable */
                    const { item_id, item_name, item_price, user_id,item_date} = row;
                    const selectedUser = selected.indexOf(item_name) !== -1;

                    return (
                      <TableRow hover key={item_id} tabIndex={-1} selected={selectedUser} 
                      onClick = {()=>{handleOnRowClick(item_id,item_date,item_price)}} >
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, item_id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {item_id}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{item_name}</TableCell>

                        <TableCell align="left">{fCurrency(item_price)}</TableCell>

                      </TableRow>
                    );
                  })}


                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No encontrado
                          </Typography>

                          <Typography variant="body2">
                            No hay resultados para &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Verifique o utilice palabras completas
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ITEMLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem disabled = {checkStatus} >
          <Iconify icon={'eva:person-done-fill'} sx={{ mr: 2 }} />
          Activar
        </MenuItem>

        <MenuItem  disabled = {!checkStatus} sx={{ color: 'error.main' }} >
          <Iconify icon={'eva:person-delete-fill'} sx={{ mr: 2 }} />
          Desactivar
        </MenuItem>
      </Popover>
    </>
  );
}
