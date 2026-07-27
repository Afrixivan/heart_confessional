import { request } from './httpClient';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  ApiResponse,
} from '../types';

// 用户注册
export function register(data: RegisterRequest) {
  return request<AuthResponse['data']>({
    method: 'POST',
    url: '/auth/register',
    data,
  });
}

// 用户登录
export function login(data: LoginRequest) {
  return request<AuthResponse['data']>({
    method: 'POST',
    url: '/auth/login',
    data,
  });
}

// 匿名登录
export function anonymousLogin() {
  return request<AuthResponse['data']>({
    method: 'POST',
    url: '/auth/anonymous',
  });
}

// 获取用户信息
export function getUserInfo() {
  return request<User>({
    method: 'GET',
    url: '/auth/profile',
  });
}

// 退出登录
export function logout(): Promise<ApiResponse<null>> {
  return request<null>({
    method: 'POST',
    url: '/auth/logout',
  });
}
