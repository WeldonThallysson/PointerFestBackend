import { TypesMethodPayment } from "../keys/typeMethodPayment/typesAccess";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  totalPriceIndividual?: number | null;
  quantity: number;
  isPercentage?: boolean | null;
  discount?: number | null;
}
export interface IProductOriginal {
  id: string;
  idUserOwner:string;
  name: string;
  label: string;
  description: string;
  price: number;
  imageProduct: string;
  limitAgeUse: number;
  typeExpiration: string;
  expirationDate: string;
  dateRegistered: string;
  positionOrder: number;
  available: boolean;
  allowAddCoupon: boolean;
  created_At: string;
  isPercentage?: boolean | null;
  priceDiscount?: number | null;

}

 
export interface IProductResponse {
  reference_id: string;
  name: string;
  quantity: number;
  unit_amount: number;
}

export interface ICheckoutPaymentMethodService {
  id_user_logged: string;
  idClient: string;
  paymentMethodId: string;
  identificationPhotoUrl: string;
  products: IProduct[];
}

export interface IMethodPaymentService {
  id: string;
  id_user_logged: string;
  name: string;
  description: string;
  typeMethodPayment: TypesMethodPayment;
}

export interface IDataUserPayer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  residence: string;
  neighborhood: string;
  address: string;
  city: string;
  gender: string;
  number_address: string;
  region_code: string;
  cep: string;
}

export interface ICard {
  number?: string; // Número do cartão (exemplo de teste)
  exp_month?: string; // Mês de validade
  exp_year?: string; // Ano de validade
  security_code?: string; // Código CVV
  installments?: number;
  encrypted?: string;
  store?: boolean;
  holder?: {
    name: string; // Nome do titular do cartão
    tax_id: string; // CPF do titular do cartão
  };
}
