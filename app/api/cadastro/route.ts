import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // Configuração do Prisma
import { SenDEmail } from '@/services/email'
import { v2 as cloudinary } from 'cloudinary'
import type { TurnstileResponse } from '@/lib/types'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const TURNSTILE_SECRET_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    },
  )

  const data: TurnstileResponse = await response.json()
  return data.success
}

export async function POST(req: Request) {
  try {
    // 1. Validação inicial e recepção de dados
    const formData = await req.formData()

    // 2. Extrai os dados do formulário
    const nome = formData.get('nome') as string
    const cnpjCpf = formData.get('cnpj_cpf') as string
    const telefone = formData.get('telefone') as string
    const sexo = formData.get('sexo') as string
    const cargo = formData.get('cargo') as string
    const cidade = formData.get('cidade') as string
    const estado = formData.get('estado') as string
    const email = formData.get('email') as string
    const valor = formData.get('valor')
      ? parseFloat(formData.get('valor') as string)
      : null
    const idade = formData.get('idade')
      ? parseInt(formData.get('idade') as string, 10)
      : null

    const cidadesSelecionadasRaw = formData.get('cidadesSelecionadas')
    const cidadesSelecionadas = cidadesSelecionadasRaw
      ? JSON.parse(cidadesSelecionadasRaw as string)
      : []

    const captchaToken = formData.get('turnstile_token') as string

    // 3. Validação de campos obrigatórios
    if (!nome || !cargo || !cidade || !estado || !cnpjCpf || !captchaToken) {
      return NextResponse.json(
        {
          message:
            'Campos obrigatórios estão ausentes: nome, cargo, cidade, estado, CPF/CNPJ ou Turnstile',
        },
        { status: 400 },
      )
    }

    // 4. Verifica se o token do Turnstile é válido
    const isCaptchaValid = await verifyTurnstileToken(captchaToken)
    if (!isCaptchaValid) {
      return NextResponse.json(
        { message: 'Falha na validação do reCAPTCHA, tente novamente.' },
        { status: 400 },
      )
    }

    // 5. Verifica duplicidade de CPF/CNPJ
    const existingCandidato = await prisma.candidatos.findUnique({
      where: { cnpjCpf },
    })
    if (existingCandidato) {
      return NextResponse.json(
        {
          message: `Já existe um candidato cadastrado com o CPF/CNPJ ${cnpjCpf}`,
        },
        { status: 409 }, // Usando 409 Conflict para indicar que já existe um candidato com esse CPF/CNPJ
      )
    }

    // 6. Salva os dados do candidato no banco
    const novoCandidato = await prisma.candidatos.create({
      data: {
        nome,
        cnpjCpf,
        telefone,
        sexo,
        cargo,
        cidade,
        estado,
        email,
        cep: formData.get('cep') as string,
        especializacao: formData.get('especializacao') as string,
        experiencia: formData.get('experiencia') as string,
        experienciaHomeCare: formData.get('experienciaHomeCare') as string,
        valor,
        idade,
      },
    })

    // 7. Associa as cidades selecionadas ao candidato
    for (const cidadeSelecionada of cidadesSelecionadas) {
      await prisma.atuacao.create({
        data: {
          cidadeId: cidadeSelecionada.id,
          candidatosId: novoCandidato.id,
        },
      })
    }

    // 8. Processa e salva os arquivos no Cloudinary
    const arquivoCompactado = formData.get('documentos') as File

    if (arquivoCompactado) {
      const buffer = Buffer.from(await arquivoCompactado.arrayBuffer())

      const uploadResponse = await cloudinary.uploader.upload_stream(
        { resource_type: 'raw' }, // Define o tipo de recurso como 'raw' para arquivos ZIP
        async (error, result) => {
          if (error) {
            console.error('Erro no upload para o Cloudinary:', error)
            throw new Error('Erro ao fazer upload para o Cloudinary')
          }
          console.log('Arquivo enviado para o Cloudinary:', result)
          //
          // Salvar apenas a URL no banco de dados
          if (result && result.secure_url) {
            // Agora, você pode salvar a URL no banco de dados
            await prisma.arquivos.create({
              data: {
                candidatoId: novoCandidato.id, // Assumindo que novoCandidato.id está disponível
                nomeArquivo: arquivoCompactado.name, // Nome do arquivo (se necessário)
                caminhoArquivo: result.secure_url, // URL do arquivo no Cloudinary
              },
            })
          }
        },
      )

      uploadResponse.end(buffer) // Finaliza o upload do arquivo
    } else {
      console.log('Arquivo nao encontrado')
    }
    // 9. Envia email de confirmação
    await SenDEmail({ data: novoCandidato })

    // 10. Retorna sucesso
    return NextResponse.json(
      { message: 'Cadastro realizado com sucesso', candidato: novoCandidato },
      { status: 201 },
    )
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Erro interno ao processar o cadastro', error },
      { status: 500 },
    )
  }
}
