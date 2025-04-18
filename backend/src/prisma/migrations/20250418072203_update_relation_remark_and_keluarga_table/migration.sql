/*
  Warnings:

  - You are about to drop the column `muzaki_email` on the `keluarga` table. All the data in the column will be lost.
  - You are about to drop the column `muzaki` on the `remark` table. All the data in the column will be lost.
  - Added the required column `muzaki_id` to the `Keluarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muzaki_id` to the `Remark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `keluarga` DROP FOREIGN KEY `Keluarga_muzaki_email_fkey`;

-- DropIndex
DROP INDEX `Keluarga_muzaki_email_fkey` ON `keluarga`;

-- AlterTable
ALTER TABLE `keluarga` DROP COLUMN `muzaki_email`,
    ADD COLUMN `muzaki_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `remark` DROP COLUMN `muzaki`,
    ADD COLUMN `muzaki_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Keluarga` ADD CONSTRAINT `Keluarga_muzaki_id_fkey` FOREIGN KEY (`muzaki_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Remark` ADD CONSTRAINT `Remark_muzaki_id_fkey` FOREIGN KEY (`muzaki_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
