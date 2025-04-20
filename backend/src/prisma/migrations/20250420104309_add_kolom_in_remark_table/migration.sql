/*
  Warnings:

  - You are about to drop the column `tanggal` on the `remark` table. All the data in the column will be lost.
  - Added the required column `tanggal_diajukan` to the `Remark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe_zakat` to the `Remark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `remark` DROP COLUMN `tanggal`,
    ADD COLUMN `tanggal_diajukan` DATETIME(3) NOT NULL,
    ADD COLUMN `tanggal_dikonfirmasi` DATETIME(3) NULL,
    ADD COLUMN `tipe_zakat` ENUM('UANG', 'MAKANAN') NOT NULL;
