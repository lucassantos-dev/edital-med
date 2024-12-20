import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    // Obtém o token do cabeçalho Authorization
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    // Verifica se o token está presente
    if (!token) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    // Decodifica e valida o token JWT
    try {
      jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (error) {
      return NextResponse.json(
        { message: 'Token inválido ou expirado' },
        { status: 401 },
      )
    }

    // Extrai os dados do corpo da requisição
    const { email, password } = await request.json()

    // Valida os campos obrigatórios
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 },
      )
    }

    // Verifica se o usuário já existe no banco de dados
    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Usuário já existe' },
        { status: 400 },
      )
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o novo usuário no banco de dados
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
