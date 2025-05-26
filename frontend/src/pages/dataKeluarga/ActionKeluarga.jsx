import { Button, Divider, Grid, Typography } from "@mui/material";
import capitalizeString from "../../utils/stringFormatter";
import { useParams } from "react-router";
import { RHFSelectField, RHFTextField } from "../../components/FormControl";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const rt = [{ rt: "1" }, { rt: "2" }, { rt: "3" }];

const ActionKeluarga = () => {
  const { type } = useParams();
  const methods = useForm({
    resolver: yupResolver(),
  });

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "anggotaKeluarga",
  });

  const tambahAnggota = () => {
    append();
  };

  const options = [
    { value: "", label: "Pilih" },
    ...rt.map((data) => ({
      value: data.rt,
      label: data.rt,
    })),
  ];
  // nanti data concat dari database

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" mb={2}>
          {capitalizeString(type)} Keluarga
        </Typography>
      </Grid>
      <Grid size={12}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <RHFTextField label="Alamat" name="alamat" variant="outlined" />
              </Grid>
              <Grid size={6}>
                <RHFSelectField
                  label="RT"
                  name="rt"
                  variant="outlined"
                  options={options}
                />
              </Grid>
              <Grid size={6}>
                <RHFSelectField
                  label="RW"
                  name="rw"
                  variant="outlined"
                  options={options}
                />
              </Grid>
              <Grid size={12}>
                <RHFTextField
                  label="No. Handphone"
                  name="no_hp"
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <Divider />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default ActionKeluarga;
