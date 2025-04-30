import * as yup from "yup";

const zakatUangSchema = yup.object({
  tipe_zakat: yup.string().oneOf(["UANG", "MAKANAN"]).required(),
  status: yup.string().required(),
  zakatData: yup.object({
    zakatList: yup
      .array()
      .of(
        yup.object({
          nama: yup.string().required("Nama wajib diisi"),
          hubungan: yup.string().required("Hubungan wajib diisi"),
          nisab: yup
            .number()
            .typeError("Nisab harus berupa angka")
            .required("Nisab wajib diisi"),
          harga: yup
            .number()
            .typeError("Harga harus berupa angka")
            .required("Harga wajib diisi"),
          jumlah: yup
            .number()
            .typeError("Jumlah harus berupa angka")
            .required("Jumlah wajib diisi"),
        })
      )
      .min(1, "Minimal satu data zakat harus diisi"),
  }),
  fidyah: yup
    .object({
      harga: yup
        .number()
        .transform((v, o) => (o === "" ? undefined : v))
        .nullable(),
      nisab: yup
        .number()
        .transform((v, o) => (o === "" ? undefined : v))
        .nullable(),
      jumlah: yup
        .number()
        .transform((v, o) => (o === "" ? undefined : v))
        .nullable(),
    })
    .optional(),
  infaq: yup
    .object({
      jumlah: yup
        .number()
        .transform((v, o) => (o === "" ? undefined : v))
        .nullable(),
    })
    .optional(),
});

const zakatMakananSchema = yup.object({
  tipe_zakat: yup.string().oneOf(["UANG", "MAKANAN"]).required(),
  status: yup.string().required(),
  tipe: yup.string().required("Tipe wajib diisi"),
  jumlah_keluarga: yup
    .number()
    .typeError("Jumlah keluarga harus berupa angka")
    .required("Jumlah keluarga wajib diisi"),
  nisab: yup
    .number()
    .typeError("Nisab harus berupa angka")
    .required("Nisab wajib diisi"),
  jumlah: yup
    .number()
    .typeError("Jumlah harus berupa angka")
    .required("Jumlah wajib diisi"),
});

export { zakatUangSchema, zakatMakananSchema };
