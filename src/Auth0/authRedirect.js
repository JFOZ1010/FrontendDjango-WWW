import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { useExternalApi } from '../hooks/accountResponse'

// eslint-disable-next-line
export default function AuthRedirect ({ Component, tipo }) {
    const nav = useNavigate()
    const { user } = useAuth0()
    const { getInfoAccount } = useExternalApi()

    useEffect(() => {
        async function fetchData () {
            getInfoAccount(user.sub).then((data) => {
            // eslint-disable-next-line
            if (data.user_type.localeCompare('noregistro') !== 0 || tipo.localeCompare(window.localStorage.getItem('tipo')) !== 0) {
            nav('/')
            }
            
        })
        }

        fetchData()
        // eslint-disable-next-line
    }, [])
    return <Component authId={user.sub} authEmail={user.email} />
}