import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";

interface IGetAllCouponService {
  idUserOwner: string;
  idPromoter?: string | null
  codeCoupon?: string | null;
  typeAccess?: string | null;
  status?: string | null;
  page?: number | null;
  limit?: number | null;
}
class GetAllCouponService {
  async execute({
    idUserOwner,
    idPromoter,
    codeCoupon,
    typeAccess,
    status,
    page,
    limit,
  }: IGetAllCouponService) {
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
      where: {
        id: idUserOwner,
      },
    });

    if (userExistsLogged.typeAccess === TypesAccess.User) {
      return {
        data: {
          message:
            "Sua conta não possui permissão para realizar esta ação, apenas para conta master",
          status: 403,
        },
      };
    }

    if (!userExistsLogged) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, usuário responsável não encontrado.",
          status: 404,
        },
      };
    }

    const where: any = {};

    if (codeCoupon) where.codeCoupon = { contains: codeCoupon, mode: "insensitive" };
    
    if (idPromoter && userExistsLogged?.typeAccess === TypesAccess.Promoter ) where.idPromoter = { contains: idPromoter, mode: "insensitive"}

    if (status && status !== "null" && status !== "undefined") {
      where.status = status === "true" ? true : false;
    }

    const shouldPaginate = page !== undefined || limit !== undefined;
    const skip = shouldPaginate ? ((page ?? 1) - 1) * (limit ?? 10) : undefined;
    const take = shouldPaginate ? limit ?? 10 : undefined;

    try {
      const coupons = await prismaClient.coupon.findMany({
        where: where,
        skip: skip,
        take,
        orderBy: { created_At: "desc" },
        select: {
          id: true,
          idUserOwner: true,
          idProduct: true,
          idPromoter: true,
          codeCoupon: true,
          expirationCoupon: true,
          limitUseMax: true,
          limitCouponUsed: true,
          priceDiscount: true,
          cpfForUseUnique:true,
          isPercentage: true,
          commissionPromoter:true,
          isMultipleProducts: true,
          products: true,
          product: {
            select: {
              id: true,
              idUserOwner: true,
              name: true,
              price: true,
              description: true,
              allowAddCoupon: true,
              dateRegistered: true,
            }
          },
          promoter: {
            select: {
              id: true,
              name: true,
              email: true,
              typeAccess: true,
              gender: true,
              birthDate: true,
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              typeAccess: true,
            },
          },
          status: true,
          created_At: true,
        },
      });

      const totalCoupon = await prismaClient.coupon.count({ where });
      const totalPages = shouldPaginate
        ? Math.ceil(totalCoupon / (limit ?? 10))
        : 1;

      const couponExist = coupons.map((item) => {
        return {
          ...item,
          products: typeof item.products === "string" && JSON.parse(item.products)
        }
      });

      return {
        data: {
          items: couponExist,
          totalItems: totalCoupon,
          totalPages,
          currentPage: shouldPaginate ? page ?? 1 : 1,
          status: 200,
        },
        status: 200,
      };
    } catch (err) {
      return {
        data: {
          message: err,
          status: 500,
        },
      };
    }
  }
}

export { GetAllCouponService };
