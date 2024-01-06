import axios from "axios";

//% FACU_EDIT

export const baseURL = `http://localhost:3000`;
// "https://esencia-api-1b5d609d081b.herokuapp.com";
//  "https://9qhvw5j9-3000.brs.devtunnels.ms";
//% END

const api = axios.create({
  baseURL,
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
