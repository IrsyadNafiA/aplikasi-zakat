import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const apiUrl = import.meta.env.VITE_API_URL;

// Axios instance untuk authenticated requests
const authAxios = axios.create({
  baseURL: apiUrl,
});

// inject accessToken dari local storage ke authAxios agar tidak 401 saat load page yang manggil API dengan authentication
const authStorage = localStorage.getItem("auth-storage");

if (authStorage) {
  try {
    const parsedStorage = JSON.parse(authStorage);
    const accessToken = parsedStorage?.state?.accessToken;
    if (accessToken) {
      authAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error("Failed to parse auth storage:", error);
  }
}

// Zustand store
const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      loading: false,
      error: null,

      // LOGIN
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await authAxios.post("/auth/login", {
            email,
            password,
          });

          const { accessToken, refreshToken } = response.data.payload;

          // Set token ke authAxios
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // Simpan token ke store
          set({ accessToken, refreshToken, loading: false, error: null });

          // FETCH USER
          await get().getProfile();
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Login failed",
          });
          console.error(error.response?.data?.message || error.message);
        }
      },

      // GET PROFILE
      getProfile: async () => {
        const { accessToken } = get();
        if (!accessToken) return; // biar tidak ada unauthorized saat logout atau belum login

        try {
          const response = await authAxios.get("/auth/me");
          set({ user: response.data.payload });
        } catch (error) {
          console.error("Get profile error:", error);
          set({ user: null });
        }
      },

      // REFRESH TOKEN
      refresh: async () => {
        try {
          const { refreshToken } = get();
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await authAxios.post("/auth/refresh", {
            refreshToken,
          });
          const { accessToken } = response.data.payload;

          // Update access token
          set({ accessToken });
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return accessToken;
        } catch (error) {
          console.error("Refresh token error:", error);
          await get().forceLogout();
          throw error;
        }
      },

      // LOGOUT (dengan call API)
      logout: async () => {
        try {
          const { refreshToken } = get();
          if (refreshToken) {
            await authAxios.post("/auth/logout");
          }
        } catch (error) {
          console.error("Logout API error:", error);
        } finally {
          get().forceLogout();
        }
      },

      // FORCE LOGOUT (tanpa call API)
      forceLogout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
        delete authAxios.defaults.headers.common["Authorization"];

        // Clear hanya auth-storage
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // Key untuk persist
      getStorage: () => localStorage,
    }
  )
);

// Interceptors untuk auto-refresh token
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken } = useAuthStore.getState();
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (!refreshToken) return Promise.reject(error);

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
