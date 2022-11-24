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

    /*const getUser = async (id, setUser) => {

        const config = {
            url: `${apiServerUrl}/api/user/retrieve/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})

        console.log(data)
        setUser(data)

    }*/

    const createNew = async (datos) => {

        const config = {
            url: `${apiServerUrl}/New/create/`,
            method: 'POST',
            headers: {
            },
            data: {
                "new_title": datos.new_title,
                "new_image": datos.new_image,
                "new_description": datos.new_description
            }
        }

        const data = await makeRequest({config})

        console.log(data)

    }

    // const updateUser = async (datos, id) => {

    //     const config = {
    //         url: `${apiServerUrl}/api/user/update/${id}`,
    //         method: 'PUT',
    //         headers: {
    //         },
    //         data: {
    //             "user_type": 1,
    //             "name": datos.nombre,
    //             "city": datos.ciudad,
    //             "birth_date": datos.fecha,
    //             "sex": datos.sexo
    //         }
    //     }

    //     const data = await makeRequest({config})

    //     console.log(data)

    // }

    // const createAccount = async (datos, id, email) => {

    //     const config = {
    //         url: `${apiServerUrl}/api/account/create/`,
    //         method: 'POST',
    //         headers: {},
    //         data: {
    //             "user_id": id,
    //             "user_type": 1,
    //             "password": "basic",
    //             "email": email,
    //             "user_status": true
    //         }
    //     }

    //     const data = await makeRequest({config})

    //     console.log(data)

    //     createUser(datos, id)

    // }
    
    return {
        createNew,
    }
}