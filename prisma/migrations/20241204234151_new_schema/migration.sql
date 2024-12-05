/*
  Warnings:

  - You are about to drop the column `idade` on the `atuacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidatos` MODIFY `documentosValidados` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `atuacao` DROP COLUMN `idade`;
