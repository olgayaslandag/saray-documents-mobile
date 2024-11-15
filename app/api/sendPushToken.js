import axios from "./axios";

export const sendPushToken = async ({ token }) => {
    try {
        const result = await axios.get("getPushToken/" + token);
        return result.data;
    } catch(error){
        console.log(error)
    }
}