import { IProductOriginal } from "../../interface/interface.checkoutPaymentMethod";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import { formatterCurrency } from "../../utils/formatters/formatterPrice";
import { todayFormatted } from "../../utils/formatters/formatterToday";

interface IGetActiveCouponService {
  idUserOwner: string;
  codeCoupon?: string | null;
  idProduct?: string | null;
}

interface IProductsVinculed {
  id: string | null;
  priceDiscount: number | null;
  isPercentage: boolean | null;
}
class GetActiveCouponService {
  async execute({
    idUserOwner,
    codeCoupon,
    idProduct,
  }: IGetActiveCouponService) {
    if (!codeCoupon) {
      return {
        data: {
          message: "Informe o código do cupom de desconto para prosseguir",
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

    const couponExist = await prismaClient.coupon.findFirst({
      where: {
        codeCoupon,
      },
      select: {
        id: true,
        idProduct: true,
        idPromoter: true,
        idUserOwner: true,
        codeCoupon: true,
        commissionPromoter: true,
        cpfForUseUnique: true,
        priceDiscount: true,
        expirationCoupon: true,
        isPercentage: true,
        isMultipleProducts: true,
        couponUsage: true,
        products: true,
        product: {
          select: {
            id: true,
            description: true,
            name: true,
            price: true,
            dateRegistered: true,
          },
        },
        status: true,
        limitUseMax: true,
        limitCouponUsed: true,
      },
    });

    const productExists = await prismaClient.products.findFirst({
      where: {
        id: idProduct,
      },
    });

    if (!couponExist) {
      return {
        data: {
          message:
            "Não foi possível ativar o cupom, cupom não existe, tente novamente com outro cupom",
          status: 401,
        },
      };
    }

    if (idProduct && !productExists) {
      return {
        data: {
          message: "Esse produto não existe, cupom não pode ser ativado!",
          status: 404,
        },
      };
    }

    if (couponExist.idProduct && idProduct !== couponExist.idProduct) {
      return {
        data: {
          message: `Esse cupom só pode ser utilizado para ${couponExist.product.name}`,
          status: 404,
        },
      };
    }
    const productsConverted: IProductOriginal[] =
      typeof couponExist.products === "string" &&
      JSON.parse(couponExist.products);

    if (
      idProduct &&
      couponExist?.isMultipleProducts &&
      couponExist.products &&
      Array.isArray(productsConverted) &&
      productsConverted.length > 0
    ) {
      const idProducts = productsConverted
        .map((item: { id: string }) => item.id)
        .filter((id: string | null) => id !== null);

      if (idProducts.indexOf(idProduct) === -1) {
        return {
          data: {
            message: `Esse cupom só pode ser utilizado para os produtos: ${productsConverted
              .map((item: { name: string }) => item.name)
              .join(", ")}`,
            status: 404,
          },
        };
      }
    }

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    if (!userExistsLogged) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, usuário responsável não encontrado.",
          status: 404,
        },
      };
    }

    if (couponExist.cpfForUseUnique) {
      const userCPFForUseUnique = await prismaClient.users.findFirst({
        where: {
          cpfCnpj: couponExist.cpfForUseUnique,
        },
      });

      if (!userCPFForUseUnique) {
        return {
          data: {
            message:
              "O cupom possui um CPF exclusivo para uso único, mas o CPF informado não existe.",
            status: 404,
          },
        };
      }

      if (userExistsLogged.cpfCnpj !== couponExist.cpfForUseUnique) {
        return {
          data: {
            message: "Este cupom é exclusivo para uso único de outro usuário.",
            status: 401,
          },
        };
      }
    }

    const expirationDate = formatterDateToIso(couponExist.expirationCoupon);

    if (couponExist.expirationCoupon && expirationDate < todayFormatted) {
      return {
        data: {
          message: "Este cupom está expirado e não pode ser utilizado.",
          status: 401,
        },
      };
    }

    if (!couponExist.status) {
      return {
        data: {
          message: "Este cupom está inativo, tente outro cupom.",
          status: 401,
        },
      };
    }

    if (
      couponExist.limitUseMax !== null &&
      couponExist.limitCouponUsed === couponExist.limitUseMax
    ) {
      return {
        data: {
          message: "Este cupom atingiu o limite de uso, tente outro cupom.",
          status: 401,
        },
      };
    }

    if (
      couponExist.limitUseMax !== null &&
      couponExist.limitCouponUsed <= couponExist.limitUseMax
    ) {
      await prismaClient.coupon.update({
        where: {
          id: couponExist.id,
        },
        data: {
          limitCouponUsed: couponExist.limitCouponUsed + 1,
        },
      });
    }

    try {
      const coupons = await prismaClient.coupon.findFirst({
        where: {
          id: couponExist.id,
        },
        select: {
          id: true,
          idUserOwner: true,
          idProduct: true,
          idPromoter: true,
          isPercentage: true,
          isMultipleProducts: true,
          products: true,
          priceDiscount: true,
          commissionPromoter: true,
          cpfForUseUnique: true,
          codeCoupon: true,
          expirationCoupon: true,
          limitUseMax: true,
          limitCouponUsed: true,
          status: true,
          created_At: true,
        },
      });
      
      let message = `Cupom ${coupons.codeCoupon} ativado com sucesso`;

      const productsParsed: IProductOriginal[] = coupons.products && typeof coupons.products === "string" && JSON.parse(coupons.products);
      const productFiltred = coupons?.isMultipleProducts && productsParsed.find((product) => product.id === idProduct );
     
      if (coupons?.isMultipleProducts && coupons.products) {
        const discountFiltered = productFiltred?.isPercentage
        ? `${productFiltred?.priceDiscount}%`
        : `${formatterCurrency(productFiltred?.priceDiscount)}`;

        message = `Cupom ${coupons.codeCoupon} com ${discountFiltered} de desconto ativado com sucesso`;
        
      } else {
        const discount = coupons?.isPercentage
          ? `${coupons?.priceDiscount}%`
          : `${formatterCurrency(coupons?.priceDiscount)}`;
        message = `Cupom ${coupons?.codeCoupon} com ${discount} de desconto ativado com sucesso`;
      }

      return {
        data: {
          items: {
            ...coupons,
            ...(coupons?.isMultipleProducts && {
              productForDiscount: productFiltred
            }),
            products: coupons.products ? JSON.parse(coupons.products as string) : coupons.products,
          },
          message,
          status: 200,
        },
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

export { GetActiveCouponService };
