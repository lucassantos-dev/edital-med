/*
  Warnings:

  - You are about to drop the `cidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `atuacao` DROP FOREIGN KEY `atuacao_cidadeId_fkey`;

-- DropForeignKey
ALTER TABLE `cidades` DROP FOREIGN KEY `cidades_idEstado_fkey`;

-- DropTable
DROP TABLE `cidades`;

-- DropTable
DROP TABLE `estados`;

-- CreateTable
CREATE TABLE `Estados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `sigla` VARCHAR(2) NOT NULL,
    `pais` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEstado` INTEGER NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `codigoIbge` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cidades` ADD CONSTRAINT `Cidades_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `Estados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atuacao` ADD CONSTRAINT `atuacao_cidadeId_fkey` FOREIGN KEY (`cidadeId`) REFERENCES `Cidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
