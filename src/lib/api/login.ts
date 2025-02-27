import { LoginRequestBody } from "@/pages/api/auth/login";
import api from "./http-common";
import { AxiosResponse } from "axios";

const login = (data: LoginRequestBody): ApiClientReturnType<LoginSuccessType> =>
  api.post('/api/auth', data)

export const LoginService = {
  login
}

export interface LoginSuccessType {
  message: string,
  token: string
}

export type ApiClientReturnType<T> = Promise<AxiosResponse<T>>;