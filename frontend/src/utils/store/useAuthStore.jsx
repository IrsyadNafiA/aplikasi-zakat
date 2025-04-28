import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const apiUrl = import.meta.env.VITE_API_URL;

const authAxios = axios.create({
  baseURL: apiUrl,
});

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      loading: false,

      // LOGIN
      login: async (email, password, showNotification) => {
        set({ loading: true });
        try {
          const response = await authAxios.post(`${apiUrl}/auth/login`, {
            email,
            password,
          });
          const { accessToken, refreshToken } = response.data.payload;

          // Set token to header
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // Simpan token ke localStorage
          set({ accessToken, refreshToken, loading: false });

          if (showNotification) showNotification("Login berhasil!", "success");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
          // FETCH USER
          await get().getProfile();
        } catch (error) {
          set({ loading: false });
          console.log(error);
          if (showNotification)
            showNotification(error.response.data.message, "failed");
        }
      },

      // GET PROFILE
      getProfile: async () => {
        try {
          const response = await authAxios.get(`${apiUrl}/auth/me`);
          const user = response.data.payload;

          set({ user });
        } catch (error) {
          console.error("getProfile error: ", error);
          set({ user: null });
        }
      },

      // REFRESH TOKEN
      refresh: async () => {
        try {
          const { refreshToken } = get();
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await authAxios.post(`${apiUrl}/auth/refresh`, {
            refreshToken,
          });
          const { accessToken } = response.data.payload;

          // update token baru
          set({ accessToken });
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return accessToken;
        } catch (error) {
          get().logout(); //kalau gagal refresh paksa logout
          throw error;
        }
      },

      // LOGOUT
      logout: async () => {
        try {
          const { refreshToken } = get();

          // Jika tidak ada refresh token, logout langsung
          if (!refreshToken) {
            set({ accessToken: null, refreshToken: null, user: null });
            delete authAxios.defaults.headers.common["Authorization"];
            localStorage.clear();
            return;
          }

          // Jika ada refresh token, coba logout melalui API
          await authAxios.post(`${apiUrl}/auth/logout`);
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Apapun yang terjadi, tetap logout
          set({ accessToken: null, refreshToken: null, user: null });
          delete authAxios.defaults.headers.common["Authorization"];
          localStorage.clear();
        }
      },
    }),
    {
      name: "auth-storage", //localStorage key
      getStorage: () => localStorage,
    }
  )
);

// Interceptors untuk auto refresh
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await useAuthStore.getState().refresh();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { authAxios };
export default useAuthStore;
