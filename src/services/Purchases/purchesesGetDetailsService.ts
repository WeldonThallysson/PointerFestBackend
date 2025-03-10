import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import { validatorPermissions } from "../../utils/validators/validatorPermissions";

interface IGetDetailsVoucher {
  idUserLogged: string;
  id: string;
  idOtherUser?: string | null; // Novo campo opcional
}

class GetDetailsVoucherService {
  async execute({
    id,
    idUserLogged,
    idOtherUser,
  }: IGetDetailsVoucher) {
    if (!id) {
      return {
        data: {
          message: "Não foi possível prosseguir com está ação, id do voucher não informado",
          status: 400,
        },
      };
    }

    if (!idUserLogged) {
      return {
        data: {
          message: "Não foi possível prosseguir com está ação, id do responsável não informado",
          status: 400,
        },
      };
    }

    // Verifica se o voucher existe
    const voucherExists = await prismaClient.purchases.findFirst({
      where: { id },
    });

    if (!voucherExists) {
      return {
        data: {
          message: "Não foi possível prosseguir, o voucher não foi emitido e não existe.",
          status: 404,
        },
      };
    }

    // Verifica se o usuário logado existe
    const userExists = await prismaClient.users.findFirst({
      where: { id: idUserLogged },
    });

    if (!userExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com está ação, usuário responsável não existe",
          status: 404,
        },
      };
    }

    // Verifica as permissões do usuário
    const responseValidation = validatorPermissions({
      typeAccess: userExists.typeAccess,
    });

    // Se idOtherUser for fornecido, valida se o usuário logado tem permissão
    if (idOtherUser && responseValidation === false) {
      return {
        data: {
          message: "Sua conta não tem permissão para buscar os detalhes do voucher de outro usuário.",
          status: 403,
        },
      };
    }
    // Define o `idUserToQuery` como `idOtherUser` se passado, caso contrário, usa `idUserLogged`
    const idUserToQuery = idOtherUser ?? idUserLogged;

    try {
      // Busca os detalhes do voucher
      const dataResponseVoucher = await prismaClient.purchases.findFirst({
        where: {
          id,
          idUser: idUserToQuery, 
        },
        select: {
          id: true,
          idUser: true,
          idMethodPayment: true,
          codePayment: true,
          methodsPayments:true, 
          codeReferencePayment: true,
          datePayment: true,
          totalPrice: true,
          status: true,
          products: true,
          created_At: true,
        },
      });

      if (!dataResponseVoucher) {
        return {
          data: {
            message: "Não foi possível prosseguir com está ação, essa compra não existe!",
            status: 404,
          },
        };
      }
      
      // Formata os dados do voucher
      const dataDetailsVoucherFormated = {
        ...dataResponseVoucher,
        products: typeof dataResponseVoucher?.products === 'string' ? JSON.parse(dataResponseVoucher.products) : dataResponseVoucher.products,
        datePayment: formatterDateToIso(dataResponseVoucher.datePayment),
      };

      return {
        data: {
          items: {
            dataDetailsVoucherFormated,
          },
          status: 200,
        },
      };
    } catch (error: any) {
      return {
        data: {
          message: MessagesError.GetDetailsMessageError,
          error: error?.message,
          status: 500,
        },
      };
    }
  }
}

export { GetDetailsVoucherService };
