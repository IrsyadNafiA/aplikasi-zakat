/*
  Warnings:

  - Added the required column `kode` to the `Keluarga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `keluarga` ADD COLUMN `kode` VARCHAR(191) NOT NULL;
