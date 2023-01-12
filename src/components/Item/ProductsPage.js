import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
// @mui
import { Container, Stack, Typography, OutlinedInput, InputAdornment, Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Iconify from '../iconify';

// components
import { ProductSort, ProductList, ProductFilterSidebar } from './product_component';
import { useExternalApi } from '../../hooks/ItemsResponse';

import './pagination.css';
import ProductLoading from './ProductsLoading'
import ProductsNotReady from './ProductsNotReady'
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
  let arrayRenew = array;
  if (query) {
    arrayRenew = filter(array, (_product) => _product.item_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  const stabilizedThis = arrayRenew.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function filterAuxFunction(filtro) {
  let filterAux = ''
  switch(filtro) {
    case 'Amazon': 
      filterAux = 'auth0|638b682bbc99c67d7152083b'
      break;
    case 'Mercado Libre': 
      filterAux = 'auth0|639e3ee1aacda0152647f763'
      break; 
    case 'NewEgg': 
      filterAux = 'auth0|639e3f6e9c43cd6f74e81ba0'
      break; 
    default: 
      filterAux = 'Todos'
      break; 
  }
  return filterAux; 
}

function applySortCompsFilter(array, filtro) {
  const filteredList = []
  for (let i = 0; i < array.length; i += 1) {
    if (filtro === 0) {
      filteredList.push(array[i]); 
    } else if (array[i].type_id === filtro) {
      filteredList.push(array[i]); 
    }
  }
  return filteredList;
}

function applySortSupsFilter(array, filterAux) {
  const filteredList = []
  for (let i = 0; i < array.length; i += 1) {
    if (filterAux === 'Todos') {
      filteredList.push(array[i])
    } else if (array[i].user_id === filterAux) {
      filteredList.push(array[i])
    }
  }

  return filteredList; 
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
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(36);

  // Filtros
  const [compFilter, setCompFilter] = useState(0); 
  const [compAux, setCompAux] = useState('Todos los componentes')
  const [supFilter, setSupFilter] = useState('Todos')

  // Ordenar por: 
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

  const handleFilterName = (e) => {
    setFilterName(e.target.value)
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
 };

  if (listaItems === undefined) {
    console.log('Cargando...')
    return (
      <ProductLoading status = {isLoading} />
    )
  }

  if (Object.keys(listaItems).length === 0) {
    return (
      <ProductsNotReady />
    )
  }
  // console.log(listaItems)

  const filteredComps = applySortCompsFilter(listaItems, compFilter)
  const filteredSups = applySortSupsFilter(filteredComps, filterAuxFunction(supFilter))
  const filteredItems = applySortFilter(filteredSups, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredItems.length && !!filterName;

  // PAGINATION VARIABLES 
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage; 

  const currentProducts = filteredItems.slice(firstProductIndex, lastProductIndex)

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
              onChange = {handleFilterName}
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
              setCompFilter = {setCompFilter}
              FilterSelected = {compFilter}
              setCompAux = {setCompAux}
              FilterSupSelected = {supFilter}
              setFilterSupSelected = {setSupFilter}
            />
            <ProductSort setOrderBy = {setOrderBy} setOrder = {setOrder} />
          </Stack>
        </Stack>

        <ProductList products={currentProducts} />
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent = 'center'>
          <ReactPaginate 
            activeClassName={'item active-pagination '}
            breakClassName={'item break-me '}
            breakLabel={'...'}
            containerClassName={'pagination'}
            disabledClassName={'disabled-pagination'}
            marginPagesDisplayed={2}
            nextClassName={"item next "}
            nextLabel={<Iconify icon = 'eva:arrow-ios-forward-fill'/>}
            onPageChange={paginate}
            pageCount={Math.ceil(filteredItems.length/productsPerPage)}
            pageClassName={'item pagination-page '}
            pageRangeDisplayed={2}
            previousClassName={"item previous"}
            previousLabel={<Iconify icon = 'eva:arrow-ios-back-outline' />}
            />
        </Stack>
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
              <br /> Con el filtro de componente: &nbsp;
              <strong> &quot;{compAux}&quot;</strong>
              <br /> Con el filtro de proveedor: &nbsp;
              <strong> &quot;{supFilter}&quot;</strong>
              <br /> Verifique, utilice palabras completas o restaure los filtros para una mejor busqueda
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
}