-- DropForeignKey
ALTER TABLE `fidyah` DROP FOREIGN KEY `Fidyah_remark_id_fkey`;

-- DropForeignKey
ALTER TABLE `infaq` DROP FOREIGN KEY `Infaq_remark_id_fkey`;

-- DropForeignKey
ALTER TABLE `remark` DROP FOREIGN KEY `Remark_muzaki_id_fkey`;

-- DropForeignKey
ALTER TABLE `remark` DROP FOREIGN KEY `Remark_pengurus_id_fkey`;

-- DropForeignKey
ALTER TABLE `zakat_makanan` DROP FOREIGN KEY `Zakat_makanan_remark_id_fkey`;

-- DropForeignKey
ALTER TABLE `zakat_uang` DROP FOREIGN KEY `Zakat_uang_remark_id_fkey`;

-- DropIndex
DROP INDEX `Fidyah_remark_id_fkey` ON `fidyah`;

-- DropIndex
DROP INDEX `Infaq_remark_id_fkey` ON `infaq`;

-- DropIndex
DROP INDEX `Remark_muzaki_id_fkey` ON `remark`;

-- DropIndex
DROP INDEX `Remark_pengurus_id_fkey` ON `remark`;

-- DropIndex
DROP INDEX `Zakat_makanan_remark_id_fkey` ON `zakat_makanan`;

-- DropIndex
DROP INDEX `Zakat_uang_remark_id_fkey` ON `zakat_uang`;

-- AddForeignKey
ALTER TABLE `Remark` ADD CONSTRAINT `Remark_muzaki_id_fkey` FOREIGN KEY (`muzaki_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Remark` ADD CONSTRAINT `Remark_pengurus_id_fkey` FOREIGN KEY (`pengurus_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zakat_uang` ADD CONSTRAINT `Zakat_uang_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zakat_makanan` ADD CONSTRAINT `Zakat_makanan_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fidyah` ADD CONSTRAINT `Fidyah_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Infaq` ADD CONSTRAINT `Infaq_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
