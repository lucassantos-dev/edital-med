import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const candidatoId = Number(id)
  try {
    const body = await request.json()
    const { documentosValidados } = body

    if (typeof documentosValidados !== 'boolean') {
      return NextResponse.json(
        { message: 'Valor inválido para documentosValidados' },
        { status: 400 },
      )
    }

    const candidato = await prisma.candidatos.update({
      where: { id: candidatoId },
      data: { documentosValidados },
    })

    return NextResponse.json({
      message: 'Status atualizado com sucesso',
      candidato,
    })
  } catch (error) {
    console.log('Erro ao atualizar o status:', error)
    return NextResponse.json(
      { message: 'Erro interno ao processar a solicitação' },
      { status: 500 },
    )
  }
}
