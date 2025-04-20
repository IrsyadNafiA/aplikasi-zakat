/*
  Warnings:

  - You are about to drop the column `keluarga_id` on the `zakat_uang` table. All the data in the column will be lost.
  - Added the required column `keluarga_kode` to the `Zakat_uang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `zakat_uang` DROP FOREIGN KEY `Zakat_uang_keluarga_id_fkey`;

-- DropIndex
DROP INDEX `Zakat_uang_keluarga_id_fkey` ON `zakat_uang`;

-- AlterTable
ALTER TABLE `zakat_uang` DROP COLUMN `keluarga_id`,
    ADD COLUMN `keluarga_kode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Zakat_uang` ADD CONSTRAINT `Zakat_uang_keluarga_kode_fkey` FOREIGN KEY (`keluarga_kode`) REFERENCES `Keluarga`(`kode`) ON DELETE RESTRICT ON UPDATE CASCADE;
