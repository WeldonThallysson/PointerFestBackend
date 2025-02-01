


export enum TypesMethodPayment {
    AVISTA = "avista",
    Pix = 'pix',
    Credit = 'credito',
    Debit = 'debito'
}


export enum TypesMethodPaymentResponse {
    AVISTA = "AVISTA",
    PIX = 'PIX',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD'
}
export const validateTypeMethodsPayment = [
    TypesMethodPayment.AVISTA,
    TypesMethodPayment.Pix,
    TypesMethodPayment.Debit,
    TypesMethodPayment.Credit
] 


