/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Configuração do Prisma
import fs from 'fs';
import path from 'path';
import { SenDEmail } from '@/lib/email';

const BASE_UPLOAD_DIR = path.join(process.cwd(), 'uploads');  

const TURNSTILE_SECRET_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY 

const getUploadDir = (cnpj_cpf: string) => path.join(BASE_UPLOAD_DIR, cnpj_cpf);

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY!,
      response: token,
    }),
  });

  const data:any = await response.json();
  return data.success; // Retorna verdadeiro se o token for válido
}

export async function POST(req: Request) {
  try {
    // 1. Validação inicial e recepção de dados
    const formData = await req.formData();
    
    // 2. Extrai os dados do formulário
    const nome = formData.get('nome') as string;
    const cnpj_cpf = formData.get('cnpj_cpf') as string;
    const telefone = formData.get('telefone') as string;
    const sexo = formData.get('sexo') as string;
    const cargo = formData.get('cargo') as string;
    const cidade = formData.get('cidade') as string;
    const estado = formData.get('estado') as string;
    const email = formData.get('email') as string;
    const valor = formData.get('valor') ? parseFloat(formData.get('valor') as string) : null;
    const idade = formData.get('idade') ? parseInt(formData.get('idade') as string, 10) : null;

    const cidadesSelecionadasRaw = formData.get("cidadesSelecionadas");
    const cidadesSelecionadas = cidadesSelecionadasRaw
      ? JSON.parse(cidadesSelecionadasRaw as string)
      : [];

    const captchaToken = formData.get('turnstile_token') as string;

    // 3. Validação de campos obrigatórios
    if (!nome || !cargo || !cidade || !estado || !cnpj_cpf || !captchaToken) {
      return NextResponse.json(
        { message: 'Campos obrigatórios estão ausentes: nome, cargo, cidade, estado, CPF/CNPJ ou Turnstile' },
        { status: 400 }
      );
    }

    // 4. Verifica se o token do Turnstile é válido
    const isCaptchaValid = await verifyTurnstileToken(captchaToken);
    if (!isCaptchaValid) {
      return NextResponse.json(
        { message: 'Falha na validação do reCAPTCHA, tente novamente.' },
        { status: 400 }
      );
    }

    // 5. Verifica duplicidade de CPF/CNPJ
    const existingCandidato = await prisma.candidatos.findUnique({
      where: { cnpj_cpf },
    });
    if (existingCandidato) {
      return NextResponse.json(
        { message: `Já existe um candidato cadastrado com o CPF/CNPJ ${cnpj_cpf}` },
        { status: 204 }
      );
    }

    // 6. Salva os dados do candidato no banco
    const novoCandidato = await prisma.candidatos.create({
      data: {
        nome,
        cnpj_cpf,
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
    });

    // 7. Associa as cidades selecionadas ao candidato
    for (const cidadeSelecionada of cidadesSelecionadas) {
      await prisma.atuacao.create({
        data: {
          cidadeId: cidadeSelecionada.id,
          candidatosId: novoCandidato.id,
        },
      });
    }

    // 8. Criação do diretório do candidato
    const candidatoDir = getUploadDir(cnpj_cpf.replace(/[^\d]/g, ""));  // Diretório exclusivo para o candidato
    if (!fs.existsSync(candidatoDir)) {
      fs.mkdirSync(candidatoDir, { recursive: true });
    }

    // 9. Processa e salva os arquivos de upload
    const arquivoCompactado = formData.get("documentos") as File;

    if (arquivoCompactado) {
      const fileName = `documentacao-${Date.now()}.zip`;
      const filePath = path.join(candidatoDir, fileName);

      const buffer = Buffer.from(await arquivoCompactado.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      // Salva no banco de dados
      await prisma.arquivos.create({
        data: {
          candidatoId: novoCandidato.id,
          nomeArquivo: fileName,
          caminhoArquivo: `/uploads/${cnpj_cpf.replace(/[^\d]/g, "")}/${fileName}`,
        },
      });
    }

    // 10. Envia email de confirmação
    await SenDEmail({ data: novoCandidato });

    // 11. Retorna sucesso
    return NextResponse.json({ message: 'Cadastro realizado com sucesso', candidato: novoCandidato }, { status: 201 });

  } catch (error: any) {
    console.error('Erro interno:', error);

    return NextResponse.json(
      { message: 'Erro interno ao processar o cadastro', error: error.message },
      { status: 500 }
    );
  }
}
