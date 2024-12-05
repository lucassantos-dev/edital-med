/*
  Warnings:

  - The values [CV,CCC,CN] on the enum `Arquivos_tipoArquivo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Arquivos` MODIFY `tipoArquivo` ENUM('CURRICULO', 'CARTEIRA_CONSELHO', 'ALVARA_SANITARIO', 'ALVARA_FUNCIONAMENTO', 'CERTIDAO_NEGATIVA', 'RELACAO_PROFISSIONAIS', 'CNAES', 'REGISTRO_CONSELHO_CLASSE', 'ALVARA_FUNCIONAMENTO_PJ', 'ALVARA_SANITARIO_PJ', 'CERTIDAO_NEGATIVA_PJ') NOT NULL;

-- AlterTable
ALTER TABLE `Candidatos` ADD COLUMN `ativo` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `documentosValidados` BOOLEAN NULL;

-- CreateTable
CREATE TABLE `atuacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idade` INTEGER NOT NULL,
    `cidadeId` INTEGER NOT NULL,
    `candidatosId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `atuacao` ADD CONSTRAINT `atuacao_cidadeId_fkey` FOREIGN KEY (`cidadeId`) REFERENCES `cidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atuacao` ADD CONSTRAINT `atuacao_candidatosId_fkey` FOREIGN KEY (`candidatosId`) REFERENCES `Candidatos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
