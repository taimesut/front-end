import axios from "axios"
import cookie from 'react-cookies'

const BASE_URL = 'http://back-end-457180940.us-east-1.elb.amazonaws.com/DienToanDamMay';

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