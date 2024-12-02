import axios from "axios";

axios.defaults.baseURL = "https://3b17-195-214-190-143.ngrok-free.app/api";
//axios.defaults.baseURL = "https://drive.saray.com/api";
axios.defaults.timeout = 50000;
axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true,
}

export default axios;
export const prefix = "Bearer ";