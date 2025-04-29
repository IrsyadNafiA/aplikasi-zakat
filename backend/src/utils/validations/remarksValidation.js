import { z } from "zod";

export const remarksSchema = z.object({
  tipe_zakat: z.string().min(1, "Tipe Zakat wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
  tanggal_diajukan: z.string().datetime().min(1, "Tanggal wajib diisi"),
});

export const updateRemarksSchema = z.object({
  id: z.number().min(1, "ID wajib diisi"),
  pengurus_id: z.number().min(1, "Pengurus wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
  tanggal_dikonfirmasi: z.string().datetime().min(1, "Tanggal wajib diisi"),
});
