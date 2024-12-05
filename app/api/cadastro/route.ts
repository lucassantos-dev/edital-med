/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Configuração do Prisma
import fs from 'fs';
import path from 'path';
import { SenDEmail } from '@/lib/email';

const BASE_UPLOAD_DIR = path.join(process.cwd(), 'uploads');  // Base para todos os uploads

const tipoArquivoMap: Record<string, string> = {
  cv: 'CURRICULO',
  carteiraConselhoClasse: 'CARTEIRA_CONSELHO',
  certidaoNegativa: 'CERTIDAO_NEGATIVA',
  relacaoProfissionais: 'RELACAO_PROFISSIONAIS',
  cnaes: 'CNAES',
  registroConselhoClasse: 'REGISTRO_CONSELHO_CLASSE',
  alvaraFuncionamento: 'ALVARA_FUNCIONAMENTO',
  alvaraSanitario: 'ALVARA_SANITARIO',
};
// Função para criar diretórios personalizados baseados no CPF/CNPJ
const getUploadDir = (cnpj_cpf: string) => path.join(BASE_UPLOAD_DIR, cnpj_cpf);

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

    // 3. Validação de campos obrigatórios
    if (!nome || !cargo || !cidade || !estado || !cnpj_cpf) {
      return NextResponse.json(
        { message: 'Campos obrigatórios estão ausentes: nome, cargo, cidade, estado ou CPF/CNPJ' },
        { status: 400 }
      );
    }

    // 4. Verifica duplicidade de CPF/CNPJ
    const existingCandidato = await prisma.candidatos.findUnique({
      where: { cnpj_cpf },
    });
    if (existingCandidato) {
      return NextResponse.json(
        { message: `Já existe um candidato cadastrado com o CPF/CNPJ ${cnpj_cpf}` },
        { status: 400 }
      );
    }

    // 5. Salva os dados do candidato no banco
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
    for (const cidadeSelecionada of cidadesSelecionadas) {
      await prisma.atuacao.create({
        data: {
          cidadeId:cidadeSelecionada.id,
          candidatosId: novoCandidato.id,
        },
      });
    }
    // 6. Criação do diretório do candidato
    const candidatoDir = getUploadDir(cnpj_cpf.replace(/[^\d]/g, ""));  // Diretório exclusivo para o candidato
    if (!fs.existsSync(candidatoDir)) {
      fs.mkdirSync(candidatoDir, { recursive: true });
    }

    // 7. Processa e salva os arquivos de upload
    const tiposArquivos: string[] = [
      "cv",
      "carteiraConselhoClasse",
      "certidaoNegativa",
      "relacaoProfissionais",
      "cnaes",
      "registroConselhoClasse",
      "alvaraFuncionamento",
      "alvaraSanitario",
    ];
    console.log(11)
    for (const tipo of tiposArquivos) {
      const arquivo = formData.get(tipo) as File | null;
      if (arquivo) {
        const fileName = `${tipo}-${Date.now()}-${nome.replace(/\s+/g, '').toLowerCase()}-${arquivo.name}`;
        const filePath = path.join(candidatoDir, fileName); // Usando o diretório personalizado para o candidato

        // Salva o arquivo no sistema de arquivos
        const buffer = Buffer.from(await arquivo.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        const tipoArquivoPrisma = tipoArquivoMap[tipo];
        // Cria registro no banco de dados
        await prisma.arquivos.create({
          data: {
            candidatoId: novoCandidato.id,
            tipoArquivo: tipoArquivoPrisma as any,  // Força o tipo para aceitar o tipo string
            nomeArquivo: fileName,
            caminhoArquivo: `/uploads/${cnpj_cpf.replace(/[^\d]/g, "")}/${fileName}`,
          },
        });
      }
    }

    // 8. Envia email de confirmação
    await SenDEmail({ data: novoCandidato });

    // 9. Retorna sucesso
    return NextResponse.json({ message: 'Cadastro realizado com sucesso', candidato: novoCandidato });
  } catch (error: any) {
    console.error('Erro interno:', error);

    return NextResponse.json(
      { message: 'Erro interno ao processar o cadastro', error: error.message },
      { status: 500 }
    );
  }
}