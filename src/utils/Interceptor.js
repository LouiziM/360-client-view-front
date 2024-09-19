import axios from "axios";
import Cookies from "js-cookie";

const myAxios = axios.create({
    baseURL: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

myAxios.interceptors.request.use(async function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

myAxios.interceptors.response.use(async function (config) {

    return config;
}, function (error) {
    if (error?.response) {
        if (error?.response?.status === 401) {
            localStorage.clear();
            sessionStorage.clear();
            Cookies.remove('token_cdp');
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});

export { myAxios };