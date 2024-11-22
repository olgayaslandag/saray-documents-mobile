import axios, { prefix } from './axios';


export const LoginApi = async (data) => {
    try {
        const result = await axios.post('auth/login', JSON.stringify(data));

        return {
            status: true,
            data: result.data,
            message: "Tebrikler, giriş yapıyorsunuz.",
        };
    } catch(error){
        console.log(error)
        if(error.response){
            return {
                status: false,
                data: error.response.data.errors ?? null,
                message: typeof error.response.data === "string" ? error.response.data : "Giriş yapılamadı!"
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

export const LogoutApi = async (token) => {
    axios.defaults.headers.Authorization = prefix + token;

    try {
        const result = await axios.get('auth/logout');

        return {
            status: true,
            data: result.data,
            message: "Tebrikler, çıkış yapıyorsunuz.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                data: error.response.data.errors ?? null,
                message: typeof error.response.data === "string" ? error.response.data : "Çıkış yapılamadı!"
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
                data: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const RegisterApi = async (data) => {
    try {
        const result = await axios.post('auth/register', JSON.stringify(data));
        return {
            status: true,
            data: result.data,
            message: "Tebrikler, kaydınız başarıyla gerçekleştirildi.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: error.response.data.errors ? error.response.data.errors : null,
                message: typeof error.response.data === "string" ? error.response.data : "Kayıt işlemi başarısız!"
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

export const ForgetApi = async (data) => {
    try {
        const result = await axios.post('auth/forget', JSON.stringify(data));
        return {
            status: true,            
            message: result.data,
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: error.response.data.errors ? error.response.data.errors : null,
                message: typeof error.response.data === "string" ? error.response.data : "Gönderim işlemi başarısız!"
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