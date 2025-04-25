import { Box, Button, Link, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/schema/authSchema";
import { RHFPasswordField, RHFTextField } from "../../components/FormControl";

const Login = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Login Berhasil");
    window.location.href = "/dashboard";
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          <Typography
            variant="h5"
            sx={{ textAlign: "center" }}
            fontWeight={"bold"}
          >
            Login
          </Typography>

          {/* Email Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircleIcon sx={{ mr: 1, my: 0.5 }} />
            <RHFTextField
              name="email"
              type="email"
              label="Email"
              color="primary"
            />
          </Box>
          {/* Email Section - End */}

          {/* Password Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PasswordIcon sx={{ mr: 1, my: 0.5 }} />
            <RHFPasswordField name="password" label="Password" />
          </Box>
          {/* Password Section - End */}

          <Button variant="contained" color="primary" type="submit">
            Masuk
          </Button>
          <Typography fontSize={12}>
            Belum punya akun? <Link href="/auth/register">Daftar di sini</Link>
          </Typography>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Login;
