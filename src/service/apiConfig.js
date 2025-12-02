// src/service/apiConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_SERVER_URL,
});

// 🔒 Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // <- you are saving `token` in auth

    if (!config) config = {};
    if (!config.headers) config.headers = {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = "application/json";

    // Debug
    // console.log("➡️ API REQUEST:", config.method?.toUpperCase(), config.url);
    // console.log("   Authorization:", config.headers.Authorization);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ❗ IMPORTANT: no response interceptor, no custom cancelToken stuff

export default api;
