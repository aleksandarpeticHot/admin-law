import { ENVIRONMENT } from "@/environment";
import axios from "axios";

const api = axios.create({
  baseURL: ENVIRONMENT.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

api.interceptors.request.use(request => {
  // No need to manually attach token, cookies are automatically included
  return request;
});

export default api