/*
  Warnings:

  - A unique constraint covering the columns `[remark_id]` on the table `Fidyah` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[remark_id]` on the table `Infaq` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[remark_id]` on the table `Zakat_makanan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Fidyah_remark_id_key` ON `Fidyah`(`remark_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Infaq_remark_id_key` ON `Infaq`(`remark_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Zakat_makanan_remark_id_key` ON `Zakat_makanan`(`remark_id`);
