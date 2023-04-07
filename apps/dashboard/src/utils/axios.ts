import axios from "axios";
import { env } from "../env";

export const axiosInstance = axios.create({ baseURL: env.VITE_BASE_API_URL });
