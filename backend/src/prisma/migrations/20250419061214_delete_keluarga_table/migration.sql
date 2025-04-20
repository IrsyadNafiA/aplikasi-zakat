/*
  Warnings:

  - You are about to drop the column `keluarga_kode` on the `zakat_uang` table. All the data in the column will be lost.
  - You are about to drop the `keluarga` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hubungan` to the `Zakat_uang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Zakat_uang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `keluarga` DROP FOREIGN KEY `Keluarga_muzaki_id_fkey`;

-- DropForeignKey
ALTER TABLE `zakat_uang` DROP FOREIGN KEY `Zakat_uang_keluarga_kode_fkey`;

-- DropIndex
DROP INDEX `Zakat_uang_keluarga_kode_fkey` ON `zakat_uang`;

-- AlterTable
ALTER TABLE `zakat_uang` DROP COLUMN `keluarga_kode`,
    ADD COLUMN `hubungan` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `keluarga`;
