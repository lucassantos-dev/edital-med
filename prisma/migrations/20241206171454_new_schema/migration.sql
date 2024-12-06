-- CreateTable
CREATE TABLE `Candidatos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cnpj_cpf` VARCHAR(191) NOT NULL,
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
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `documentosValidados` BOOLEAN NULL DEFAULT false,
    `ativo` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `Candidatos_cnpj_cpf_key`(`cnpj_cpf`),
    INDEX `Candidatos_email_idx`(`email`),
    INDEX `Candidatos_cnpj_cpf_idx`(`cnpj_cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arquivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidatoId` INTEGER NOT NULL,
    `nomeArquivo` VARCHAR(191) NOT NULL,
    `caminhoArquivo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Arquivos_candidatoId_key`(`candidatoId`),
    INDEX `Arquivo_candidatoId_fkey`(`candidatoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados` (
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
CREATE TABLE `cidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEstado` INTEGER NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `codigoIbge` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atuacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidadeId` INTEGER NOT NULL,
    `candidatosId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cargos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor_medio` DOUBLE NOT NULL,

    UNIQUE INDEX `Cargos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Arquivos` ADD CONSTRAINT `Arquivos_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `Candidatos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cidades` ADD CONSTRAINT `cidades_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `estados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atuacao` ADD CONSTRAINT `atuacao_cidadeId_fkey` FOREIGN KEY (`cidadeId`) REFERENCES `cidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atuacao` ADD CONSTRAINT `atuacao_candidatosId_fkey` FOREIGN KEY (`candidatosId`) REFERENCES `Candidatos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
