import { TypesAccess } from "../../../keys/typeAccess/typesAccess";
import prismaClient from "../../../prisma";
//import { todayFormattedWithTimeToIso } from "../../../utils/formatters/formatterToday";

interface IGetCouponUsageService {
  idUserOwner: string;
  page?: number | null;
  limit?: number | null;
}

class GetCouponUsageService {
  async execute({ idUserOwner, page, limit }: IGetCouponUsageService) {
    if (!idUserOwner) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, envie o id do responsável",
          status: 404,
        },
      };
    }

    const userExistsLogged = await prismaClient.users.findFirst({
      where: { id: idUserOwner },
    });

    if (!userExistsLogged) {
      return {
        data: {
          message: "Usuário responsável não encontrado.",
          status: 404,
        },
      };
    }

    if (
      userExistsLogged.typeAccess === TypesAccess.User ||
      userExistsLogged.typeAccess === TypesAccess.Promoter ||
      userExistsLogged.typeAccess === TypesAccess.Worker
    ) {
      return {
        data: {
          message: "Você não tem permissão para realizar está ação",
          status: 403,
        },
      };
    }

    const shouldPaginate = page !== undefined || limit !== undefined;
    const skip = shouldPaginate ? ((page ?? 1) - 1) * (limit ?? 10) : undefined;
    const take = shouldPaginate ? page ?? 10 : undefined;

    try {
      const couponUsage = await prismaClient.couponUsage.findMany({
        skip,
        take,
        orderBy: { created_At: "desc" },
      });
      
      const totalCouponUsage = await prismaClient.coupon.count();
      const totalPages = shouldPaginate
        ? Math.ceil(totalCouponUsage / (limit ?? 10))
        : 1;
      
      return {
        data: {
          items: couponUsage,
          totalItems: totalCouponUsage,
          totalPages,
          currentPage: shouldPaginate ? page ?? 1 : 1,
          status: 200,
        },
        status: 200,
      };
    } catch (err) {
      console.error(err);
      return {
        data: {
          message: "Erro ao atualizar cupons utilizados.",
          error: err.message,
          status: 500,
        },
      };
    }
  }
}

export { GetCouponUsageService };
