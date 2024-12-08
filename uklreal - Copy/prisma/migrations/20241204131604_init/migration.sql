/*
  Warnings:

  - You are about to drop the column `quantitas` on the `peminjaman` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `quantitas`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
