
import prismaClient from "../../prisma";
import { TypesMethodPayment } from "../../keys/typeMethodPayment/typesAccess";
import { PixPaymentMethodService } from "./checkouts/pixCheckoutService";
import { DebitPaymentMethodService } from "./checkouts/debitCheckoutService";
import { CreditPaymentMethodService } from "./checkouts/creditCardCheckoutService";
import { ICard, IProduct } from "../../interface/interface.checkoutPaymentMethod";
import { TypesCustomCodeErrors } from "../../keys/typeCustomCodeErrors/typesAccess";

/**
 * Valida a entrada obrigatória e lança um erro se não existir.
 */

interface ICheckoutPaymentMethodService {
  id_user_logged: string;
  paymentMethodId: string;
  products: IProduct[];
  cardData?: ICard | null
  id_authentication_method?:string | null
}

const validateInput = (condition: any, message: string) => {
  if (!condition) {
    return {
      data: {
        message: message,
        status: 401,
      },
    };
  }
};

const findOrFail = async (query: Promise<any>, message: string) => {
  const result = await query;
  if (!result) {
    return {
      data: {
        message: message,
        status: 404,
      },
    };
  }
  return result;
};

class CheckoutPaymentMethodService {
  async execute({
      id_user_logged,
      paymentMethodId,
      products,
      cardData,
      id_authentication_method
    }: ICheckoutPaymentMethodService){
      validateInput(id_user_logged, "ID do responsável é obrigatório.");
      validateInput(paymentMethodId, "Método de pagamento é obrigatório.");
      validateInput(products.length > 0, "Pelo menos um produto é necessário.");
    
      const [userLogged, methodPayment] = await Promise.all([
        findOrFail(
          prismaClient.users.findFirst({
            where: { id: id_user_logged },
            select: {
              id: true,
              name: true,
              email: true,
          
              cpfCnpj: true,
              birthDate: true,
              gender: true,
              phone: true,
              city: true,
              neighborhood: true,
              cep: true,
              number_address: true,
              region_code: true,
              status: true,
              termsPrivacyPolicy: true,
              termsUseLGPD: true,
              termsUsePlatform: true
            },
          }),
          "Usuário responsável não encontrado."
        ),
        findOrFail(
          prismaClient.methodsPayments.findFirst({
            where: { id: paymentMethodId },
          }),
          "Método de pagamento não encontrado."
        ),
      ]);
    
      if(!userLogged.city || !userLogged.neighborhood || !userLogged.cep || !userLogged.number_address || !userLogged.region_code){
        return {
          data: {
            message: "Antes de prosseguir para o pagamento, preencha os dados de endereço da sua conta, para comprar seu passaporte.",
            codeError: TypesCustomCodeErrors.ADDRESSEMPTY,
            status: 401,
          },
        }
      }
      

      if (userLogged)
        switch (methodPayment.typeMethodPayment) {
          case TypesMethodPayment.Pix:
            if(!products){
              return  {
               data: {
                 message: "Não foi possível prosseguir com a ação, envie pelo menos 1 produto",
                 status: 400,
               },
              }
            }
            return new PixPaymentMethodService().execute({
              dataUserPayer: userLogged,
              products: products,
            });
    
          case TypesMethodPayment.Debit:
            if(!cardData){
              return  {
               data: {
                 message: "Não foi possível prosseguir com a ação, envie os dados do cartão para comprar o passaporte. ",
                 status: 400,
               },
              }
            }
            return new DebitPaymentMethodService().execute({
              dataUserPayer: userLogged,
              products: products,
              cardData: cardData,
              id_authentication_method: id_authentication_method
            });

            
          case TypesMethodPayment.Credit:
             if(!cardData){
               return  {
                data: {
                  message: "Não foi possível prosseguir com a ação, envie os dados do cartão e as parcelas para comprar o passaporte. ",
                  status: 400,
                },
               }
             }
            return new CreditPaymentMethodService().execute({
              dataUserPayer: userLogged,
              products: products,
              cardData: cardData,
              
            });
          default:
            return {
              data: {
                message: "Não foi possível prosseguir com a ação, método de pagamento não aceito.",
                status: 401
              },
            };
        }
    };

}

export {CheckoutPaymentMethodService}
