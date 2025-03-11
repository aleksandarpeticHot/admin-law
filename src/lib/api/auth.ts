import api from "./http-common";
import { AxiosResponse } from "axios";

const login = (data: { email: string, password: string }): ApiClientReturnType<LoginSuccessType> =>
  api.post('/auth/login', data)

const logout = (): ApiClientReturnType<{ message: string }> =>
  api.post('/auth/logout')

export const AuthService = {
  login,
  logout
}

export interface LoginSuccessType {
  message: string,
  token: string
}

export type ApiClientReturnType<T> = Promise<AxiosResponse<T>>;