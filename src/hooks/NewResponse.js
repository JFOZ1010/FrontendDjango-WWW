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

    const allNew = async () => {

        const config = {
            url: `${apiServerUrl}/New/all/`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})

        console.log(data)
        return data;

    } 

    const getNew = async (id, setNew) => {

        const config = {
            url: `${apiServerUrl}/New/get/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})

        console.log(data)
        setNew(data)

    }

    const createNew = async (datos) => {

        const config = {
            url: `${apiServerUrl}/New/create/`,
            method: 'POST',
            headers: {
            },
            data: {
                "new_title": datos.new_title,
                "new_image": "IMAGEN GENERICA",
                "new_description": JSON.stringify(datos.new_description)
            }
        }

        const data = await makeRequest({config})

        console.log(data)

    }

    const updateNew = async (datos, id) => {

        const config = {
            url: `${apiServerUrl}'New/delete/${id}`,
            method: 'PUT',
            headers: {
            },
            data: {
                "new_id": id,
                "new_date": datos.new_date,
                "new_title": datos.new_title,
                "new_image": "IMAGEN GENERICA",
                "new_description": JSON.stringify(datos.new_description)
            }
        }

        const data = await makeRequest({config})

        console.log(data)

    }

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
        allNew,
        updateNew,
        getNew,
    }
}