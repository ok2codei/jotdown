import type { AuthData, ApiResponse, LoginFormData,RegisterFormData } from "../types/auth";
import api from "./api";

export const LoginUser = async (data: LoginFormData) => {
  const res = await api.post<ApiResponse<AuthData>>("/login", data);
  return res.data.data; 
};

export const RegisterUser = async (data: RegisterFormData) => {
  const res = await api.post<ApiResponse<AuthData>>("/register", data);
  return res.data.data;
};