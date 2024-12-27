import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const candidatoId = Number(params.id)

  try {
    // 1. Busca o arquivo associado ao candidato no banco de dados
    const arquivo = await prisma.arquivos.findFirst({
      where: { candidatoId },
    })

    // 2. Verifica se o arquivo existe
    if (!arquivo || !arquivo.caminhoArquivo) {
      return NextResponse.json(
        { message: 'Arquivo não encontrado' },
        { status: 404 },
      )
    }

    // 3. Redireciona diretamente para a URL do Cloudinary
    return NextResponse.json({
      url: arquivo.caminhoArquivo,
      nomeArquivo: arquivo.nomeArquivo, // Inclui o nome do arquivo
    })
  } catch (error) {
    console.error('Erro ao buscar o arquivo:', error)
    return NextResponse.json(
      { message: 'Erro ao processar o download do arquivo' },
      { status: 500 },
    )
  }
}
