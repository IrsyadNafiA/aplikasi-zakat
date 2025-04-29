import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { RHFTextField } from "../FormControl";

const Fidyah = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        my: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Fidyah/Kifarat
      </Typography>
      <Grid container spacing={2}>
        {/* Nisab Section - Start */}
        <Grid size={6}>
          <RHFTextField
            label="Nisab"
            name="fidyah.nisab"
            type="number"
            variant="outlined"
            defaultValue=""
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">hari</InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        {/* Nisab Section - End */}
        {/* Harga Section - Start */}
        <Grid size={6}>
          <RHFTextField
            label="Harga"
            name="fidyah.harga"
            type="number"
            variant="outlined"
            defaultValue=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        {/* Harga Section - End */}
        {/* Jumlah Section - Start */}
        <Grid size={12}>
          <RHFTextField
            label="Jumlah"
            name="fidyah.jumlah"
            type="number"
            variant="outlined"
            defaultValue=""
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
                readOnly: true,
              },
            }}
          />
        </Grid>
        {/* Jumlah Section - End */}
      </Grid>
    </Box>
  );
};

const Infaq = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Infaq/Sadaqah
      </Typography>
      <RHFTextField
        label="Jumlah"
        name="infaq.jumlah"
        type="number"
        variant="outlined"
        defaultValue=""
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">Rp.</InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export { Fidyah, Infaq };
