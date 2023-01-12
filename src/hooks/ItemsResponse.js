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

    const ScrappingAmazon = async (setMessage) => {

        const config = {
            url: `${apiServerUrl}/api/item/scrapping/amazon`,
            method: 'POST',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })
        
        // console.log(data)
        if (data.res === 200) {
            setMessage({ 'message': 'Los datos de Amazon han sido scrapeados', 'res': 0 })
        } else {
            setMessage({ 'message': 'Ha sucedido algún error', 'res': 1})
        }

    }

    const ScrappingMercadolibre = async (setMessage) => {

        const config = {
            url: `${apiServerUrl}/api/item/scrapping/mercadolibre`,
            method: 'POST',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })
        
        // console.log(data)
        if (data.res === 200) {
            setMessage({ 'message': 'Los datos de Mercadolibre han sido scrapeados', 'res': 0 })
        } else {
            setMessage({ 'message': 'Ha sucedido algún error', 'res': 1})
        }

    }

    const ScrappingNewegg = async (setMessage) => {

        const config = {
            url: `${apiServerUrl}/api/item/scrapping/newegg`,
            method: 'POST',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })
        
        // console.log(data)
        if (data.res === 200) {
            setMessage({ 'message': 'Los datos de Newegg han sido scrapeados', 'res': 0 })
        } else {
            setMessage({ 'message': 'Ha sucedido algún error', 'res': 1})
        }

    }

    const UpdateClicItem = async (idItem) => {

        const config = {
            url: `${apiServerUrl}/api/item/update/clic/${idItem}`,
            method: 'PUT',
            headers: {},
            data: {}
        }

        const data = await makeRequest({ config })
        
        return data
        

    }



    return {
        allItems,
        ScrappingAmazon,
        ScrappingMercadolibre,
        ScrappingNewegg,
        UpdateClicItem
    }
}