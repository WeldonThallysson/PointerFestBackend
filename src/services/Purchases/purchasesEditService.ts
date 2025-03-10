import { TypesMethodPayment, TypesMethodPaymentResponse } from "../../keys/typeMethodPayment/typesAccess";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate"; 
import { IProduct } from "../../interface/interface.checkoutPaymentMethod";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { Messages, MessagesError } from "../../constants/messages.api";


 
interface IPurchasesEdit {
    id: string
    idUserLogged: string
    typeMethodPayment: string
    datePayment: string
    codePayment: string
    codeReferencePayment: string
    products: IProduct[]
    totalPrice?: number | null
}

class PurchasesEditService {
  async execute({
    id,
    idUserLogged,
    typeMethodPayment,
    codeReferencePayment,
    codePayment,
    datePayment,
    products,
    totalPrice
  }: IPurchasesEdit) { 
    if (
      !id ||
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
            "id",
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
      where: { id: idUserLogged },
    });

    const userLoggedExists = await prismaClient.users.findFirst({
      where: {
        id: idUserLogged
      }
    })


    const voucherExists = await prismaClient.purchases.findFirst({
      where: { 
        id: id,
        //idUser: idUserLogged
      }
  })

    if(!voucherExists){
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, esse voucher não existe!.",
          status: 403,
        },
       }
    }

    if(voucherExists.idUser === idUserLogged && userLoggedExists?.typeAccess === TypesAccess.Admin){
      return {
        data: {
          message: "Sua conta não possui autorização para realizar esta ação, você não pode editar seu próprio voucher, apenas contas master.",
          status: 403,
        },
       }
    }

    if(!userLoggedExists){
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, o usuário responsável não existe!.",
          status: 403,
        },
       }
    }

    if (!userExists) {
      return {
        data: {
          message: "Usuário não cadastrado no sistema.",
          status: 403,
        },
      };
    }
    

    
    if(
      userLoggedExists?.typeAccess !== TypesAccess.Owner && 
      userLoggedExists?.typeAccess !== TypesAccess.Developer &&
      userLoggedExists?.typeAccess !== TypesAccess.Master){
      return {
        data: {
          message: "Não foi possível prosseguir, sua conta não possui permissão para esta ação apenas contas master!",
          status: 404,
        },
      }
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

    // Buscar se o método de pagamento existe no banco
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

    try {
      await prismaClient.purchases.update({
        where: {
          id: id
        },
        data: {
          products: JSON.stringify(products),
          codePayment: codePayment,
          codeReferencePayment: codeReferencePayment,
          idUser: userExists.id,
          idMethodPayment: methodPaymentExists.id,
          datePayment: formatterDateToIso(datePayment),
          totalPrice: totalPrice ? totalPrice : voucherExists.totalPrice,
        },
      });
      
      return {
        data: {
          message: Messages.UpdateMessageSuccess,
          status: 201,
        },
      };
    } 
    
    catch (err) {
      return {
        data: {
          message: `${MessagesError.UpdateMessageError} ${err}`,
          error: err,
          status: 500,
        },
      };
    }
  }
}

export {PurchasesEditService};
