import { TypesMethodPayment, TypesMethodPaymentResponse } from "../../keys/typeMethodPayment/typesAccess";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import { IProduct } from "../../interface/interface.checkoutPaymentMethod";
import { todayWithTime } from "../../utils/formatters/formatterToday";
import { Messages, MessagesError } from "../../constants/messages.api";
 
interface IRegisterPurchases{
    cpfCnpj: string
    typeMethodPayment: string
    datePayment: string
    codePayment: string
    codeReferencePayment: string
    products: IProduct[]
    totalPrice?: number | null
}

class PurchasesRegisterService {
  async execute({
    cpfCnpj,
    typeMethodPayment,
    codeReferencePayment,
    codePayment,
    datePayment,
    products,
    totalPrice
  }: IRegisterPurchases) {
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (
      !cpfCnpj ||
      !typeMethodPayment ||
      !codePayment ||
      !codeReferencePayment ||
      !datePayment ||
      !products
    ) {
      return {
        data: {
          message: "Não foi possível prosseguir, as propriedades estão incorretas",
          fields: [
            "cpfUser",
            "typeMethodPayment",
            "codePayment",
            "codeReferencePayment",
            "datePayment",
            "products"
          ],
          status: 400,
        },
      };
    }

    // Verificar se o usuário existe
    const userExists = await prismaClient.users.findFirst({
      where: { cpfCnpj: cpfCnpj },
    });


    if (!userExists) {
      return {
        data: {
          message: "Usuário não cadastrado no sistema.",
          status: 403,
        },
      };
    }

    // Determinar o tipo de pagamento
    let paymentMethod: string;

    switch (typeMethodPayment) {
      case TypesMethodPaymentResponse.AVISTA:
      case TypesMethodPayment.AVISTA:
        paymentMethod = "avista";
        break;
      case TypesMethodPaymentResponse.PIX:
      case TypesMethodPayment.Pix:
        paymentMethod = "pix";
        break;
      case TypesMethodPaymentResponse.CREDIT_CARD:
      case TypesMethodPayment.Credit:
        paymentMethod = "credito";
        break;
      case TypesMethodPaymentResponse.DEBIT_CARD:
      case TypesMethodPayment.Debit:
        paymentMethod = "debito";
        break;
      default:
        return {
          data: {
            message: "Método de pagamento inválido.",
            status: 400,
          },
        };
    }

    const methodPaymentExists = await prismaClient.methodsPayments.findFirst({
      where: { typeMethodPayment: paymentMethod },
    });

    if (!methodPaymentExists) {
      return {
        data: {
          message: "Método de pagamento não encontrado.",
          status: 404,
        },
      };
    }
    
    const todayAt = todayWithTime();
    
    try {
     const responseVoucher = await prismaClient.purchases.create({
        data: {
          products: JSON.stringify(products),
          codePayment: codePayment,
          codeReferencePayment: codeReferencePayment,
          idUser: userExists.id,
          idMethodPayment: methodPaymentExists.id,
          datePayment: formatterDateToIso(datePayment),
          totalPrice: totalPrice ? totalPrice : null,
          created_At: todayAt
        },
      });
      
      return {
        data: {
          message: Messages.RegisterMessageSuccess,
          id: responseVoucher.id,
          userId: userExists.id,
          status: 201,
        },
      };
    } catch (error: any) {
      return {
        data: {
          message: `${MessagesError.RegisterMessageError} ${error}`,
          error: error?.message,
          status: 500,
        },
      };
    }
  }
}

export {PurchasesRegisterService};
