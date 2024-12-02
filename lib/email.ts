import sgMail from '@sendgrid/mail'
import { generateCandidateEmailTemplate, generateRHTemplate } from './utils';
import fs from 'fs';
import path from 'path';
import prisma from './prisma';
export interface Candidato {
    id: number;
    nome: string;
    cnpj_cpf: string; // Pode ser um CNPJ ou CPF
    telefone: string;
    sexo: string;
    especializacao?: string | null;
    experiencia?: string | null;
    experienciaHomeCare?: string | null;
    cargo: string;
    valor?: number | null;
    idade?: number | null;
    cep: string;
    cidade: string;
    estado: string;
    email: string;
  }
  
interface SendEmailProps {

    data: Candidato
}

export async function SenDEmail({data}: SendEmailProps) {
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('A variável de ambiente SENDGRID_API_KEY não está definida');
      }
    
      if (!process.env.EMAIL_RH || !process.env.EMAIL_TI) {
        throw new Error('As variáveis de ambiente EMAIL_RH ou EMAIL_TI não estão definidas');
      }
    
    const arquivos = await prisma.arquivo.findMany({
        where: { candidatoId: data.id },
    });
    const attachments = arquivos.map(arquivo => {
        const filePath = path.join(process.cwd(), arquivo.caminhoArquivo);
        const normalizedPath = path.normalize(filePath);
        const fileBuffer = fs.readFileSync(normalizedPath);
        return {
            content: fileBuffer.toString('base64'),
            filename: arquivo.nomeArquivo,
            type: 'application/pdf', // Ou outro tipo MIME conforme necessário
            disposition: 'attachment',
        };
    });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg_rh = {
        to: process.env.EMAIL_RH, 
        from: process.env.EMAIL_TI, 
        subject:  'Edita Medlar 2024',
        html: generateRHTemplate(data),
        attachments
    }
    const msg_user = {
        to:data.email, 
        from: process.env.EMAIL_TI, 
        subject: 'Edita Medlar 2024',
        html: generateCandidateEmailTemplate(data.nome),
        
      }
      sgMail
  .send(msg_rh)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  sgMail.send(msg_user)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  }