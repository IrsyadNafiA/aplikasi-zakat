import { useNavigate } from "react-router";
import useAuthStore from "../../utils/store/useAuthStore";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate("/auth/login");
    };
    doLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
