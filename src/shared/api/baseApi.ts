import axios from "axios";
import { getCookie } from "cookies-next";

import { API_HOST } from "@/shared/config";

export const api = axios.create({
  baseURL: API_HOST,
});

api.interceptors.request.use((config) => {
  const jwt = getCookie("jwt");

  if (jwt) {
    config.headers["Authorization"] = `Bearer ${jwt}`;
  }

  return config;
});
