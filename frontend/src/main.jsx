import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/theme.js";
import LoadingPage from "./components/LoadingPage.jsx";
import Notification from "./components/Notification.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={App} />
        {/* NOTIFICATION */}
        <Notification />
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);
