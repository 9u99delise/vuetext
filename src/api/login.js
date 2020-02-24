import axios from 'axios'
export function login(data) {
    return axios({
        method: 'post',
        url: process.env.VUE_APP_URL + '/login',
        data,
        withCredentials: true,
    })
}