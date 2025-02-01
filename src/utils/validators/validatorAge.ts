export const validatorAge = (birthDate: string) => {
    const today = new Date(); // Data atual
    const birth = new Date(birthDate); // Data de nascimento do payload
  
    // Calcula a diferença de anos
    let age = today.getFullYear() - birth.getFullYear();
  
    // Ajusta a idade se o aniversário ainda não aconteceu este ano
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age < 18; // Retorna true se maior ou igual a 18, caso contrário false
  };