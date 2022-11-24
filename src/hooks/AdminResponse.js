/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable camelcase */
import axios from 'axios'
import { useEnv } from '../context/env.context'

export const useExternalApi = () => {

    const { apiServerUrl } = useEnv()

    const makeRequest = async (options) => {

        try {
            const response = await axios(options.config)
            const { data } = response

            return data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data
            }

            return error.message
        }
    }

    const getAllAccountsDetailed = async (setUsersDetailed) => {
        var users_retreived, sups_retreived;
        var USERLIST = [];
        
        // Using django API to retreive all acounts, users and sups information
        users_retreived = await getAllUsersDetailed();
        sups_retreived = await getAllSupsDetailed();
        
        // then building USERLIST, JSON that is going to be sent to UserPage
        // first, user time 
        let role_name; let status; let contador = 0;  
        // console.log(users_retreived, 'usuarios recibidos!')
        // console.log(sups_retreived, 'suppliers recibidos!')
        // console.log('*** Recibiendo informacion')
        const users_builded = users_retreived.map(item => {
            if (contador === 24) {
                contador = 0; 
            }
            contador++
            role_name = (item.user_id.user_type === 3) ? 'Admin' : 'Usuario'
            status = (item.user_id.user_status) ? 'Activo' : 'Inactivo' 
            return ({
                id: item.user_id.user_id,
                avatarUrl: `/assets/images/avatars/avatar_${contador}.jpg`,
                name: item.name, 
                city: item.city,
                email: item.user_id.email,
                status: status,
                role: role_name,
            })           
        })
        contador = 0; 
        const sups_builded = sups_retreived.map(item => {
            if (contador === 24) {
                contador = 0;
            }
            contador++
            status = (item.user_id.user_status) ? 'Activo' : 'Inactivo'
            return ({
                id: item.user_id.user_id,
                avatarUrl: `/assets/images/avatars/avatar_${contador}.jpg`,
                name: item.supplier_name, 
                city: '--',
                email: item.user_id.email,
                status: status,
                role: 'Proveedor',
            }) 
        })
        USERLIST = users_builded.concat(sups_builded)
        // console.log(USERLIST, 'Lo que se deberia mandar')
        setUsersDetailed(USERLIST);
    }

    const getAllUsersDetailed = async () => {
        const config = {
            url : `${apiServerUrl}/api/user/retreive/all/detailed`,
            method: 'GET',
            headers: {},
            data: {}
        }
        const data = await makeRequest({config})
        return data
    }

    const getAllSupsDetailed = async () => {
        const config = {
            url : `${apiServerUrl}/api/supplier/retreive/all/detailed`,
            method: 'GET',
            headers: {},
            data: {}
        }
        const data = await makeRequest({config})
        return data
    }


    // Update status of accounts!! Admin only
    const setStatusUser = async (status, id) => {
        // console.log('si llegue')
        const config = {
            url : `${apiServerUrl}/api/admin/update_status/${id}`,
            method : 'PUT',
            headers : {
            },
            data : {
                "user_id": id,
                "user_status" : status
            }
        }
        const data = await makeRequest({config})
        console.log(data)
    }

    const setStatusUserAux = async (status, list_id, admin_id) => {
        list_id.map(item => {
            if (item === admin_id) {
                console.log('Unable to deactivate or activate itself')
            } else {
                setStatusUser(status, item)
            }
            return console.log('Users have been changed!')
        })
    }

    return {
        getAllUsersDetailed,
        getAllSupsDetailed,
        getAllAccountsDetailed,
        setStatusUser,
        setStatusUserAux
    }
}

