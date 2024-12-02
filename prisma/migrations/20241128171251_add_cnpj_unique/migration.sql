/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Candidato` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Candidato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidato` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Candidato_cnpj_key` ON `Candidato`(`cnpj`);
