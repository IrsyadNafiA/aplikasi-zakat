import { create } from "zustand";

const useNotificationStore = create((set) => ({
  open: false,
  message: "",
  severity: "success",

  showNotification: (message, severity = "success") => {
    set({ open: true, message, severity });
  },

  closeNotification: () => set({ open: false }),
}));

export default useNotificationStore;
