import { Box, InputAdornment } from "@mui/material";
import { useState } from "react";
import { RHFSelectField, RHFTextField } from "../FormControl";

const ZakatMakanan = () => {
  const [jmlNisab, setJmlNisab] = useState(2.5);

  const changeJmlKeluarga = (e) => {
    const jmlKeluarga = parseFloat(e.target.value);
    const total = jmlKeluarga * 2.5;
    setJmlNisab(total);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Tipe Makanan Section - Start */}
      <RHFSelectField
        label="Tipe Makanan"
        name="tipe"
        variant="outlined"
        options={[
          { value: "BERAS", label: "Beras" },
          { value: "GANDUM", label: "Gandum" },
        ]}
      />
      {/* Tipe Makanan Section - End */}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* Jumlah Keluarga Section - Start */}
        <RHFTextField
          label="Jumlah Keluarga"
          name="jumlah_keluarga"
          type="number"
          variant="outlined"
          defaultValue={1}
          onChange={changeJmlKeluarga}
        />
        {/* Jumlah Keluarga Section - End */}

        {/* Nisab Section - Start */}
        <RHFTextField
          label="Nisab"
          name="nisab"
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
        {/* Nisab Section - End */}

        {/* Jumlah Section - Start */}
        <RHFTextField
          label="Jumlah"
          name="jumlah"
          type="number"
          variant="outlined"
          value={jmlNisab}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
              readOnly: true,
            },
          }}
        />
        {/* Jumlah Section - End */}
      </Box>
    </Box>
  );
};

export default ZakatMakanan;
