import axios from 'axios'
import { useEnv } from '../context/env.context'

export const useExternalApiItem = () => {

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

    const allItems = async (setItem) => {

        const config = {
            url: `${apiServerUrl}/api/item/allItems`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })

        console.log(data)
        setItem(data);

    }



    return {
        allItems,
    }
}