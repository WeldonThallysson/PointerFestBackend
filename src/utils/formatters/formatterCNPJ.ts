



export const formatterCNPJ = (cnpj: string) => {
  const cleanedCNPJ = cnpj.replace(/\D/g, '');  

  const formattedCNPJ = cleanedCNPJ.replace(/^(\d{2})(\d)/, '$1.$2')
                                   .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                                   .replace(/\.(\d{3})(\d)/, '.$1/$2')
                                   .replace(/(\d{4})(\d{2})$/, '$1-$2');

  return formattedCNPJ;
};
