/*
  Warnings:

  - You are about to drop the column `createdAt` on the `fidyah` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `infaq` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `remark` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `zakat_makanan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `zakat_uang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fidyah` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `infaq` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `remark` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `zakat_makanan` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `zakat_uang` DROP COLUMN `createdAt`;
