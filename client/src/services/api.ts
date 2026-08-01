import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- Request Interceptor --------------------------


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================= Refresh Token Logic =========================

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[]= [];

const processQueue = (
  error: any,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};


//========================= Response Interceptor=================
api.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      if (isRefreshing) {

        return new Promise((resolve, reject) => {

          failedQueue.push({
            resolve: (token: string) => {

              originalRequest.headers.Authorization =
                `Bearer ${token}`;

              resolve(api(originalRequest));

            },
            reject,
          });

        });

      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {

        const refreshToken =
          localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token.");
        }

        const response = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const newAccessToken =
          response.data.accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        api.defaults.headers.Authorization =
          `Bearer ${newAccessToken}`;

        processQueue(
          null,
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {

        processQueue(err, null);

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        window.location.href = "/login";

        return Promise.reject(err);

      } finally {

        isRefreshing = false;

      }

    }

    return Promise.reject(error);

  }
);

export default api;
