import type { Candidatos } from '@prisma/client'

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

export type Atuacao = {
  id: number
  cidade: string
}

export type Candidato = {
  id: number
  nome: string
  email: string
  cnpjCpf: string
  telefone: string
  sexo: string
  especializacao: string | null
  experiencia: string | null
  experienciaHomeCare: string | null
  cargo: string
  valor: number | null
  idade: number | null
  cep: string
  cidade: string
  estado: string
  documentosValidados: boolean
  ativo: boolean
  atuacoes: Atuacao[]
}
