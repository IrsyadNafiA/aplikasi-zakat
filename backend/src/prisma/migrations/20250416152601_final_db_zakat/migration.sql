/*
  Warnings:

  - Added the required column `rt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rw` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `rt` INTEGER NOT NULL,
    ADD COLUMN `rw` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Keluarga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `muzaki_email` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `hubungan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Remark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `muzaki` VARCHAR(191) NOT NULL,
    `penerima` VARCHAR(191) NOT NULL,
    `status` ENUM('DIAJUKAN', 'SELESAI', 'TIDAK_SELESAI') NOT NULL DEFAULT 'DIAJUKAN',
    `tanggal` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zakat_uang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `remark_id` INTEGER NOT NULL,
    `keluarga_id` INTEGER NOT NULL,
    `nisab` DOUBLE NOT NULL,
    `harga` BIGINT NOT NULL,
    `jumlah` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zakat_makanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `remark_id` INTEGER NOT NULL,
    `tipe` ENUM('BERAS', 'GANDUM') NULL,
    `jumlah_keluarga` INTEGER NOT NULL,
    `nisab` DOUBLE NOT NULL,
    `jumlah` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fidyah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `remark_id` INTEGER NOT NULL,
    `nisab` INTEGER NOT NULL,
    `harga` BIGINT NOT NULL,
    `jumlah` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Infaq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `remark_id` INTEGER NOT NULL,
    `jumlah` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Keluarga` ADD CONSTRAINT `Keluarga_muzaki_email_fkey` FOREIGN KEY (`muzaki_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zakat_uang` ADD CONSTRAINT `Zakat_uang_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zakat_uang` ADD CONSTRAINT `Zakat_uang_keluarga_id_fkey` FOREIGN KEY (`keluarga_id`) REFERENCES `Keluarga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zakat_makanan` ADD CONSTRAINT `Zakat_makanan_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fidyah` ADD CONSTRAINT `Fidyah_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Infaq` ADD CONSTRAINT `Infaq_remark_id_fkey` FOREIGN KEY (`remark_id`) REFERENCES `Remark`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
