import { IProductOriginal } from "../../../interface/interface.checkoutPaymentMethod";
import prismaClient from "../../../prisma";
import { DateTime } from "luxon";
import { todayWithTime } from "../../../utils/formatters/formatterToday";

interface ICouponsUseds {
  codeCoupon?: string | null;
  idProduct?: string | null;
}

interface IRegisterUseCouponService {
  idUserOwner: string;
  couponsUsed?: ICouponsUseds[] | null;
}

class RegisterUseCouponService {
  async execute({ idUserOwner, couponsUsed }: IRegisterUseCouponService) {
    if (!couponsUsed || !couponsUsed.length) {
      return {
        data: {
          message:
            "Informe os códigos dos cupons de desconto utilizados para prosseguir",
          status: 401,
        },
      };
    }

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

    // Array para armazenar os resultados
    const results = [];

    for (const coupon of couponsUsed) {
      if (!coupon.codeCoupon) {
        results.push({
          codeCoupon: coupon.codeCoupon,
          message: "Código do cupom não informado.",
          status: 401,
        });
        continue;
      }

      const couponExist = await prismaClient.coupon.findFirst({
        where: { codeCoupon: coupon.codeCoupon },
        select: {
          id: true,
          idProduct: true,
          idUserOwner: true,
          cpfForUseUnique: true,
          expirationCoupon: true,
          limitUseMax: true,
          limitCouponUsed: true,
          isMultipleProducts: true,
          products: true,
          status: true,
          product: { select: { id: true, name: true } },
        },
      });

      if (!couponExist) {
        results.push({
          codeCoupon: coupon.codeCoupon,
          message: "Cupom não encontrado.",
          status: 404,
        });
        continue;
      }

      if (
        coupon.idProduct &&
        couponExist.idProduct &&
        coupon.idProduct !== couponExist.idProduct
      ) {
        results.push({
          codeCoupon: coupon.codeCoupon,
          message: `Cupom exclusivo para o produto: ${couponExist.product?.name}.`,
          status: 401,
        });
        continue;
      }
      const productsConverted: IProductOriginal[] =
        typeof couponExist.products === "string" &&
        JSON.parse(couponExist.products);

      if (
        coupon.idProduct &&
        couponExist.isMultipleProducts &&
        Array.isArray(productsConverted) &&
        productsConverted.length > 0
      ) {
        const idProducts = productsConverted
          .map((item: { id: string | null }) => item.id)
          .filter((id: string) => id !== null); // Garantir que apenas strings sejam usadas

        if (idProducts.indexOf(coupon.idProduct) === -1) {
          results.push({
            codeCoupon: coupon.codeCoupon,
            message: `Cupom válido apenas para os produtos: ${productsConverted
              .map((item: IProductOriginal) => item.name)
              .join(", ")}.`,
            status: 401,
          });
          continue;
        }
      }
      
      const todayAt = todayWithTime();
     
      await prismaClient.couponUsage.create({
        data: {
          idUserOwner,
          idCouponUsed: couponExist.id,
          created_At: todayAt,
        },
      });
 
      results.push({
        codeCoupon: coupon.codeCoupon,
        message: "Uso do cupom cadastrado com sucesso.",
        status: 200,
      });
    }

    // Retorna todos os resultados processados
    return { data: results };
  }
}

export { RegisterUseCouponService };
