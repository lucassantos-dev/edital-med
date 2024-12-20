import sgMail from '@sendgrid/mail'
import {
  generateCandidateEmailTemplate,
  generateRHTemplate,
} from '../lib/utils'
import fs from 'fs'
import path from 'path'
import prisma from '../lib/prisma'
import type { SendEmailProps } from '../lib/types'

export async function SenDEmail({ data }: SendEmailProps) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('A variável de ambiente SENDGRID_API_KEY não está definida')
  }
  if (!process.env.EMAIL_RH || !process.env.EMAIL_TI) {
    throw new Error(
      'As variáveis de ambiente EMAIL_RH ou EMAIL_TI não estão definidas',
    )
  }
  const arquivos = await prisma.arquivos.findMany({
    where: { candidatoId: data.id },
  })
  const attachments = arquivos.map((arquivo) => {
    const filePath = path.join(process.cwd(), arquivo.caminhoArquivo)

    const normalizedPath = path.normalize(filePath)
    const fileBuffer = fs.readFileSync(normalizedPath)
    return {
      content: fileBuffer.toString('base64'),
      filename: arquivo.nomeArquivo,
      type: 'application/pdf', // Ou outro tipo MIME conforme necessário
      disposition: 'attachment',
    }
  })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msgRh = {
    to: process.env.EMAIL_RH,
    from: process.env.EMAIL_TI,
    subject: 'Edita Medlar 2024',
    html: generateRHTemplate(data),
    attachments,
  }
  const msgUser = {
    to: data.email,
    from: process.env.EMAIL_TI,
    subject: 'Edita Medlar 2024',
    html: generateCandidateEmailTemplate(data.nome),
  }
  sgMail
    .send(msgRh)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  sgMail
    .send(msgUser)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
