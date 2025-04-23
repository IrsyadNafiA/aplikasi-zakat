import { Outlet } from "react-router";
import usePageTitle from "../../utils/usePageTitle";
import { Container } from "@mui/material";

const AuthLayout = () => {
  usePageTitle();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
