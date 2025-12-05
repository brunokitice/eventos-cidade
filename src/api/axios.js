import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000"
});

api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    console.error("Erro de API:", err?.response || err?.message);
    return Promise.reject(err);
  }
);
