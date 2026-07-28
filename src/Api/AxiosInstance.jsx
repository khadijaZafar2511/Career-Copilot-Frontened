import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://career-copilot-backened.onrender.com",
  timeout: 5000,
    withCredentials: true,
  
});

