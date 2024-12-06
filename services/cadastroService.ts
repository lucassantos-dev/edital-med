import { formSchema } from '@/zod-schema/schema'
import { z } from 'zod'

export default async function submitCadastro( formData: FormData
) {
  const response = await fetch('/api/cadastro', {
    method: 'POST',
    body: formData,
  })
  return response
}

// Função para preparar os dados do formulário para envio
export function prepareFormData(values: z.infer<typeof formSchema>) {
  const formData = new FormData();

  // Adiciona campos de texto
  for (const [key, value] of Object.entries(values)) {
    if (key !== 'documentos' && key !== 'cidadesSelecionadas') {
      formData.append(key, String(value)); // Converte para string
    }
  }
  if (values.documentos) {
    formData.append("documentos", values.documentos[0]);
  }
  // Serializa o array de cidades selecionadas como JSON
  console.log('Valores de cidadesSelecionadas:', values.cidadesSelecionadas);
  if (Array.isArray(values.cidadesSelecionadas)) {
    formData.append('cidadesSelecionadas', JSON.stringify(values.cidadesSelecionadas));
  }

 

  return formData;
}
