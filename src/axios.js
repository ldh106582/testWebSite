import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:3000/'
});

axios.interceptors.request.use(function (res) {
    
    return res;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

   
  export default instance