/*
  Warnings:

  - You are about to drop the column `cnpj_cpf` on the `Candidatos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpjCpf]` on the table `Candidatos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpjCpf` to the `Candidatos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Candidatos_cnpj_cpf_idx";

-- DropIndex
DROP INDEX "Candidatos_cnpj_cpf_key";

-- AlterTable
ALTER TABLE "Candidatos" DROP COLUMN "cnpj_cpf",
ADD COLUMN     "cnpjCpf" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidatos_cnpjCpf_key" ON "Candidatos"("cnpjCpf");

-- CreateIndex
CREATE INDEX "Candidatos_cnpjCpf_idx" ON "Candidatos"("cnpjCpf");
