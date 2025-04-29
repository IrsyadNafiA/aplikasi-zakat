import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import DataTable from "../../components/table/DataTable";
import { RHFSelectField, RHFTextField } from "../../components/FormControl";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ZakatMakanan from "../../components/form/ZakatMakanan";
import ZakatUang from "../../components/form/ZakatUang";

const BayarZakat = () => {
  const [typeForm, setTypeForm] = useState("");
  const methods = useForm({
    resolver: yupResolver(),
  });

  const changeTypeForm = (value) => {
    setTypeForm(value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Typography variant="h5" mb={2}>
        Bayar Zakat
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Status Section - Start */}
          <RHFTextField
            label="Status"
            name="status"
            variant="outlined"
            defaultValue="DIAJUKAN"
            slotProps={{ input: { readOnly: true } }}
            sx={{ marginY: 2 }}
          />
          {/* Status Section - End */}

          {/* Tipe Zakat Section - Start */}
          <RHFSelectField
            label="Tipe Zakat"
            name="tipe_zakat"
            variant="outlined"
            options={[
              { value: "UANG", label: "Uang" },
              { value: "MAKANAN", label: "Makanan Pokok" },
            ]}
            onChange={(val) => changeTypeForm(val)}
          />
          {/* Tipe Zakat Section - End */}

          <Divider sx={{ marginY: 2 }} />

          {/* Zakat Form Section - Start */}
          {typeForm === "UANG" && <ZakatUang />}
          {typeForm === "MAKANAN" && <ZakatMakanan />}
          {/* Zakat Form Section - End */}

          {typeForm && (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Ajukan Zakat
            </Button>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default BayarZakat;
