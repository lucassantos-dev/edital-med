import { formSchema } from '@/zod-schema/schema'
import { z } from 'zod'

export default async function submitCadastro(
  values: z.infer<typeof formSchema>, formData: FormData
) {
  const response = await fetch('/api/cadastro', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao realizar o cadastro')
  }

  return await response.json()
}

export function prepareFormData(values: z.infer<typeof formSchema>, cvFile: FileList | null, cccFile: FileList | null, cnFile: FileList | null) {
  const formData = new FormData()

  // Adiciona campos de texto
  for (const [key, value] of Object.entries(values)) {
    if (key !== 'cv' && key !== 'ccc' && key !== 'cn') {
      formData.append(key, String(value))
    }
  }

  // Adiciona arquivos
  if (cvFile?.[0] instanceof File) {
    formData.append('cv', cvFile[0])
  }
  if (cccFile?.[0] instanceof File) {
    formData.append('ccc', cccFile[0])
  }
  if (cnFile?.[0] instanceof File) {
    formData.append('cn', cnFile[0])
  }

  return formData
}