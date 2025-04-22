import { Outlet } from "react-router";
import usePageTitle from "../../utils/usePageTitle";

const AuthLayout = () => {
  usePageTitle();

  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
