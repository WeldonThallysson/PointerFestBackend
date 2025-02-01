export const formatterCPF = (cpf: string) => {
    const cleanedCPF = cpf.replace(/\D/g, '');


    /*
      if (cleanedCPF.length !== 11) {
        throw new Error('CPF inválido. Deve conter 11 dígitos.');
       }

    */

    const formattedCPF = cleanedCPF.replace(/(\d{3})(\d)/, '$1.$2') 
                                    .replace(/(\d{3})(\d)/, '$1.$2') 
                                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return formattedCPF;
};
