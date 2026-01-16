import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

// const instance = axios.create({
//   baseURL: isProduction 
//     ? 'http://examsite.duckdns.org'
//     : 'http://localhost:3000/'
// });
const instance = axios.create({
  baseURL: isProduction ? "https://examwebsite-1993.duckdns.org" : '/',
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;