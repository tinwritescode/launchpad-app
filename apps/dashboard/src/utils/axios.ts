import axios from "axios";
import { env } from "../env";

export const TOKEN_KEY = "refine-auth";
export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const authData = localStorage.getItem("refine-auth");
  const auth = JSON.parse(authData || "{}");

  if (auth.jwtToken) {
    config.headers.Authorization = `Bearer ${auth.jwtToken}`;
  }

  return config;
});
