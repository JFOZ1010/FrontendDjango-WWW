import React, { useEffect } from 'react'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
import { useExternalApi } from '../hooks/accountResponse'

// eslint-disable-next-line
export default function ProtectedRoute ({ component, ...args }) {
    const { user, logout } = useAuth0()
    const { getInfoAccount } = useExternalApi()
    const nav = useNavigate()
    useEffect( () => {
        async function fetchData () {
            const tipo = window.localStorage.getItem('tipo')
            console.log(tipo)
            getInfoAccount(user.sub).then((data) => {
                console.log(data.user_type)
                if (data.user_type.localeCompare('noregistro') === 0) {
                    console.log("No estoy registrado")
                    nav(`/registrocliente`)
                    window.localStorage.setItem('isRegistrated', false)
                } else if ((tipo.localeCompare(data.user_type) !== 0 || !data.user_status)) {
                    console.log("Me meti donde no era")
                    logout({
                        returnTo: window.location.origin
                    })
                } else {
                    console.log("Me loguee bien")
                    window.localStorage.setItem('isRegistrated', true)
                }
            })
        }
        
        fetchData()
        // eslint-disable-next-line
    }, [])
    const Component = withAuthenticationRequired(component,args)
    return ( <Component /> )
}