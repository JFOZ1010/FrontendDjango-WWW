import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import withRoot from './modules/withRoot';
import LoginButton from './modules/components/LogComponents/LoginButton'
import LogOutButton from './modules/components/LogComponents/LogoutButton'
import Profile from './modules/components/LogComponents/Profile'



function SignUpAuth() {
  
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <h1>Cargando...</h1>
  return (
    <>
      <h1> Application </h1>
      { isAuthenticated ? <LogOutButton /> : <LoginButton /> }
      <Profile />
    </>
  );
}

export default withRoot(SignUpAuth);
