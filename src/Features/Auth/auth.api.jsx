import { apiClient } from "../../Api/AxiosInstance";

const registerData = async (data) => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

const loginData = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

const logout = async () => {
  const response = await apiClient.post("/auth/logout");
};
const userData = async () => {
  const userData = await apiClient.get("/me");
  return userData.data;
};

export { registerData, loginData, userData, logout };
