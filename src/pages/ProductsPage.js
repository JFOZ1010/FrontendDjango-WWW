import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button, Card, LinearProgress, OutlinedInput, InputAdornment, Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import { useExternalApi } from '../hooks/ItemsResponse';
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
    return filter(array, (_product) => _product.item_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 350,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 450,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [listaItems, setListaItems] = useState(undefined);
  const [isLoading, setLoading] = useState('Cargando...');
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('item_name');


  const {
    allItems,
  } = useExternalApi();

  // se puede poner este except o poner allItems pero esto llamara mas veces
  useEffect(() => {
    allItems(setListaItems)
      .then(() => {
        setLoading('Lista de productos')
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

  }, [filterName])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // eslint-disable-next-line
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  if (listaItems === undefined) {
    console.log('Cargando...')
    return (
      <>
        <Helmet>
          <title> Lista de Items</title>
        </Helmet>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h2" gutterBottom align = "center" >
              Cargando Items
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

  if (Object.keys(listaItems).length === 0) {
    return (
      <>
      <Helmet>
          <title> Dashboard: Items </title>
        </Helmet>
        <Container>
          <Typography variant="h2" sx={{ mb: 5 }}>
            Productos
          </Typography>
          <Paper
              sx={{
                textAlign: 'center',
              }}
              >
              <Typography variant="h6" paragraph>
                No encontrado
              </Typography>

              <Typography variant="body2">
                No hay productos disponibles
                <br /> Verifique que el admin haya scrapeado productos
              </Typography>
            </Paper>
        </Container>
      </>
    )
  }
  const filteredItems = applySortFilter(listaItems, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredItems.length && !!filterName;
  // console.log(listaItems)
  return (
    <>
      <Helmet>
        <title> Dashboard: Items </title>
      </Helmet>

      <Container>
        <Typography variant="h2" sx={{ mb: 5 }}>
          Productos
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex" sx={{ mb: 5 }}>
          <Stack direction = 'row' spacing = {2} flexShrink = {0} sx = {{ my: 1 }} >
            <StyledSearch
              value = {filterName}
              onChange = {(event) => {setFilterName(event.target.value)}}
              placeholder = 'Buscar producto...'
              startAdornment = {
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              } />
          </Stack>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1, ml: 10 }} justifyContent = 'flex-end'>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={filteredItems} />
        {isNotFound && (
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
        )}
        <ProductCartWidget />
      </Container>
    </>
  );
}

