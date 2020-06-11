import axios from "axios";

const header = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

//axios calls, header is for jwt authentication
export const insertTest = (payload) => {
  const postHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      User: `${localStorage.getItem("user")}`,
    },
  };
  return api.post(`/test`, payload, postHeader);
};
export const getAllTests = () =>
  api.get(`/tests`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      User: `${localStorage.getItem("user")}`,
    },
  });
export const getTestById = (id) => api.get(`/test/${id}`, header);
export const deleteTestById = (id) => api.delete(`/test/${id}`, header);
