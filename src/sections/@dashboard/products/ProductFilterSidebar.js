import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_COMPONENTS_OPTIONS = ['Todos', 'CPU', 'Memorias Ram', 'Tarjetas de video', 'SSD'];
export const FILTER_SUPPLIER_OPTIONS = ['Todos', 'Amazon', 'Mercado Libre', 'NewEgg'];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  setCompFilter: PropTypes.func,
  FilterSelected: PropTypes.number,
  setCompAux: PropTypes.func,
  FilterSupSelected: PropTypes.string,
  setFilterSupSelected: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter, setCompFilter, FilterSelected, setCompAux, FilterSupSelected, setFilterSupSelected }) {

  const handleCompFilter = (e) => {
    switch (e.target.value) {
      case 'Todos':
        setCompFilter(0)
        break;
      case 'CPU':
        setCompFilter(1)
        break;
      case 'Memorias Ram':
        setCompFilter(2)
        break;
      case 'Tarjetas de video':
        setCompFilter(3)
        break;
      default :
        setCompFilter(4)
        break;
    }
    setCompAux(e.target.value)
  }

  const handleSupFilter = (e) => {
    setFilterSupSelected(e.target.value)
  }

  const handleReset = () => {
    setCompFilter(0); 
    setCompAux('Todos')
    setFilterSupSelected('Todos')
  }

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filtros&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filtros
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Componentes
              </Typography>
              <RadioGroup>
                {FILTER_COMPONENTS_OPTIONS.map((item) => (
                  <FormControlLabel key={item} checked = {FilterSelected === FILTER_COMPONENTS_OPTIONS.indexOf(item)} value={item} control={<Radio />}  label={item} onClick = {handleCompFilter} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Proveedor
              </Typography>
              <RadioGroup>
                {FILTER_SUPPLIER_OPTIONS.map((item) => (
                  <FormControlLabel key={item} checked = {FilterSupSelected === item} value={item} control={<Radio />} label={item} onClick = {handleSupFilter}/>
                ))}
              </RadioGroup>
            </div>

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick = {handleReset}
          >
            Restaurar Filtros
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
