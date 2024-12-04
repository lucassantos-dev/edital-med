import { z } from "zod";

// Regex para validar número de telefone no formato (XX) XXXXX ou (XX) XXXXX-YYYY
const phoneRegex = /^\(\d{2}\) \d{5}(?:-\d{4})?$/;

// Constantes para validação de arquivos
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Validação para arquivos (currículo, CN, CCC)
const fileSchema = (errorMessage: string) =>
  z.custom<FileList>((value) => {
    if (!(value instanceof FileList) || value.length === 0) {
      return false;
    }
    const file = value[0];
    const isValidSize = file.size <= MAX_FILE_SIZE;
    const isValidFormat = SUPPORTED_FORMATS.includes(file.type);
    return isValidSize && isValidFormat; 
  }, errorMessage);

// Validação de cidades selecionadas
const cidadeSelecionadaSchema = z.object({
  id: z.number(), // ID da cidade
  nome: z.string().min(1), // Nome da cidade
})

// Schema principal
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
    cv: fileSchema("O currículo é obrigatório e deve ser um arquivo válido (PDF ou Word, máx. 5MB)."),
    ccc: fileSchema("A Carteira do Conselho de Classe é obrigatória."),
    cn: fileSchema("A certidão negativa é obrigatória."),
    terms: z.boolean({ required_error: "Você deve aceitar os termos e condições." }),
  });
