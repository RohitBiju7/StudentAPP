import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("logintoken");
    if (accessToken && config) {
      config.headers = config.headers || {};
      config.headers.token = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;