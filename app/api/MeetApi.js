import axios, { prefix } from './axios';


export const MeetsApi = async ({auth}) => {
    axios.defaults.headers.Authorization = prefix + auth.token;

    try {
        const result = await axios.get('meet/' + auth.id, );

        return {
            status: true,
            data: result.data,
            message: ""
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                data: error.response.data.errors ?? null,
                message: typeof error.response.data === "string" ? error.response.data : "Bir sorun oluştu!"
            }
        }else if(error.request){
            return {
                status: false,
                data: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                data: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const MeetStoreApi = async ({token, data}) => {
    axios.defaults.headers.Authorization = prefix + token;

    try {
        const result = await axios.post('meet/store', JSON.stringify(data));

        return {
            status: true,
            data: result.data,
            message: "Tebrikler, talebiniz başarılı bir şekilde gönderildi!"
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                data: error.response.data.errors ?? null,
                message: typeof error.response.data === "string" ? error.response.data : "Bir sorun oluştu!"
            }
        }else if(error.request){
            return {
                status: false,
                data: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                data: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}