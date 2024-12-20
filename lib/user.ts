// models/User.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export const createAdminUser = async () => {
  const existingUser = await prisma.usuarios.findFirst()
  const hashedPassword = await bcrypt.hash('1234', 10)
  if (!existingUser) {
    await prisma.usuarios.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword, // Use uma senha segura
      },
    })
  }
}
