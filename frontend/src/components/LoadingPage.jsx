import { Box, CircularProgress } from "@mui/material";

const LoadingPage = () => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress color="success" />
  </Box>
);

export default LoadingPage;
