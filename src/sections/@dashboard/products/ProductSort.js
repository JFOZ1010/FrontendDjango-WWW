import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'nombre', label: 'Nombre' },
  { value: 'newest', label: 'Mas recientes' },
  { value: 'priceDesc', label: 'Precios más altos' },
  { value: 'priceAsc', label: 'Precios más bajos' },
];

ShopProductSort.propTypes = {
  setOrderBy: PropTypes.func,
  setOrder: PropTypes.func,
}

export default function ShopProductSort({setOrderBy, setOrder}) {
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState('nombre')
  const [decorator, setDecorator] = useState('Nombre')

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOrder = (e) => {
    switch(e.value) {
      case 'nombre': 
        setOrderBy('item_name');
        setOrder('asc'); 
        setValue('nombre');
        break; 
      case 'newest':
        setOrderBy('item_date');
        setOrder('asc'); 
        setValue('newest');
        break; 
      case 'priceDesc': 
        setOrderBy('item_price');
        setOrder('desc'); 
        setValue('priceDesc') 
        break; 
      case 'priceAsc':
        setOrderBy('item_price');
        setOrder('asc'); 
        setValue('priceAsc');
        break; 
      default: 
        setOrderBy('item_name');
        setOrder('asc'); 
        setValue('nombre');
        break;
    }
    setDecorator(e.label); 
    setOpen(null);
  }

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Ordenar por:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {decorator}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => {handleOrder(option)}}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
