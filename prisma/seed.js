import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Insira seu código de seed aqui
  // Exemplo: criar cargos
  await prisma.cargos.createMany({
    data: [
      { nome: "Fonoaudilogia", valor_medio: 50 },
      { nome: "Terapeuta Ocupacional", valor_medio: 55 },
      { nome: "Fisioterapeuta", valor_medio: 35 },
      { nome: "Psicologia", valor_medio: 40 },
      { nome: "Nutrição", valor_medio: 50 },
      { nome: "Enfermagem", valor_medio: 50 },
      { nome: "Médico", valor_medio: 200 },
    ],
  });
  console.log("Seed executado com sucesso");
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
