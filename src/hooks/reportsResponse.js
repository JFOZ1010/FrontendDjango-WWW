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


    const getItemsBySupplier = async (supId, top, setItemList) => {

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
        // console.log(JSON.stringify(data))
        if (JSON.stringify(data) !== '"No hay items para mostrar"') {
            // console.log(data)
            setItemList(data)
        // eslint-disable-next-line no-use-before-define
        } else {
            // console.log("no entró al if")
            setItemList(false)
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
        itemPriceReport,
        getItemsBySupplier,
        getItemByCat
    }
}