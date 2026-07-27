import axios from "axios";
import { apiClient } from "./AxiosInstance";

let isRefreshing = false;
let failedQueue = [];

export const processQueue = (error) => {
  failedQueue.forEach(({ reject }) => reject(error));
  failedQueue = [];
};

export const setupInterceptors = (queryClient) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Grab the network status and message right at the top
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      // ==========================================
      // 1. AUTHENTICATION & REFRESH TOKEN HANDLING (401s)
      // ==========================================
      if (status === 401 && !originalRequest._retry) {
        // Guard against infinite loop if the refresh route itself fails
        if (originalRequest.url?.includes("/auth/refresh-token")) {
          if (queryClient) {
            queryClient.setQueryData(["user"], null);
            queryClient.removeQueries({ queryKey: ["myroadmaps"] });
            queryClient.removeQueries({ queryKey: ["myroadmap"] });
          }
          // Normalize the refresh token failure so it doesn't double-toast
          const authError = new Error("Session expired. Please log in again.");
          authError.status = 401;
          return Promise.reject(authError);
        }

        originalRequest._retry = true;

        // Queue subsequent requests if a refresh cycle is currently active
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => apiClient(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          // Use vanilla axios to bypass global interceptors during refresh
          await axios.post(
            `${apiClient.defaults.baseURL || ""}/auth/refresh-token`,
            {},
            { withCredentials: true },
          );

          isRefreshing = false;

          // Resolve all waiting requests in the queue
          failedQueue.forEach(({ resolve }) => resolve());
          failedQueue = [];

          return apiClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError);

          if (queryClient) {
            queryClient.setQueryData(["user"], null);
            queryClient.removeQueries({ queryKey: ["myroadmaps"] });
            queryClient.removeQueries({ queryKey: ["myroadmap"] });
          }

          // Normalize the catch block error structure cleanly
          const authError = new Error("Session expired. Please log in again.");
          authError.status = 401;
          return Promise.reject(authError);
        }
      }

      // ==========================================
      // 2. ERROR NORMALIZATION FOR ALL ROADBLOCKS (400, 403, 404, 500)
      // ==========================================
      // This is now in the correct main execution path!
      const fallbackMessages = {
        400: "Bad Request. Please check your submitted inputs.",
        403: "Access Denied. You do not have permission to view this.",
        404: "Requested resource could not be found.",
        500: "Internal Server Error. Our team has been notified.",
      };

      // Handle offline or dropped connection scenarios
      const calculatedStatus = status || (error.request ? 0 : 500);
      let finalMessage = serverMessage;

      if (!finalMessage) {
        if (calculatedStatus === 0) {
          finalMessage =
            "Network Connection Error. Please verify your internet connection.";
        } else {
          finalMessage =
            fallbackMessages[calculatedStatus] ||
            "An unexpected error occurred.";
        }
      }

      const normalizedError = new Error(finalMessage);
      normalizedError.status = calculatedStatus;
      normalizedError.rawError = error;

      return Promise.reject(normalizedError);
    },
  );
};
