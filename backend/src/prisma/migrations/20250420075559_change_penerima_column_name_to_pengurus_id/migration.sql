/*
  Warnings:

  - You are about to drop the column `penerima` on the `remark` table. All the data in the column will be lost.
  - Added the required column `pengurus_id` to the `Remark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `remark` DROP COLUMN `penerima`,
    ADD COLUMN `pengurus_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Remark` ADD CONSTRAINT `Remark_pengurus_id_fkey` FOREIGN KEY (`pengurus_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
