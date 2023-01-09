import axios from 'axios'
import { useEnv } from '../context/env.context.js'

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


    const getItemsBySupplier = async (supId, top) => {

        const config = {
            url: `${apiServerUrl}/api/report/itemsBySupplier`,
            method: 'POST',
            headers: {},
            data: {
                "user_id" : supId,
                "top" : top
            }
        }

        const data = await makeRequest({config});

        return data
    }

    return {
        getItemsBySupplier
    }
}