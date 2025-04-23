import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="div"
      sx={{
        width: 450,
        p: 4,
        color: "text.primary",
        bgcolor: "secondary.main",
        border: "2px dashed #2E7D32",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Login
      </Typography>
      {/* Email Section - Start */}
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircleIcon sx={{ mr: 1, my: 0.5 }} />
        <TextField
          fullWidth
          id="input-with-sx"
          label="Email"
          variant="standard"
          color="primary"
          type="email"
        />
      </Box>
      {/* Email Section - End */}
      {/* Password Section - Start */}
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <PasswordIcon sx={{ mr: 1, my: 0.5 }} />
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Typography fontSize={12}>
        Belum punya akun? <Link href="/auth/register">Daftar di sini</Link>
      </Typography>
      {/* Password Section - End */}
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default Login;
