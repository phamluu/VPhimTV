import axios, { AxiosError } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const data = error.response?.data;

    if (data && typeof data === 'object' && 'message' in data) {
      return Promise.reject(data);
    }
    return Promise.reject(error);
  },
);

export default http;
