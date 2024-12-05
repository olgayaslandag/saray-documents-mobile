import axios from "axios";

axios.defaults.baseURL = "https://drive.saray.com/api";
axios.defaults.timeout = 50000;
axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true,
}

export default axios;
export const prefix = "Bearer ";