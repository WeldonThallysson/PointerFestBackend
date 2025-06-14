import {  IProductOriginal } from "../../interface/interface.checkoutPaymentMethod";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";
import { GetCouponUsageAgroupService } from "./CouponUsageServices/getCouponUsageAgroupService";
 
interface IGetDetailsCouponService {
  idUserLogged: string;
  idCoupon: string;
}
class GetDetailsCouponService {
  async execute({
    idUserLogged,
    idCoupon,
 
  }: IGetDetailsCouponService) {
   
    if (!idUserLogged) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, envie o id do responsável",
          status: 404,
        },
      };
    }

    const couponExist = await prismaClient.coupon.findFirst({
      where: {
        id: idCoupon,
      },
    });

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: idUserLogged,
      },
    });


    if (couponExist?.isMultipleProducts && couponExist?.products && typeof couponExist?.products === "string") {
      const productsConverted = JSON.parse(couponExist.products);
    
      const idProducts = productsConverted
        .map((item: IProductOriginal) => item.id)
        .filter((id: string | undefined | null) => id != null); // Ajuste no filtro
    
      if (idProducts.length > 0) {
        const existingProducts = await prismaClient.products.findMany({
          where: {
            id: {
              in: idProducts,
            },
          },
        });
    
        if (existingProducts?.length !== idProducts?.length) {
          await prismaClient.coupon.update({
            where: { id: idCoupon },
            data: { products: null },
          });
        }
      } else {
        return {
          data: {
            message: "Nenhum produto encontrado",
            status: 401
          }
        }
      }
    }

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
          message: "Não foi possível prosseguir com a ação, usuário responsável não encontrado.",
          status: 404,
        },
      };
    }

    if (!couponExist) {
       return {
         data: {
           message: "Esse cupom não existe, tente novamente",
           status: 401,
         },
       };
    }
    
    try {
      const coupons = await prismaClient.coupon.findFirst({
        where: {
           id: idCoupon
        },
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
          isMultipleProducts:true,
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
              cep: true,
              phone: true,
              city: true,
              region_code: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              cpfCnpj: true,
              email: true,
              typeAccess: true,
            },
          },
          status: true,
          created_At: true,
        },
      });

      const getCouponUsageService = new GetCouponUsageAgroupService()

      const groupedData = await getCouponUsageService.execute({idCouponUsed: coupons.id})

      return {
        data: {
          items: {
            ...coupons,
            products: typeof coupons.products === "string" ? JSON.parse(coupons.products) : couponExist.products,
            whoUsedCupom: groupedData.data.items,
          },
          status: 200,
        },
      };
    } 
    
    catch(err) {
      return {
        data: {
          message: err,
          status: 500,
        },
      };
    }
  }
}

export { GetDetailsCouponService };
