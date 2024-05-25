import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from '../redux/store';
import { get, set } from 'lodash';

export function createAxiosInstance(baseURL = process.env.REACT_APP_URL_API) {
  return Axios.create({
    timeout: 60000,
    baseURL: `${baseURL}/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

const axiosInstance = createAxiosInstance();

export function addRequestInterceptor(instance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
      const state = store.getState();

      const accessToken = get(state, 'auth.token');
      if (accessToken) {
        set(config, 'headers.Authorization', `Bearer ${accessToken}`);
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return instance;
}

export default addRequestInterceptor(axiosInstance);

// axiosInstance.interceptors.request.use(
//     async config => {
//         const requestConfig = config;
//         if (localStorage.getItem('auth.token')) {
//             requestConfig.headers = {
//                 ...requestConfig.headers,
//                 Authorization: `Bearer ${localStorage.getItem('auth.token')}`,
//             } as AxiosRequestHeaders;
//         }
//
//         return requestConfig;
//     },
//     err => {
//         return Promise.reject(err);
//     },
// );
