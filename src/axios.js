import axios from 'axios';

// 현재 환경이 'production'인지 확인 (npm run build 등으로 실행 시 자동 설정됨)
const isProduction = process.env.NODE_ENV === 'production';

// const instance = axios.create({
//   baseURL: isProduction 
//     ? 'http://examsite.duckdns.org'
//     : 'http://localhost:3000/'
// });
const instance = axios.create({
  baseURL: 'https://examsite.duckdns.org' // 일단 무조건 오라클 서버로 가게 수정
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