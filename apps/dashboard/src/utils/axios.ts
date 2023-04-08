import axios from "axios";
import { env } from "../env";
import { z } from "zod";

const getJwtToken = () => {
  const authData = localStorage.getItem("refine-auth");
  const auth = JSON.parse(authData || "{}");

  return auth.jwtToken;
};

export const TOKEN_KEY = "refine-auth";
export const axiosInstance = axios.create({
  baseURL: env.VITE_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  },
});
