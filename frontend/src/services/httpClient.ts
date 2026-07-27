import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';
import type { ApiResponse } from '../types';

// 创建 axios 实例
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加 token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一错误处理
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // token 失效，清除登录信息
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/';
      }
      return Promise.reject({
        success: false,
        message: data?.message || '请求失败',
        data: null,
      });
    }
    return Promise.reject({
      success: false,
      message: '网络异常，请稍后重试',
      data: null,
    });
  }
);

// 通用请求方法
export async function request<T = unknown>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return httpClient(config) as unknown as Promise<ApiResponse<T>>;
}

export default httpClient;
