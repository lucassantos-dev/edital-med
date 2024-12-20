import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const user = await prisma.usuarios.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 },
      )
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 },
      )
    }
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      SECRET_KEY, // Chave secreta
      { expiresIn: '1h' }, // Tempo de expiração
    )
    return NextResponse.json(
      { message: 'Login bem-sucedido', token },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro ao processar login:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
