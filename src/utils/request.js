import axios from 'axios'

let request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true,
})

import {
    getToken
} from '@/utils/token.js'

request.interceptors.request.use(config => {
    // Do something before request is sent
    config.headers.token = getToken();
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

export default request;