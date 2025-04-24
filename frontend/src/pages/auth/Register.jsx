import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/schema/authSchema";
import {
  RHFPasswordField,
  RHFSelectField,
  RHFTextField,
} from "../../components/FormControl";

// Icon
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

const options = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

const Register = () => {
  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    const insertData = {
      ...data,
      isAdmin: 1,
    };
    console.log(insertData);
    alert("Register Berhasil");
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
            Buat Akun
          </Typography>

          {/* Nama Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <BadgeIcon sx={{ mr: 1, my: 0.5 }} />
            <RHFTextField name="nama" label="Nama" color="primary" />
          </Box>
          {/* Nama Section - End */}

          {/* Email Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AlternateEmailIcon sx={{ mr: 1, my: 0.5 }} />
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

          {/* Confirm Password Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PasswordIcon sx={{ mr: 1, my: 0.5 }} />
            <RHFPasswordField name="confirmPassword" label="Confirm Password" />
          </Box>
          {/* Confirm Password Section - End */}

          {/* No. Handphone Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PhoneIcon sx={{ mr: 1, my: 0.5 }} />
            <RHFTextField
              name="no_hp"
              label="No. Handphone"
              type="number"
              color="primary"
            />
          </Box>
          {/* No. Handphone Section - End */}

          {/* Alamat Section - Start */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <HomeIcon sx={{ mr: 1, my: 0.5 }} />
            <RHFTextField
              name="alamat"
              label="Alamat"
              color="primary"
              multiline
              maxRows={2}
            />
          </Box>
          {/* Alamat Section - End */}

          {/* RT & RW Section - Start */}
          <Grid container spacing={2}>
            <Grid size={6}>
              {/* RW Section - Start */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <HomeIcon sx={{ mr: 1, my: 0.5 }} />
                <RHFTextField
                  name="rw"
                  label="RW"
                  type="number"
                  color="primary"
                />
              </Box>
              {/* RW Section - End */}
            </Grid>
            <Grid size={6}>
              {/* RT Section - Start */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <HomeIcon sx={{ mr: 1, my: 0.5 }} />
                <RHFTextField
                  name="rt"
                  label="RT"
                  type="number"
                  color="primary"
                />
              </Box>
              {/* RT Section - End */}
            </Grid>
          </Grid>
          {/* RT & RW Section - End */}

          <RHFSelectField label="RW" name="rw" options={options} />

          <Button variant="contained" color="primary" type="submit">
            Buat Akun
          </Button>
          <Typography fontSize={12}>
            Sudah punya akun? <Link href="/auth/login">Log In</Link>
          </Typography>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Register;
