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
import { useEffect, useState } from "react";
import ZakatMakanan from "../../components/form/ZakatMakanan";
import ZakatUang from "../../components/form/ZakatUang";
import { dateNow } from "../../utils/dateFormatter";
import useAuthStore from "../../utils/store/useAuthStore";
import { Fidyah, Infaq } from "../../components/form/FidyahInfaq";

const BayarZakat = () => {
  const [typeForm, setTypeForm] = useState("");
  const methods = useForm();
  const { user, getProfile } = useAuthStore();

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [getProfile, user]);

  const changeTypeForm = (value) => {
    setTypeForm(value);
  };

  const onSubmit = (data) => {
    const muzaki_id = user?.id;
    const remarkData = {
      tipe_zakat: data.tipe_zakat,
      status: data.status,
      tanggal_diajukan: dateNow(),
    };

    if (typeForm === "UANG") {
      const insertData = {
        muzaki_id,
        remark: remarkData,
        zakatData: {
          zakatData: data.zakatData?.zakatList,
        },
      };
      console.log(insertData);
    }

    if (typeForm === "MAKANAN") {
      const insertData = {
        muzaki_id,
        remark: remarkData,
        zakatData: {
          tipe: data.tipe,
          jumlah_keluarga: data.jumlah_keluarga,
          nisab: data.nisab,
          jumlah: data.jumlah,
        },
      };
      console.log(insertData);
    }
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
          {typeForm === "UANG" && (
            <>
              <ZakatUang />
              <Divider sx={{ marginY: 2 }} />
              <Fidyah />
              <Divider sx={{ marginY: 2 }} />
              <Infaq />
            </>
          )}
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
