import { z } from "zod";

const zakatUangItem = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  hubungan: z.string().min(1, "Hubungan wajib diisi"),
  nisab: z.number().min(1, "Nisab wajib diisi"),
  harga: z.number().min(1, "Harga wajib diisi"),
  jumlah: z.number().min(1, "Jumlah wajib diisi"),
});

export const zakatUangSchema = z
  .array(zakatUangItem)
  .nonempty("Zakat uang tidak boleh kosong");

export const updateZakatUangSchema = z.object({
  id: z.number().min(1, "ID wajib diisi"),
  nama: z.string().min(1, "Nama wajib diisi"),
  hubungan: z.string().min(1, "Hubungan wajib diisi"),
  nisab: z.number().min(1, "Nisab wajib diisi"),
  harga: z.number().min(1, "Harga wajib diisi"),
  jumlah: z.number().min(1, "Jumlah wajib diisi"),
});

export const fidyahSchema = z
  .object({
    nisab: z.number().min(1, "Nisab wajib diisi"),
    harga: z.number().min(1, "Harga wajib diisi"),
    jumlah: z.number().min(1, "Jumlah wajib diisi"),
  })
  .partial() // membuat semua field opsional
  .refine(
    (data) =>
      Object.keys(data).length === 0 ||
      (data.nisab && data.harga && data.jumlah),
    {
      message: "Semua field fidyah harus diisi jika ada salah satu yang diisi",
    }
  );

export const updateFidyahSchema = z.object({
  id: z.number().min(1, "ID wajib diisi"),
  nisab: z.number().min(1, "Nisab wajib diisi"),
  harga: z.number().min(1, "Harga wajib diisi"),
  jumlah: z.number().min(1, "Jumlah wajib diisi"),
});

export const infaqSchema = z
  .object({
    jumlah: z.number().min(1, "Jumlah wajib diisi"),
  })
  .partial() // membuat semua field opsional
  .refine((data) => Object.keys(data).length === 0 || data.jumlah, {
    message: "Semua field infaq harus diisi jika ada salah satu yang diisi",
  });

export const updateInfaqSchema = z.object({
  id: z.number().min(1, "ID wajib diisi"),
  jumlah: z.number().min(1, "Jumlah wajib diisi"),
});
