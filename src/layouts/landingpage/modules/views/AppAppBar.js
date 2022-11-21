import * as React from 'react';
import Box from '@mui/material/Box';
import { Link as LinkRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {

  const { isAuthenticated, logout, loginWithRedirect } = useAuth0()
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="h6"
            underline="none"
            color="inherit"
            component = {LinkRouter}
            to = {'dashboard'}
            sx={{ fontSize: 24 }}
          >
            {'ScrapWare'}
          </Button>
          { !isAuthenticated &&  
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
              color="inherit"
              variant="h6"
              underline="none"
              onClick = { () => loginWithRedirect()}
              sx={rightLink}
              >
                {'Login'}
              </Button>
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
