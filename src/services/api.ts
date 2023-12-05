import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { getAuthToken } from './token';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_APP_API_URL as string;
const REQUEST_TIMEOUT = 5000;
const StatusCode: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  StatusCode[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message: string }>) => {
      if (error?.response && shouldDisplayError(error.response)) {
        const errorMessage = error.response.data.message;
        toast.warn(errorMessage);
      }
      return Promise.reject(error);
    }
  );

  return api;
};
