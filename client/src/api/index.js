import React from 'react';

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3003/api',
})

export const insertTest = (payload) => api.post(`/test`, payload);
export const getAllTests = () => api.get(`/tests`);
export const getTestById = (id) => api.get(`/test/${id}`);
export const deleteTestById = (id) => api.delete(`/test/${id}`);