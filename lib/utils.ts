import type { Candidatos, Cargos } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Cidades } from "@prisma/client";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validatorCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs com todos os números iguais (ex.: "11111111111111")
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Validação dos dígitos verificadores
  const validarDigito = (cnpj: string, posicoes: number[]) => {
    const soma = cnpj
      .slice(0, posicoes.length)
      .split('')
      .reduce((acc, digit, i) => acc + parseInt(digit) * posicoes[i], 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const digitosVerificadores = cnpj.slice(-2);

  // Primeiro dígito verificador
  const primeiroDigito = validarDigito(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (parseInt(digitosVerificadores[0]) !== primeiroDigito) return false;

  // Segundo dígito verificador
  const segundoDigito = validarDigito(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (parseInt(digitosVerificadores[1]) !== segundoDigito) return false;

  return true;
}

export function validateValor(valor: number, cargo: string, cargos: Cargos[]): string | true {
  const cargoSelecionado = cargos.find((c) => c.nome === cargo);
  if (!cargoSelecionado) return 'Selecione um cargo válido';

  if (valor > cargoSelecionado.valor_medio) {
    return `O valor máximo permitido para ${cargoSelecionado.nome} é R$ ${cargoSelecionado.valor_medio.toFixed(2)}`;
  }
  return true;
}

export async function fetchCargos(): Promise<Cargos[]>{
  try {
    const response = await fetch('/api/cargos')
    const data = await response.json()
    return data.cargos
  } catch(erro){
    console.log(erro)
    return []
  }
}

// export const cargosValores = {
//   enfermeiro: 30,
//   medico: 50,
//   auxiliar: 20,
//   fisioterapeuta: 35,
//   nutricionista: 25,
// } as const;

// export type Cargo = keyof typeof cargosValores;


export const handlerCidade = async (
  uf: string,
  setCidades: (cidades: Cidades[]) => void
) => {
  try {
    const response = await fetch(`/api/cidades?uf=${uf}`);
    const data = await response.json();
    setCidades(data.cidades || []);
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    setCidades([]);
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleCepChange = async (cep: string, setCepLoading: (loading: boolean) => void, form: any,setCidades: (cidades: Cidades[]) => void ) => {
  if (cep.length === 8) {
    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        console.log('CEP não encontrado.');
        form.setValue('cidade', '');
        form.setValue('estado', '');
      } else {
        // Atualiza os campos de cidade e estado
        form.setValue('cidade', data.localidade || '');
        form.setValue('estado', data.uf || '');

        handlerCidade(data.uf, setCidades)
      }
    } catch (error) {
      console.log('Erro ao buscar o CEP. Tente novamente.' + error);
    } finally {
      setCepLoading(false);
    }
  } else {
    form.setValue('cidade', '');
    form.setValue('estado', '');
  }
};


export function generateCandidateEmailTemplate(nome: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 10px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      text-align: left;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #777;
      font-size: 12px;
    }
    a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Confirmação de Cadastro</h1>
    </div>
    <div class="content">
      <p>Olá <strong>${nome}</strong>,</p>
      <p>Seu cadastro foi realizado com sucesso. Estamos analisando as informações fornecidas e entraremos em contato caso seja selecionado para a próxima etapa do processo.</p>
      <p>Desejamos boa sorte!</p>
      <p>Atenciosamente,<br>Equipe de Recrutamento</p>
    </div>
    <div class="footer">
      <p>Este é um e-mail automático. Por favor, não responda.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateRHTemplate(data: Candidatos): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007BFF;
      color: #ffffff;
      text-align: center;
      padding: 10px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      text-align: left;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #777;
      font-size: 12px;
    }
    a {
      color: #007BFF;
      text-decoration: none;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table th, .info-table td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    .info-table th {
      background-color: #f4f4f4;
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Novo Cadastro Recebido</h1>
    </div>
    <div class="content">
      <p>Prezada equipe do RH,</p>
      <p>Um novo candidato foi cadastrado no sistema. Aqui estão os detalhes:</p>
      <table class="info-table">
        <tr>
          <th>Nome</th>
          <td>${data.nome}</td>
        </tr>
        <tr>
          <th>E-mail</th>
          <td>${data.email}</td>
        </tr>
        <tr>
          <th>Telefone</th>
          <td>${data.telefone}</td>
        </tr>
        <tr>
          <th>Cargo</th>
          <td>${data.cargo}</td>
        </tr>
        <tr>
          <th>Cidade/Estado</th>
          <td>${data.cidade} / ${data.estado}</td>
        </tr>
        <tr>
          <th>Especialização</th>
          <td>${data.especializacao}</td>
        </tr>
        <tr>
          <th>Experiência</th>
          <td>${data.experiencia}</td>
        </tr>
      </table>
      <p>Os arquivos estão anexados </p>
      
      <p>Atenciosamente,<br>Equipe do Sistema</p>
    </div>
    <div class="footer">
      <p>Este é um e-mail automático. Por favor, não responda.</p>
    </div>
  </div>
</body>
</html>
  `;
}
