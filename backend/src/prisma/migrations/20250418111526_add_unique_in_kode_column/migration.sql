/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Keluarga` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Keluarga_kode_key` ON `Keluarga`(`kode`);
