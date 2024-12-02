/*
  Warnings:

  - You are about to drop the column `cnpj` on the `candidato` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj_cpf]` on the table `Candidato` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj_cpf` to the `Candidato` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Candidato_cnpj_key` ON `candidato`;

-- AlterTable
ALTER TABLE `candidato` DROP COLUMN `cnpj`,
    ADD COLUMN `cnpj_cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Candidato_cnpj_cpf_key` ON `Candidato`(`cnpj_cpf`);
