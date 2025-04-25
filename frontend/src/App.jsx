import { lazy } from "react";
import { createBrowserRouter } from "react-router";

// Lazy loaded pages
const Home = lazy(() => import("./pages/home/Home.jsx"));
const AuthLayout = lazy(() => import("./pages/auth/AuthLayout.jsx"));
const DashboardLayout = lazy(() =>
  import("./pages/dashboard/DashboardLayout.jsx")
);

// Pages
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Logout from "./pages/auth/Logout.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import BayarZakat from "./pages/zakat/BayarZakat.jsx";
import ListZakat from "./pages/zakat/ListZakat.jsx";

const App = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "logout",
        Component: Logout,
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
    ],
  },
  {
    path: "zakat",
    Component: DashboardLayout,
    children: [
      {
        path: "bayar-zakat",
        Component: BayarZakat,
      },
      {
        path: "list-zakat",
        Component: ListZakat,
      },
    ],
  },
]);

export default App;
