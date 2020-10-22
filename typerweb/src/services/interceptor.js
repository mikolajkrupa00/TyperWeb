import Axios from 'axios';
import { localStorageService } from './localStorageService';
const setupAxiosInterceptors = () => {
  Axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorageService.token}`;
    if (config.url[0] === '/') {
      config.url = `http://localhost:5000/api${config.url}`;
      console.log(config.url);
      console.log(config.headers);
      return config;
    }
  });
  Axios.interceptors.request.use(
    (cf) => cf,
    (cf) => cf
  );
};

export { setupAxiosInterceptors };
