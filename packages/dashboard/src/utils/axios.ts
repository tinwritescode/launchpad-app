import axios from 'axios';
import { env } from '../env';
import { HttpError } from '@refinedev/core';

export const TOKEN_KEY = 'refine-auth';
export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const authData = localStorage.getItem('refine-auth');
  const auth = JSON.parse(authData || '{}');

  if (auth.jwtToken && config.headers) {
    config.headers.Authorization = `Bearer ${auth.jwtToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      message: error.response?.data?.msg || 'Something went wrong.',
      statusCode: error.response?.status || 500,
    };

    const data = error.response?.data;
    if (
      data?.code === 'BAD_REQUEST' &&
      data?.message?.includes('Input validation failed')
    ) {
      customError.message = data?.issues.map(
        (e: any) => `${e.path}: ${e.message}\n`
      );
      customError.statusCode = 400;
    }

    // This is the same as throw Error,
    // except the name property is set depending on the error type.
    return Promise.reject(customError);
  }
);
