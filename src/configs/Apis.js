import axios from "axios"
import cookie from 'react-cookies'

const BASE_URL = 'http://back-end-a5b1d0fc59885088.elb.us-east-1.amazonaws.com:8080/DienToanDamMay';

export const endpoints = {
    'register': '/register',
    'login': '/login',
    'load_databases': '/api/databases',
    'delete_database': (id) => `/api/databases/${id}`
};


export const authApis = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${cookie.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})