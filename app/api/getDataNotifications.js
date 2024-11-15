import axios from "./axios";

export const getDataNotifications = async () => {  
    try {
        const result = await axios.get("getNotifications");
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