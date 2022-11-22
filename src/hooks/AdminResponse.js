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

    const getAllUsersDetailed = async (setUsersDetailed) => {
        var accounts_retreived, users_retreived, sups_retreived;
        const RELATED_DATA = [];
        var USERLIST = [];
        // Using django API to retreive all acounts, users and sups information
        accounts_retreived = await getAllAccounts();
        users_retreived = await getAllUsers();
        sups_retreived = await getAllSuppliers();
        const COMBINED_DATA = users_retreived.concat(sups_retreived)
        
        /* Dividing information in 2 sections: Account_User or Account_Supplier Creating USERLIST, 
         giving detailed and nested information between user - account or supplier - account */ 
        for (const x of accounts_retreived) {
            for (const y of COMBINED_DATA) {
                if (x.user_id === y.user_id) {
                    RELATED_DATA.push([x,y]);
                    continue;
                }
            }
        }

        // then building USERLIST, JSON that is going to be sent to UserPage
        let role_name; let city; let name_of = '';
            let counter = 0; 
            for (const i of RELATED_DATA) {
              if (counter === 24) {
                counter = 0;
              }
              counter++;
              switch(i[0].user_type) {
                case 1 : {
                  role_name = 'Usuario';
                  name_of = i[1].name;
                  city = i[1].city; 
                  break; 
                }
                case 2 : {
                  role_name = 'Proveedor';
                  name_of = i[1].supplier_name;
                  city = '--';
                  break; 
                }
                case 3 : {
                  role_name = 'Admin';
                  name_of = i[1].name;
                  city = i[1].city;
                  break;
                }
              }
              USERLIST.push({
                id: i[0].user_id, 
                avatarUrl: `/assets/images/avatars/avatar_${counter}.jpg`,
                name: name_of,
                city: city,
                email: i[0].email, 
                status: i[0].user_status,
                role: role_name,
              })
            }
            // console.log(USERLIST, 'Lo que se deberia mandar')
            setUsersDetailed(USERLIST);
    }

    const getAllAccounts = async (setAccounts) => {
        
        const config = {
            url : `${apiServerUrl}api/retreive_all_accounts`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})
        setAccounts(data)
    }

    const getAllUsers = async (setUsers) => {
        const config = {
            url : `${apiServerUrl}api/retreive_all_users`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})
        setUsers(data)
    }

    const getAllSuppliers = async (setSups) => {
        const config = {
            url : `${apiServerUrl}api/retreive_all_suppliers`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})
        setSups(data)
    }

    
    return {
        getAllUsersDetailed,
        getAllAccounts,
        getAllUsers,
        getAllSuppliers
    }
}

