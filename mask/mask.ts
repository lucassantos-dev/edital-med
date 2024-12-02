export const normalizePhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, '')
    
    // If the resulting string is empty, return an empty string
    if (!cleanedValue) return ''
    
    // Build the formatted string starting with the area code
    let formattedValue = '(' + cleanedValue.substring(0, 2)
    
    // Add the area code, and if there are more than 2 characters, add the first group of 5 digits
    if (cleanedValue.length > 2) {
      formattedValue += ') ' + cleanedValue.substring(2, 7)
    }
    
    // If there are more than 7 characters, add the hyphen and the final group of 4 digits
    if (cleanedValue.length > 7) {
      formattedValue += '-' + cleanedValue.substring(7, 11)
    }
  
    return formattedValue
  }
  export const normalizeCPF = (value: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Se não houver nada, retorna uma string vazia
    if (!cleanedValue) return '';

    // Formata o CPF no formato XXX.XXX.XXX-XX
    let formattedValue = cleanedValue.substring(0, 3);

    if (cleanedValue.length > 3) {
        formattedValue += '.' + cleanedValue.substring(3, 6);
    }
    if (cleanedValue.length > 6) {
        formattedValue += '.' + cleanedValue.substring(6, 9);
    }
    if (cleanedValue.length > 9) {
        formattedValue += '-' + cleanedValue.substring(9, 11);
    }

    return formattedValue;
};

  export const normalizeCNPJ = (value: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '')
    
    // Se não houver nada, retorna uma string vazia
    if (!cleanedValue) return ''
    
    // Formata o CNPJ no formato XX.XXX.XXX/XXXX-XX
    let formattedValue = cleanedValue.substring(0, 2)
    
    if (cleanedValue.length > 2) {
      formattedValue += '.' + cleanedValue.substring(2, 5)
    }
    if (cleanedValue.length > 5) {
      formattedValue += '.' + cleanedValue.substring(5, 8)
    }
    if (cleanedValue.length > 8) {
      formattedValue += '/' + cleanedValue.substring(8, 12)
    }
    if (cleanedValue.length > 12) {
      formattedValue += '-' + cleanedValue.substring(12, 14)
    }
    
    return formattedValue
  }

  export const normalizeCEP = (value: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '')
  
    // Se não houver nada, retorna uma string vazia
    if (!cleanedValue) return ''
  
    // Formata o CEP no formato XXXXX-XXX
    let formattedValue = cleanedValue.substring(0, 5)
    if (cleanedValue.length > 5) {
      formattedValue += '-' + cleanedValue.substring(5, 8)
    }
  
    return formattedValue
  }