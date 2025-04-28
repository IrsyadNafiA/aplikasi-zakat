import { Alert, Button, Snackbar, Typography } from "@mui/material";
import useAuthStore from "../../utils/store/useAuthStore";
import { useEffect } from "react";
import Notification from "../../components/Notification";
import useNotificationStore from "../../utils/store/useNotificationStore";

const Dashboard = () => {
  const { user, getProfile } = useAuthStore();
  const { showNotification } = useNotificationStore();

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [getProfile, user]);

  const handleClick = () => {
    showNotification("Anjay kebuka", "success");
  };

  return (
    <>
      <Typography variant="h5">Dashboard</Typography>
      <Typography variant="body1">Selamat datang, {user?.nama}</Typography>
      <Button variant="contained" color="info" onClick={handleClick}>
        Tes alert
      </Button>
    </>
  );
};

export default Dashboard;
