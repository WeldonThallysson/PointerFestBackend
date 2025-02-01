


export const formatterPrice = (value?: number) => {

    if(value){
        const priceFormated = new Intl.NumberFormat('pt-BR', {
            style: "currency",
            currency: "BRL"
        }).format(value)
        return priceFormated 
    }
  
}


export const formatterCurrency = (value?: number | null) => {
    if (value !== null && value !== undefined) {
        const currency = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100); // Divide o valor por 100 para obter o valor real em reais
        return currency;
    }
    return "R$ 0,00"; // Valor padrão para casos nulos
};