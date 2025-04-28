import { Alert, Snackbar } from "@mui/material";
import useNotificationStore from "../utils/store/useNotificationStore";

const Notification = () => {
  const { open, message, severity, closeNotification } = useNotificationStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={closeNotification}
        severity={severity}
        variant="standard"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
