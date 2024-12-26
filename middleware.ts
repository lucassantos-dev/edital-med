import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET })
  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url)) // Redireciona para o login
  }

  return NextResponse.next() // Permite o acesso à página
}

export const config = {
  matcher: ['/admin/participantes/:path*', '/api/protected/:path*'], // Protege essas rotas
}
