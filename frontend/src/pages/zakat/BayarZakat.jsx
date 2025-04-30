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
import { useEffect, useMemo, useState } from "react";
import ZakatMakanan from "../../components/form/ZakatMakanan";
import ZakatUang from "../../components/form/ZakatUang";
import { dateNow } from "../../utils/dateFormatter";
import useAuthStore, { authAxios } from "../../utils/store/useAuthStore";
import { Fidyah, Infaq } from "../../components/form/FidyahInfaq";
import {
  zakatMakananSchema,
  zakatUangSchema,
} from "../../utils/schema/zakatSchema";
import useNotificationStore from "../../utils/store/useNotificationStore";
import { useNavigate } from "react-router";

const BayarZakat = () => {
  const [typeForm, setTypeForm] = useState("");
  const { user, getProfile } = useAuthStore();
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  const schema = useMemo(() => {
    return typeForm === "UANG" ? zakatUangSchema : zakatMakananSchema;
  }, [typeForm]);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [getProfile, user]);

  const changeTypeForm = (value) => {
    setTypeForm(value);
  };

  const onSubmit = async (data) => {
    console.log("Raw datas: ", data);

    const muzaki_id = user?.id;
    const remarkData = {
      tipe_zakat: data.tipe_zakat,
      status: data.status,
      tanggal_diajukan: dateNow(),
    };

    let insertData = {
      muzaki_id,
      remark: remarkData,
      zakatData: {},
    };

    if (typeForm === "UANG") {
      insertData.zakatData = {
        zakatList: data.zakatData?.zakatList || [],
        fidyah: {
          harga: parseFloat(data.fidyah?.harga) || 0,
          nisab: parseInt(data.fidyah?.nisab) || 0,
          jumlah: data.fidyah?.jumlah || 0,
        },
        infaq: {
          jumlah: parseFloat(data.infaq?.jumlah) || 0,
        },
      };
    }

    if (typeForm === "MAKANAN") {
      insertData.zakatData = {
        tipe: data.tipe,
        jumlah_keluarga: parseFloat(data.jumlah_keluarga),
        nisab: parseFloat(data.nisab),
        jumlah: data.jumlah,
      };
    }

    try {
      const response = await authAxios.post("/zakat", insertData);
      const message = response.data?.message || "Berhasil tambah data";
      showNotification(message);
      setTimeout(() => navigate("/zakat/zakat-saya"), 1500);
    } catch (error) {
      showNotification(error.response?.data?.message || "Gagal tambah data");
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
