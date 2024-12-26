import type { Candidatos, Cidades } from '@prisma/client'

export interface SendEmailProps {
  data: Candidatos
}

export type Cargo = {
  id: number
  nome: string
  valor_medio: number
}

export interface TurnstileResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  action?: string
  cdata?: string
}

type Atuacao = {
  id: number
  cidade: Cidades
}
export type Candidato = Candidatos & {
  atuacoes: Atuacao[]
}
