import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import { validatorPermissions } from "../../utils/validators/validatorPermissions";
 
interface IPurchasesGetAll {
  idUserLogged: string;
  idOtherUser?: string | null;
  idMethodPayment: string;
  codeVoucher?: string | null;
  codePayment: string;
  datePayment: string;
  limit: number;
  page: number;
}

class PurchasesGetAllService {
  async execute({
    idUserLogged,
    idOtherUser,
    idMethodPayment,
    codePayment,
    codeVoucher,
    datePayment,
    limit,
    page,
  }: IPurchasesGetAll) {
    // Verificar se o usuário existe
    const userExists = await prismaClient.users.findFirst({
      where: { id: idUserLogged },
    });

    if (!userExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com está ação, usuário responsavel não existe",
          status: 404,
        },
      };  
    }  
     
    const responseValidation = validatorPermissions({
        typeAccess: userExists.typeAccess,
      });
  
      // Verifica permissão para acessar dependentes de outro usuário
  if (idOtherUser && responseValidation === false) {
        return {
          data: {
            message: "Sua conta não tem permissão para buscar os vouchers de outro usuário.",
            status: 403,
          },
        };
      }
  
 // Define o `idUserToQuery` como `idOtherUser` se passado, caso contrário, usa `idUserLogged`
    const idUserToQuery = idOtherUser ?? idUserLogged;
    
    const where: any = { idUser: idUserToQuery };
    
    if(codeVoucher) where.id = { 
     contains: codeVoucher,
     mode: "insensitive" 
    }

    if (codePayment)
      where.codePayment = { contains: codePayment, mode: "insensitive" };
    if (datePayment)
      where.datePayment = { contains: datePayment, mode: "insensitive" };
    
    if (idMethodPayment)
      where.idMethodPayment = {
        contains: idMethodPayment,
      };

    const shouldPaginate = page !== undefined || limit !== undefined;
    const skip = shouldPaginate ? ((page ?? 1) - 1) * (limit ?? 10) : undefined;
    const take = shouldPaginate ? (limit ?? 10) : undefined;
  
    try {
      const dataResponseVouchers = await prismaClient.purchases.findMany({
        skip,
        take: take,
        where,
        orderBy: { created_At: "desc" },
        select: {
          id: true,
          idUser: true,
          idMethodPayment: true,
          methodsPayments:true, 
          codePayment: true,
          codeReferencePayment: true,
          datePayment: true,
          totalPrice: true,
          status: true,
          products: true,
          created_At: true,
        },
      });

      const dataFormated = dataResponseVouchers.map((item) => {
        return {
          ...item,
          products: typeof item.products === 'string' ? JSON.parse(item.products) : item.products,
          datePayment: formatterDateToIso(item.datePayment),
        };
      });

      const totalPurchases = await prismaClient.purchases.count({ where });
      const totalPages = shouldPaginate ? Math.ceil(totalPurchases / (limit ?? 10)) : 1;

      return {
        data: {
          items: dataFormated,
          totalItems: totalPurchases,
          totalPages: totalPages,
          currentPage: shouldPaginate ? page ?? 1 : 1,
          status: 200,
        },
      };
    } catch (error: any) {
      return {
        data: {
          message: `${MessagesError.GetAllMessageError}`,
          error: error?.message,
          status: 500,
        },
      };
    }
  }
}

export { PurchasesGetAllService };
