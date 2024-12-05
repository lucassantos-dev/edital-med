import { formSchema } from '@/zod-schema/schema'
import { z } from 'zod'

export default async function submitCadastro( formData: FormData
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

// Função para preparar os dados do formulário para envio
export function prepareFormData(values: z.infer<typeof formSchema>) {
  const formData = new FormData();

  // Adiciona campos de texto
  for (const [key, value] of Object.entries(values)) {
    if (key !== 'documentosCpf' && key !== 'documentosCnpj' && key !== 'cidadesSelecionadas') {
      formData.append(key, String(value)); // Converte para string
    }
  }

  // Serializa o array de cidades selecionadas como JSON
  console.log('Valores de cidadesSelecionadas:', values.cidadesSelecionadas);
  if (Array.isArray(values.cidadesSelecionadas)) {
    formData.append('cidadesSelecionadas', JSON.stringify(values.cidadesSelecionadas));
  }

  // Adiciona arquivos do CPF ou CNPJ
  if (values.isCpf && values.documentosCpf) {
    const documentosCpf = values.documentosCpf;

    // Verifica e adiciona os arquivos correspondentes ao CPF
    if (documentosCpf.cv) {
      formData.append("cv", documentosCpf.cv[0]);
    }
    if (documentosCpf.carteiraConselhoClasse) {
      formData.append("carteiraConselhoClasse", documentosCpf.carteiraConselhoClasse[0]);
    }
    if (documentosCpf.certidaoNegativa) {
      formData.append("certidaoNegativa", documentosCpf.certidaoNegativa[0]);
    }
  }

  if (!values.isCpf && values.documentosCnpj) {
    const documentosCnpj = values.documentosCnpj;

    // Verifica e adiciona os arquivos correspondentes ao CNPJ
    if (documentosCnpj.relacaoProfissionais) {
      formData.append("relacaoProfissionais", documentosCnpj.relacaoProfissionais[0]);
    }
    if (documentosCnpj.cnaes) {
      formData.append("cnaes", documentosCnpj.cnaes[0]);
    }
    if (documentosCnpj.registroConselhoClasse) {
      formData.append("registroConselhoClasse", documentosCnpj.registroConselhoClasse[0]);
    }
    if (documentosCnpj.alvaraFuncionamento) {
      formData.append("alvaraFuncionamento", documentosCnpj.alvaraFuncionamento[0]);
    }
    if (documentosCnpj.alvaraSanitario) {
      formData.append("alvaraSanitario", documentosCnpj.alvaraSanitario[0]);
    }
  }

  return formData;
}
