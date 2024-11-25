import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/'
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers["Content-Type"] = "application/json"
    } else {
       // Do something... Usually logout user.
    }
    return config
  }
)

  export default instance