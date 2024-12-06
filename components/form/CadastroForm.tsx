'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from 'react'
import { toast } from 'react-toastify'
// import ReCAPTCHA from 'react-google-recaptcha'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { formSchema } from '@/zod-schema/schema'
import FormPersonalData from './FormPersonalData'
import FormProfessionalData from './FormProfessionalData'
import FormAddressData from './FormAddressData'
import FormTerms from './FormTerms'
import Image from 'next/image'
import { Form } from '../ui/form'
import submitCadastro, { prepareFormData } from '@/services/cadastroService'
import { useState } from 'react'

export default function CadastroForm() {
  // const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      cnpj_cpf: '',
      telefone: '',
      especializacao: 'nao',
      experiencia: 'nao',
      experienciaHomeCare: 'nao',
      cargo: '',
      sexo: '',
      valor: '',
      idade: '',
      cep: '',
      cidade: '',
      estado: '',
      email: '',
      isCpf: false,
    },
  })
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    // if (!recaptchaToken){
    //   toast.error('Preencha o reCAPTCHA')
    //   return
    // }
    try {
      setIsLoading(true);
      const formData = prepareFormData(values);
      const response = await submitCadastro(formData);
      if (response.status === 201) {
        // Cadastro realizado com sucesso
        toast.success('Cadastro realizado com sucesso!');
        router.push('/');
      } else if (response.status === 204) {
        // Aviso amigável para status 404
        const responseData = await response.json();
        toast.warning(responseData.message || 'O cadastro já existe');
      } else {
        // Para qualquer outro status, exiba uma mensagem genérica
        const responseData = await response.json();
        toast.error(responseData.message || 'Erro ao realizar o cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro inesperado ao realizar o cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a79ad] to-[#67a892] flex items-center justify-center p-8">
      <div className="relative bg-white rounded-lg shadow-xl p-10 w-full max-w-3xl">
        <div className="flex justify-center">
          <Image src="/Logo_Medlar.png" alt="Medlar Logo" width={200} height={200} className="mb-8" />
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#86b1e2]">Cadastro</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4a79ad]"></div>
          </div>
        ) : (
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border-2 p-3 border-gray-200 pb-4 rounded-sm">
            <FormPersonalData form={form} />
            <FormAddressData form={form} />
            <FormProfessionalData form={form}/>
            <FormTerms form={form.control} />
            {/* <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={String(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)}
                onChange={(token) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
              />
            </div> */}
            <Button  type="submit" className="w-full bg-[#67a892] hover:bg-[#4a79ad] h-12 text-lg">
              Cadastrar
            </Button>
            {/* <Button disabled={!recaptchaToken} type="submit" className="w-full bg-[#67a892] hover:bg-[#4a79ad] h-12 text-lg">
              Cadastrar
            </Button> */}
          </form>
          </Form>
        )}
        
      </div>
    </div>
  )
}
