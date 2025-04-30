import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { RHFTextField } from "../FormControl";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

const Fidyah = () => {
  const { control, setValue, getValues } = useFormContext();
  const nisab = useWatch({ control, name: "fidyah.nisab" });

  useEffect(() => {
    const jmlNisab = parseInt(nisab || 0) + 3 - 3;
    const harga = parseFloat(getValues("fidyah.harga") || 0);
    const jumlah = jmlNisab * harga;

    setValue("fidyah.jumlah", jumlah);
  }, [getValues, nisab, setValue]);

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
        {/* Harga Section - Start */}
        <Grid size={6}>
          <RHFTextField
            label="Harga"
            name="fidyah.harga"
            type="number"
            variant="outlined"
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
        {/* Nisab Section - Start */}
        <Grid size={6}>
          <RHFTextField
            label="Nisab"
            name="fidyah.nisab"
            type="number"
            variant="outlined"
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
        {/* Jumlah Section - Start */}
        <Grid size={12}>
          <RHFTextField
            label="Jumlah"
            name="fidyah.jumlah"
            type="number"
            variant="outlined"
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
        defaultValue={0}
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
