import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Link as LinkRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Toolbar, AppBar } from '@mui/material'; 
import DropdownLogin from '../components/LogComponents/DropdownLogin'
import DropdownRegister from '../components/LogComponents/DropdownRegister'

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const [navbar, setNavbar] = useState(false)
  const { isAuthenticated, logout } = useAuth0()

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', changeBackground)

  return (
    <div>
      <AppBar position= 'fixed' elevation = { navbar ? 24 : 0} style = {{ backgroundColor: navbar ? "#182848" : 'transparent', boxShadow: navbar ?  '5px 0px 27px -5px rgba(0, 0, 0, 0.3) !important' : undefined }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="h6"
            underline="none"
            color="inherit"
            component = {LinkRouter}
            to = {'/'}
            sx={{ fontSize: 24 }}
          >
            {'Scrapware'}
          </Button>
          { !isAuthenticated &&  
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <DropdownLogin /> 
              <DropdownRegister />
            </Box>
            }
            { isAuthenticated && 
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
              color="inherit"
              variant="h6"
              underline="none"
              component = {LinkRouter}
              to = {'dashboard'}
              sx={rightLink}
              >
                {'Tienda'}
              </Button>
              <Button
                variant="h6"
                underline="none"
                onClick = { () => logout()}
                sx={{ ...rightLink, color: 'secondary.main' }}
              >
                {'Logout'}
              </Button>
              </Box>
            }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
