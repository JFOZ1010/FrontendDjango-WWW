/* eslint-disable camelcase */
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';

import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

// assets
import NewEggIcon from '../../../components/Item/supplier_logos/newEggIcon'
import MLIcon from '../../../components/Item/supplier_logos/MLIcon'
import AmazonIcon from '../../../components/Item/supplier_logos/AmazonIcon'
import { useExternalApi } from '../../../hooks/ItemsResponse';

// import { ColorPreview } from '../../../components/color-utils';
// ---------------------------------------------------------------------
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

function checkSupplier(user_id) {
  if (user_id === 'auth0|638b682bbc99c67d7152083b') {
    return '#ff4d4d'
  }
  if (user_id === 'auth0|639e3ee1aacda0152647f763') {
    return '#F3EB76'
  }
  return '#2065d1'
}

function checkIcon(user_id) {
  if (user_id === 'auth0|638b682bbc99c67d7152083b') {
    return(<AmazonIcon />)
  }
  if (user_id === 'auth0|639e3ee1aacda0152647f763') {
    return(<MLIcon />)
  }
  return(<NewEggIcon />)
}
export default function ShopProductCard({ product }) {
  const { item_id, item_name, item_picture, item_price, item_url, user_id, type_id } = product;
  const [entered, setEntered] = useState(false)
  const [datosBorde, setDatosBorde] = useState({})
  const {
    UpdateClicItem,
  } = useExternalApi();

  useEffect(() => {
    if (entered) {
      setDatosBorde({
        'border' : 4,
        'borderColor' :  checkSupplier(user_id),
        'height': '400px'
      })
    } else {
      setDatosBorde({
        'border' : 0,
        'height': '400px',
      })
    }

  }, [entered, user_id])

  const clicSave = async () => {
    UpdateClicItem(item_id)
  }

  return (
    <Card onMouseEnter = {() => {setEntered(true)}} onMouseLeave = {() => {setEntered(false)}} sx = {datosBorde}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {type_id && (
          <Label
            variant="filled"
            color={'error'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {(type_id === 1 && 'CPU') || (type_id === 2 && 'RAM') || (type_id === 3 && 'GPU') || (type_id === 4 && 'SSD')}
          </Label>
        )}
        <StyledProductImg alt={item_name} src={item_picture} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link rel="noopener noreferrer" href = {item_url} onClick = {() => {clicSave()}} target="_blank" color="inherit" underline="hover" >
          <Typography variant="subtitle2" wrap="nowrap" sx = {{ fontSize: '11px' }}>
            {item_name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {checkIcon(user_id)}
          <Typography variant="subtitle1">
            {fCurrency(item_price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
