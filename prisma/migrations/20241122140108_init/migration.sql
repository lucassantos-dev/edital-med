-- CreateTable
CREATE TABLE `Candidato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `especializacao` VARCHAR(191) NULL,
    `experiencia` VARCHAR(191) NULL,
    `experienciaHomeCare` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NULL,
    `idade` INTEGER NULL,
    `cep` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arquivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidatoId` INTEGER NOT NULL,
    `tipoArquivo` ENUM('CV', 'CRM') NOT NULL,
    `nomeArquivo` VARCHAR(191) NOT NULL,
    `caminhoArquivo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Arquivo` ADD CONSTRAINT `Arquivo_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `Candidato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
