export const formatterCEP = (cep: string) => {
    if(cep){
        const cleanedCEP = cep.replace(/\D/g, '');
        /*
         if (cleanedCEP.length !== 8) {
            throw new Error('CEP inválido. Deve conter 8 dígitos.');
        }
    
        */
        const formattedCEP = cleanedCEP.replace(/(\d{5})(\d{3})/, '$1-$2');
    
        return formattedCEP;
    }

    return null
   
};