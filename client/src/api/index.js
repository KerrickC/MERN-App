
import axios from 'axios';

const header = {headers:{
    Authorization: `Bearer ${localStorage.getItem('token')}`
}}

const api = axios.create({
    baseURL: 'http://localhost:3004/api',
})

//axios calls, header is for jwt authentication
export const insertTest = (payload) => api.post(`/test`, payload, header);
export const getAllTests = () => api.get(`/tests`, header);
export const getTestById = (id) => api.get(`/test/${id}`, header);
export const deleteTestById = (id) => api.delete(`/test/${id}`, header);
