import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
  LinearProgress,
} from '@mui/material';
// components
import { useExternalApi } from '../../hooks/AdminResponse';
import Label from '../label';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// import AppForm from '../../layouts/landingpage/modules/views/AppForm';
// FrontendDjango-WWW/src/layouts/landingpage/modules/views/AppForm.js
// FrontendDjango-WWW/src/components/Admin/UserList.js
// mock -> Users made by Faker: Not used
// import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'city', label: 'Ciudad', alignRight: false },
  { id: 'role', label: 'Rol', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'status', label: 'Estado', alignRight: false },
  { id: '' },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  // selected names - Hook by template
  const [selected, setSelected] = useState([]);
  // selected ids - Hook by Julian
  // const [selectedIds, setSelectedIds] = useState([])

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Added by Julian

  const [USERLIST, setUsuarios] = useState({})

  const [userrow, setUserrow] = useState({})

  const [isLoading, setLoading] = useState('Cargando informacion...')


  const {
    getAllAccountsDetailed,
    setStatusUser,
    // setStatusUserAux, getAllUsersDetailed,
  } = useExternalApi()

  useEffect(() => {

    getAllAccountsDetailed(setUsuarios)
      .then(() => {
        setLoading('Usuarios')
      })
    // console.log('Initialize Users: ', USERLIST)
    // eslint-disable-next-line
  }, [])

  //
  const handleOpenMenu = (event, row) => {
    setOpen(event.currentTarget);
    setUserrow(row)
  };

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
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleChangeStatus = (status) => {
    setStatusUser(status, userrow.id)
      .then(() => {
        setLoading('Cambiando estado...')
        getAllAccountsDetailed(setUsuarios)
          .then(() => {
            setLoading('Usuarios')
          })
      })
  }

  const checkStatus = userrow.status === 'Activo'

  if (Object.keys(USERLIST).length === 0) {
    // console.log('No users loaded yet :c')
    return(
      <>
        <Helmet>
          <title> Gestión de usuarios</title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h2" gutterBottom align = "center" >
              Cargando usuarios
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:clock-outline" />}>
              {isLoading}
            </Button>
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
  // console.log('User list deatiled received!', USERLIST)
  // Filtering information
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Gestión de usuarios </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h2" gutterBottom align = "center" >
            Gestión de usuarios
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:layers-outline" />}>
            {isLoading}
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // id, name, role, status, company, avatarUrl, isVerified <- template
                    // id, name, role, status, city, avatarUrl, email <- our data
                    const { id, name, role, status, city, avatarUrl, email } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{city}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'Inactivo' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => {handleOpenMenu(event, row)}}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
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
            count={USERLIST.length}
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
        <MenuItem disabled = {checkStatus} onClick = {() => {handleChangeStatus(true)}}>
          <Iconify icon={'eva:person-done-fill'} sx={{ mr: 2 }} />
          Activar
        </MenuItem>

        <MenuItem  disabled = {!checkStatus} sx={{ color: 'error.main' }} onClick = {() => {handleChangeStatus(false)}}>
          <Iconify icon={'eva:person-delete-fill'} sx={{ mr: 2 }} />
          Desactivar
        </MenuItem>
      </Popover>
    </>
  );
}
