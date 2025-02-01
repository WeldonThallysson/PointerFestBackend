export const separatePhoneNumber = (phone: string) => {
  // Remove todos os caracteres não numéricos
  const cleanedPhone = phone.replace(/\D/g, "");

  // Regex para capturar código do país, DDD e número (código de país pode ter até 3 dígitos)
  const regex = /^(\d{1,3})(\d{2})(\d{9,})$/; // Exemplo: "55" + "11" + "999999999"
  
  const match = cleanedPhone.match(regex);
  
  if (!match) {
      throw new Error("Número de telefone inválido.");
  }

  // Desestruturação dos grupos da regex
  const [, country, area, number] = match;
  
  return {
      country, // Código do país (1-3 dígitos)
      area,    // DDD (2 dígitos)
      number,  // Número de telefone (9 ou mais dígitos)
  };
};


export const formatPhoneNumber = (phone: string) =>  {
  // Remove caracteres não numéricos
  const digits = phone.replace(/\D/g, "");

  // Formata no padrão (xx) xxxxx-xxxx
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  // Formata no padrão (xx) xxxx-xxxx (caso não tenha 11 dígitos)
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  // Retorna o número como está se não tiver 10 ou 11 dígitos
  return phone;
}