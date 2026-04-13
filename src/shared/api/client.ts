import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  if (process.env.EXPO_PUBLIC_API_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`;
  }
  return config;
});

