import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 },
      )
    }
    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Usuário já existe' },
        { status: 400 },
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.usuarios.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return NextResponse.json(
      { message: 'Usuário criado com sucesso' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
