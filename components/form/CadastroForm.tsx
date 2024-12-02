'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { formSchema } from '@/zod-schema/schema'
import FormPersonalData from './FormPersonalData'
import FormProfessionalData from './FormProfessionalData'
import FormAddressData from './FormAddressData'
import FormTerms from './FormTerms'
import Image from 'next/image'
import { cargosValores } from '@/lib/utils'
import { Form } from '../ui/form'

export default function CadastroForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // if (!recaptchaToken){
    //   toast.error('Preencha o reCAPTCHA')
    //   return
    // }
    try {
      const formData = new FormData();
      // formData.append('recaptchaToken', recaptchaToken);
      for (const [key, value] of Object.entries(values)) {
        if (key !== 'cv' && key !== 'ccc' && key !== 'cn') {
          formData.append(key, String(value));
        }
      }

      const cvFile = form.getValues('cv');
      const cccFile = form.getValues('ccc');
      const cnFile = form.getValues('cn');

      if (cvFile && cvFile[0] instanceof File) {
        formData.append('cv', cvFile[0]);
      }
      if (cccFile && cccFile[0] instanceof File) {
        formData.append('ccc', cccFile[0]);
      }
      if (cnFile && cnFile[0] instanceof File) {
        formData.append('cn', cnFile[0]);
      }
      const response = await fetch('/api/cadastrar', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Cadastro realizado:', result);
        toast.success('Cadastro realizado com sucesso!');
        router.push('/')
      } else {
        const error = await response.json();
        console.error('Erro ao cadastrar:', error);
        toast.error('Erro ao realizar o cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      toast.error('Erro ao se conectar com o servidor. Tente novamente.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a79ad] to-[#67a892] flex items-center justify-center p-8">
      <div className="relative bg-white rounded-lg shadow-xl p-10 w-full max-w-3xl">
        <div className="flex justify-center">
          <Image src="/Logo_Medlar.png" alt="Medlar Logo" width={200} height={200} className="mb-8" />
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#86b1e2]">Cadastro</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormPersonalData form={form} />
          <FormAddressData form={form} />
          <FormProfessionalData form={form} cargosValores={cargosValores} />
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
      </div>
    </div>
  );
}
