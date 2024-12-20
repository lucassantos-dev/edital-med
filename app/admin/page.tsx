import LoginForm from '@/components/adm/login-form'
import { createAdminUser } from '@/lib/user'

export default function LoginPage() {
  createAdminUser()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4a79ad] to-[#67a892]">
      <LoginForm />
    </div>
  )
}
