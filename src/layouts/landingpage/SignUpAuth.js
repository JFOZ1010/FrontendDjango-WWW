import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
// import withRoot from './modules/withRoot';
import LoginButton from './modules/components/LogComponents/LoginButton'
import LogOutButton from './modules/components/LogComponents/LogoutButton'
import Profile from './modules/components/LogComponents/Profile'
import { useExternalApi } from '../../hooks/accountResponse';


function SignUpAuth() {
  
  const { user, isAuthenticated, isLoading } = useAuth0()

  const {
    getInfoAccount,
  } = useExternalApi()

  const handleClick = () => {
    getInfoAccount(user.sub)
  }

  if (isLoading) return <h1>Cargando...</h1>
  return (
    <>
      <h1> Application </h1>
      { isAuthenticated ? <LogOutButton /> : <LoginButton /> }
      <Profile />
      <button type = "button" onClick = {handleClick}>Prueba</button>
    </>
  );
}

export default SignUpAuth;
