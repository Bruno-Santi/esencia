import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const baseURL = API_URL;
console.log(API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const storedTokenScrum = localStorage.getItem("authToken");
    if (storedTokenScrum) {
      const cleanedToken = storedTokenScrum.replace(/^"(.*)"$/, "$1");
      config.headers.Authorization = `Bearer ${cleanedToken}`;
    }
    const storedTokenUser = localStorage.getItem("userToken");
    if (storedTokenUser) {
      const cleanedToken = storedTokenUser.replace(/^"(.*)"$/, "$1");
      config.headers.Authorization = `Bearer ${cleanedToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;
