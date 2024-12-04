import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Configuração do Prisma
import fs from 'fs';
import path from 'path';
import { SenDEmail } from '@/lib/email';

const UPLOAD_DIR = {
  CV: path.join(process.cwd(), 'uploads/cv'),
  CCC: path.join(process.cwd(), 'uploads/ccc'),
  CN: path.join(process.cwd(), 'uploads/cn'),
};

// Cria diretórios de upload, se não existirem
Object.values(UPLOAD_DIR).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export async function POST(req: Request) {
  try {
    // 1. Validação inicial e recepção de dados
    const formData = await req.formData();
    // const recaptchaToken = formData.get('recaptchaToken') as string;

    // if (!recaptchaToken) {
    //   return NextResponse.json({ message: 'Preencha o reCAPTCHA' }, { status: 400 });
    // }

    // 2. Valida o reCAPTCHA
    // const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `secret=${secretKey}&response=${recaptchaToken}`,
    // });
    // const captchaResult = await response.json();

    // if (!captchaResult.success) {
    //   return NextResponse.json({ message: 'Falha na verificação do reCAPTCHA' }, { status: 400 });
    // }

    // 3. Extrai os dados do formulário
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
    // 4. Validação de campos obrigatórios
    if (!nome || !cargo || !cidade || !estado || !cnpj_cpf) {
      return NextResponse.json(
        { message: 'Campos obrigatórios estão ausentes: nome, cargo, cidade, estado ou CPF/CNPJ' },
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
        { status: 400 }
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

    // 7. Processa e salva os arquivos de upload
    const arquivos = ['cv', 'ccc', 'cn'];
    for (const tipo of arquivos) {
      const arquivo = formData.get(tipo) as File | null;
      if (arquivo) {
        const fileName = `${tipo.toUpperCase()}-${Date.now()}-${nome.replace(/\s+/g, '').toLowerCase()}-${arquivo.name}`;
        const filePath = path.join(UPLOAD_DIR[tipo.toUpperCase() as keyof typeof UPLOAD_DIR], fileName);

        // Salva o arquivo no sistema de arquivos
        const buffer = Buffer.from(await arquivo.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        // Cria registro no banco
        await prisma.arquivos.create({
          data: {
            candidatoId: novoCandidato.id,
            tipoArquivo: tipo.toUpperCase(),
            nomeArquivo: fileName,
            caminhoArquivo: `/uploads/${tipo}/${fileName}`,
          },
        });
      }
    }

    // 8. Envia email de confirmação
    await SenDEmail({ data: novoCandidato });

    // 9. Retorna sucesso
    return NextResponse.json({ message: 'Cadastro realizado com sucesso', candidato: novoCandidato });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro interno:', error);

    return NextResponse.json(
      { message: 'Erro interno ao processar o cadastro', error: error.message },
      { status: 500 }
    );
  }
}
