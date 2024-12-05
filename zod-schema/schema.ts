import { z } from "zod";

// Regex para validar número de telefone no formato (XX) XXXXX ou (XX) XXXXX-YYYY
const phoneRegex = /^\(\d{2}\) \d{5}(?:-\d{4})?$/;

// Constantes para validação de arquivos
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const SUPPORTED_FORMATS = [
//   "application/pdf",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   "application/zip", // Formato ZIP
//   "application/x-rar-compressed", // Formato RAR
// ];
// Função de validação para CPF
const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11) return false;

  // Verificação de CPF com todos os dígitos iguais
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Cálculo dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(cpf.charAt(10));
};

// Função de validação para CNPJ
const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14) return false;

  // Verificação de CNPJ com todos os dígitos iguais
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Cálculo dos dígitos verificadores
  let sum = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let resto = sum % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cnpj.charAt(12)) !== digito1) return false;

  sum = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  resto = sum % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;

  return parseInt(cnpj.charAt(13)) === digito2;
};

// Validação para arquivos
const fileSchema = (errorMessage: string) =>
  z.custom<FileList>((value) => {
    if (!(value instanceof FileList) || value.length === 0) {
      return false;
    }
    // const file = value[0];
    // const isValidSize = file.size <= MAX_FILE_SIZE;
    // const isValidFormat = true
    return true; 
  }, errorMessage);

// Validação de cidades selecionadas
const cidadeSelecionadaSchema = z.object({
  id: z.number(), // ID da cidade
  nome: z.string().min(1), // Nome da cidade
});

// Schema principal com validação condicional de documentos
export const formSchema = z
  .object({
    nome: z.string().min(2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    isCpf: z.boolean(),
    email: z.string().email({ message: "O email é inválido." }),
    idade: z
      .union([
        z.string().min(1).optional(),
        z.number()
          .min(18, {
            message: "Você deve ter pelo menos 18 anos.",
          })
          .int(),
      ])
      .optional(),
    cnpj_cpf: z.string(),
    telefone: z
      .string()
      .regex(phoneRegex, {
        message: "Telefone inválido.",
      }),
    sexo: z.string().min(2, {
      message: "Selecione o sexo",
    }),
    especializacao: z.string().optional(),
    experiencia: z.string().optional(),
    experienciaHomeCare: z.string().optional(),
    cargo: z.string().min(2, {
      message: "Selecione um cargo",
    }),
    valor: z
      .union([
        z.string().min(1).optional(),
        z.number().min(1, {
          message: "Digite um valor",
        }),
      ])
      .optional(),
    cep: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    cidadesSelecionadas: z
      .array(cidadeSelecionadaSchema)
      .min(1, { message: "Selecione ao menos uma cidade." })
      .max(3, { message: "Você pode selecionar no máximo 3 cidades." }),
    documentosCnpj: z.object({
      relacaoProfissionais: fileSchema("A relação dos Profissionais é obrigatória"),
      cnaes: fileSchema("A lista das CNAS e obrigatória"),
      registroConselhoClasse: fileSchema("O registro do conselho e obrigatória"),
      alvaraFuncionamento: fileSchema("O alvará é obrigatória"),
      alvaraSanitario: fileSchema("O alvará é obrigatória"),
    }).optional(),
    documentosCpf: z.object({
      cv: fileSchema("O currículo é obrigatório e deve ser um arquivo válido (PDF ou Word, máx. 5MB)."),
      carteiraConselhoClasse: fileSchema("A Carteira do Conselho de Classe é obrigatória."),
      certidaoNegativa: fileSchema("A certidão negativa é obrigatória."),
    }).optional(),
    terms: z.boolean({ required_error: "Você deve aceitar os termos e condições." }),
  })
  .refine(
    (data) => {
      // Validação condicional de CPF ou CNPJ
      console.log(data.isCpf)
      return data.isCpf ? validateCPF(data.cnpj_cpf) : validateCNPJ(data.cnpj_cpf);
    },
    { message: "Documento inválido", path: ["cnpj_cpf"] }
  )
