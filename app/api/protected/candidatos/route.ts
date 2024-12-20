import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const candidatos = await prisma.candidatos.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cnpjCpf: true,
        telefone: true,
        sexo: true,
        especializacao: true,
        experiencia: true,
        experienciaHomeCare: true,
        cargo: true,
        valor: true,
        idade: true,
        cep: true,
        cidade: true,
        estado: true,
        documentosValidados: true,
        ativo: true,
        atuacoes: {
          select: {
            id: true,
            cidade: true,
          },
        },
      },
    })

    // Formata os dados para garantir que o retorno seja conforme o esperado
    const candidatosFormatados = candidatos.map((candidato) => ({
      id: candidato.id,
      nome: candidato.nome,
      email: candidato.email,
      cnpjCpf: candidato.cnpjCpf,
      telefone: candidato.telefone,
      sexo: candidato.sexo,
      especializacao: candidato.especializacao,
      experiencia: candidato.experiencia,
      experienciaHomeCare: candidato.experienciaHomeCare,
      cargo: candidato.cargo,
      valor: candidato.valor,
      idade: candidato.idade,
      cep: candidato.cep,
      cidade: candidato.cidade,
      estado: candidato.estado,
      documentosValidados: candidato.documentosValidados,
      ativo: candidato.ativo,
      atuacoes: candidato.atuacoes.map((atuacao) => ({
        id: atuacao.id,
        cidade: atuacao.cidade,
      })),
    }))

    // Retorna os dados dos candidatos formatados
    return NextResponse.json(candidatosFormatados, { status: 200 })
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
