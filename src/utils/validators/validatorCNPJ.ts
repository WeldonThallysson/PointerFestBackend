

export const validatorCNPJ = (value: string) => {
    const cnpjRegex = /^\d{14}$/;
    return cnpjRegex.test(value);
};


