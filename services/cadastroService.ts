import { formSchema } from '@/zod-schema/schema'
import { z } from 'zod'

export default async function submitCadastro(formData: FormData) {
  const response = await fetch('/api/cadastro', {
    method: 'POST',
    body: formData,
  })
  return response
}

export function prepareFormData(values: z.infer<typeof formSchema>) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(values)) {
    if (key !== 'documentos' && key !== 'cidadesSelecionadas') {
      formData.append(key, String(value))
    }
  }
  if (values.documentos) {
    formData.append('documentos', values.documentos[0])
  }
  if (Array.isArray(values.cidadesSelecionadas)) {
    formData.append(
      'cidadesSelecionadas',
      JSON.stringify(values.cidadesSelecionadas),
    )
  }
  return formData
}
