import { ENVIRONMENT } from "@/environment";
import axios from "axios";

const api = axios.create({
  baseURL: ENVIRONMENT.API_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

api.interceptors.request.use(request => {
  const token = localStorage.getItem('token')

  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

export default api