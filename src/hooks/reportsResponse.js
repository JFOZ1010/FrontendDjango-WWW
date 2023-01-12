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

    const getItemByCat = async (type, setData) => {

        const config = {
            url: `${apiServerUrl}/api/report/itembycat`,
            method: 'POST',
            headers: {
            },
            data: {
                "type_id": type
            }
        }
        
        const data = await makeRequest({config})

        if (JSON.stringify(data) !== '{"err":"No se ha encontrado los datos"}') {
            setData(data)
        } else {
            setData(0)
        }

    }

    return {
        getItemByCat
    }
}