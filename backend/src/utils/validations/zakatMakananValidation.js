import { z } from "zod";

export const zakatMakananSchema = z.object({
  tipe: z.string().min(1, "Tipe wajib diisi"),
  jumlah_keluarga: z.number().min(1, "Jumlah Keluarga wajib diisi"),
  nisab: z.number().min(1, "Nisab wajib diisi"),
  jumlah: z.number().min(1, "Jumlah wajib diisi"),
});

export const updateZakatMakananSchema = z.object({
  id: z.number().min(1, "ID wajib diisi"),
  tipe: z.string().min(1, "Tipe wajib diisi"),
  jumlah_keluarga: z.number().min(1, "Jumlah Keluarga wajib diisi"),
  nisab: z.number().min(1, "Nisab wajib diisi"),
  jumlah: z.number().min(1, "Jumlah wajib diisi"),
});
