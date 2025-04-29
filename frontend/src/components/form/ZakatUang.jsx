import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import { RHFTextField } from "../FormControl";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ZakatUang = () => {
  const [pesertaList, setPesertaList] = useState([
    { nama: "", hubungan: "", harga: 0, jumlah: 0 },
  ]);

  const handleInputChange = (index, field, value) => {
    const newList = [...pesertaList];
    newList[index][field] = value;

    // hitung jumlah kalau harga diubah
    if (field === "harga") {
      const harga = parseFloat(value) || 0;
      newList[index][value] = harga * 2.5;
    }

    setPesertaList(newList);
  };

  const tambahData = () => {
    setPesertaList([
      ...pesertaList,
      { nama: "", hubungan: "", harga: 0, jumlah: 0 },
    ]);
  };

  const hapusData = (index) => {
    const newList = pesertaList.filter((_, i) => i !== index);
    setPesertaList(newList);
  };

  return (
    <>
      <Button
        variant="contained"
        color="info"
        onClick={tambahData}
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
      >
        Tambah Data
      </Button>
      {pesertaList.map((peserta, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Header - Start */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Data {index + 1}
            </Typography>
            <Button
              aria-label="delete"
              variant="contained"
              color="error"
              onClick={() => hapusData(index)}
            >
              <HighlightOffIcon fontSize="small" />
            </Button>
          </Box>
          {/* Header - End */}

          <Grid container spacing={2}>
            {/* Nama Section - Start */}
            <Grid size={8}>
              <RHFTextField
                label="Nama"
                name={`nama-${index}`}
                value={peserta.nama}
                onChange={(e) =>
                  handleInputChange(index, "nama", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            {/* Nama Section - End */}

            {/* Hubungan Section - Start */}
            <Grid size={4}>
              <RHFTextField
                label="Hubungan"
                name={`hubungan-${index}`}
                value={peserta.hubungan}
                onChange={(e) =>
                  handleInputChange(index, "hubungan", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            {/* Hubungan Section - End */}

            {/* Nisab Section - Start */}
            <Grid size={4}>
              <RHFTextField
                label="Nisab"
                name={`nisab-${index}`}
                type="number"
                variant="outlined"
                defaultValue={2.5}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            {/* Nisab Section - End */}

            {/* Harga Section - Start */}
            <Grid size={4}>
              <RHFTextField
                variant="outlined"
                label="Harga"
                name={`harga-${index}`}
                value={peserta.harga}
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
              {/* Harga Section - End */}
            </Grid>

            {/* Jumlah Section - Start */}
            <Grid size={4}>
              <RHFTextField
                variant="outlined"
                label="Jumlah"
                name={`jumlah-${index}`}
                value={peserta.jumlah}
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
      ))}
    </>
  );
};

export default ZakatUang;
