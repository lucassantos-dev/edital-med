-- CreateTable
CREATE TABLE "Candidatos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj_cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "especializacao" TEXT,
    "experiencia" TEXT,
    "experienciaHomeCare" TEXT,
    "cargo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION,
    "idade" INTEGER,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentosValidados" BOOLEAN DEFAULT false,
    "ativo" BOOLEAN DEFAULT true,

    CONSTRAINT "Candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arquivos" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "caminhoArquivo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Arquivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estados" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "sigla" VARCHAR(2) NOT NULL,
    "pais" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidades" (
    "id" SERIAL NOT NULL,
    "idEstado" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "codigoIbge" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atuacao" (
    "id" SERIAL NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "candidatosId" INTEGER,

    CONSTRAINT "atuacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor_medio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cargos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidatos_cnpj_cpf_key" ON "Candidatos"("cnpj_cpf");

-- CreateIndex
CREATE INDEX "Candidatos_email_idx" ON "Candidatos"("email");

-- CreateIndex
CREATE INDEX "Candidatos_cnpj_cpf_idx" ON "Candidatos"("cnpj_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Arquivos_candidatoId_key" ON "Arquivos"("candidatoId");

-- CreateIndex
CREATE INDEX "Arquivo_candidatoId_fkey" ON "Arquivos"("candidatoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cargos_nome_key" ON "Cargos"("nome");

-- AddForeignKey
ALTER TABLE "Arquivos" ADD CONSTRAINT "Arquivos_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_idEstado_fkey" FOREIGN KEY ("idEstado") REFERENCES "Estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atuacao" ADD CONSTRAINT "atuacao_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atuacao" ADD CONSTRAINT "atuacao_candidatosId_fkey" FOREIGN KEY ("candidatosId") REFERENCES "Candidatos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
