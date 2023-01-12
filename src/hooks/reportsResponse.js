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

    const itemPriceReport = async (setReport,itemId) => {

        const config = {
            url: `${apiServerUrl}/api/report/itemPrice?item_id=${itemId}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })

        console.log(data)
        setReport(data);

    }


    return {
        itemPriceReport,
    }
}