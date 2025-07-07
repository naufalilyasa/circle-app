import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${baseUrl}api/v1`,
  withCredentials: true,
});

export default api;
