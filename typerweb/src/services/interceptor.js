import Axios from 'axios';
import { toast } from 'react-toastify';

import { localStorageService } from './localStorageService';


const onResponseSuccess = cfg => (cfg);
const onResponseFailed = cfg => {
  if (cfg.response && cfg.response.data && cfg.response.data.error)
    toast.error(cfg.response.data.error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return Promise.reject(cfg);
}

const setupAxiosInterceptors = () => {
  Axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorageService.token}`;
    if (config.url[0] === '/') {
      config.url = `http://localhost:5000/api${config.url}`;
      return config;
    }
    return config;
  });
  Axios.interceptors.request.use(
    (cf) => cf,
    (cf) => cf
  );
  Axios.interceptors.response.use(onResponseSuccess, onResponseFailed)
};

export { setupAxiosInterceptors };
