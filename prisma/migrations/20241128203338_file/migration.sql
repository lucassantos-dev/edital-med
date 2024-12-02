/*
  Warnings:

  - The values [CRM] on the enum `Arquivo_tipoArquivo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `arquivo` MODIFY `tipoArquivo` ENUM('CV', 'CCC') NOT NULL;
