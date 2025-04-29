import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import { RHFTextField } from "../FormControl";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFieldArray, useFormContext } from "react-hook-form";

const ZakatUang = () => {
  const { control, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "zakatData.zakatList",
  });

  const handleInputChange = (index, field, value) => {
    // Set nilai field (nama, hubungan, harga)
    setValue(`zakatData.zakatList.${index}.${field}`, value);

    // Jika yang diubah adalah harga, update jumlah (harga * 2.5)
    if (field === "harga") {
      const harga = parseFloat(value) || 0;
      const jumlah = harga * 2.5;
      setValue(`zakatData.zakatList.${index}.jumlah`, jumlah);
      setValue(`zakatData.zakatList.${index}.nisab`, 2.5); // Set nisab default
    }
  };

  const tambahData = () => {
    append({
      nama: "",
      hubungan: "",
      harga: 0,
      jumlah: 0,
      nisab: 2.5,
    });
  };

  return (
    <>
      <Typography variant="h6" fontWeight={600} marginY={2}>
        Zakat
      </Typography>
      <Button
        variant="contained"
        color="info"
        onClick={tambahData}
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
      >
        Tambah Data Keluarga
      </Button>

      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={400}>
              Keluarga {index + 1}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => remove(index)}
            >
              <HighlightOffIcon fontSize="small" />
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid size={8}>
              <RHFTextField
                label="Nama"
                name={`zakatData.zakatList.${index}.nama`}
                variant="outlined"
                onChange={(e) =>
                  handleInputChange(index, "nama", e.target.value)
                }
              />
            </Grid>
            <Grid size={4}>
              <RHFTextField
                label="Hubungan"
                name={`zakatData.zakatList.${index}.hubungan`}
                variant="outlined"
                onChange={(e) =>
                  handleInputChange(index, "hubungan", e.target.value)
                }
              />
            </Grid>
            <Grid size={4}>
              <RHFTextField
                label="Nisab"
                name={`zakatData.zakatList.${index}.nisab`}
                variant="outlined"
                type="number"
                defaultValue={2.5}
                slotProps={{
                  input: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <RHFTextField
                label="Harga"
                name={`zakatData.zakatList.${index}.harga`}
                variant="outlined"
                type="number"
                onChange={(e) =>
                  handleInputChange(index, "harga", e.target.value)
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">Rp.</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <RHFTextField
                label="Jumlah"
                name={`zakatData.zakatList.${index}.jumlah`}
                variant="outlined"
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">Rp.</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default ZakatUang;
