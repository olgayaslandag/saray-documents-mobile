import axios, { prefix } from './axios';

export const offerListApi = async (token, id) => {  
    axios.defaults.headers.Authorization = prefix + token;
    try {
        const result = await axios.get("offer/" + id);
        return {
            status: true,
            data: result.data,
            message: null,
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const UploadApi = async (data, token) => {
    axios.defaults.headers.Authorization = prefix + token;
    try {
        const result = await axios.post('offer/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return {
            status: true,
            data: result.data,
            message: "Tebrikler, teklifiniz iletildi.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                data: error.response.data.errors ?? null,
                message: typeof error.response.data === "string" ? error.response.data : "Teklif iletilemedi!"
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