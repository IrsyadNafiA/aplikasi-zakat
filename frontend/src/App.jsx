import { createBrowserRouter } from "react-router";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import AuthLayout from "./pages/auth/AuthLayout.jsx";
import Register from "./pages/auth/Register.jsx";

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
    ],
  },
]);

export default App;
