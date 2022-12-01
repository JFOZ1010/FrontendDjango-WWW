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

    const allNew = async (setNew1) => {

        const config = {
            url: `${apiServerUrl}/api/new/all`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })

        // const array = []
        // for (var i = 0; i <= data.length; i++) {

        //     array.push(data[i])

        // }

        console.log(data)
        setNew1(data);

    }

    const getNew = async (id, setNoticia) => {

        const config = {
            url: `${apiServerUrl}/api/new/get/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })

        console.log(data)
        setNoticia(data)

    }

    const createNew = async (datos) => {

        const config = {
            url: `${apiServerUrl}/api/new/create`,
            method: 'POST',
            headers: {
            },
            data: {
                "new_title": datos.new_title,
                "new_image": "IMAGEN GENERICA",
                "new_description": JSON.stringify(datos.new_description)
            }
        }

        const data = await makeRequest({ config })

        console.log(data)

    }

    const updateNew = async (datos, id) => {
        console.log(typeof (id))
        console.log(datos.new_title)
        console.log(JSON.stringify(datos.new_description))

        const config = {
            url: `${apiServerUrl}/api/new/update/${id}`,
            method: 'PUT',
            headers: {
            },
            data: {
                "new_title": datos.new_title,
                "new_image": "IMAGEN GENERICA",
                "new_description": JSON.stringify(datos.new_description)
            }
        }

        const data = await makeRequest({ config })

        console.log(data)

    }

    const deleteNew = async (id) => {
        const config = {
            url: `${apiServerUrl}/api/new/delete/${id}`,
            method: 'DELETE',
            headers: {
            },
            data: {}
        }
        const data = await makeRequest({ config })
        console.log(data)
        return {noticia:"Borrada"}

    }


    return {
        createNew,
        allNew,
        updateNew,
        getNew,
        deleteNew
    }
}