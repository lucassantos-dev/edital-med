import prisma from '@/lib/prisma'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.usuarios.findUnique({
          where: { email: credentials?.email },
        })
        if (
          user &&
          credentials?.password &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.email, // Assuming name is not stored, using email as name
          }
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.email = user.email
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
