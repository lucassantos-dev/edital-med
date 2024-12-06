import type { Candidatos } from "@prisma/client";

export interface SendEmailProps {
  data: Candidatos
}

export type Cargo = {
  id: number;
  nome: string;
  valor_medio: number;
};