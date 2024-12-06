/*
  Warnings:

  - You are about to drop the column `tipoArquivo` on the `Arquivos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidatoId]` on the table `Arquivos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Arquivos` DROP COLUMN `tipoArquivo`;

-- CreateIndex
CREATE UNIQUE INDEX `Arquivos_candidatoId_key` ON `Arquivos`(`candidatoId`);
