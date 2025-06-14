import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import {
  todayFormatted,
  todayWithTime,
} from "../../utils/formatters/formatterToday";

interface IProductsVinculed {
  id: string | null;
  priceDiscount: number | null;
  isPercentage: boolean | null;
}

interface IRegisterCouponService {
  idUserOwner: string;
  codeCoupon: string;
  priceDiscount: number;
  commissionPromoter?: number | null;
  isPercentage?: boolean | null;
  cpfForUseUnique?: string | null;
  idPromoter?: string | null;
  idProduct?: string | null;
  limitUseMax?: number | null;
  expirationCoupon?: string | null;
  isMultipleProducts?: boolean | null;
  products?: IProductsVinculed[] | null;
}

class RegisterCouponService {
  async execute({
    idUserOwner,
    idPromoter,
    idProduct,
    codeCoupon,
    priceDiscount,
    commissionPromoter,
    isPercentage,
    cpfForUseUnique,
    limitUseMax,
    expirationCoupon,
    isMultipleProducts,
    products,
  }: IRegisterCouponService) {
    if (!idUserOwner) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, envie o id do responsável",
          status: 404,
        },
      };
    }

    if (!isMultipleProducts && !codeCoupon) {
      return {
        data: {
          message: "Por favor, informe o código do cupom para prosseguir.",
          status: 400,
        },
      };
    }

    if (!isMultipleProducts && !priceDiscount) {
      return {
        data: {
          message: "Por favor, informe o preço do desconto para prosseguir.",
          status: 400,
        },
      };
    }

    let productVerify;

    const couponExist = await prismaClient.coupon.findFirst({
      where: {
        codeCoupon: codeCoupon,
      },
    });

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const promoterExists = await prismaClient.users.findFirst({
      where: {
        id: idPromoter,
      },
    });

    const productExists = await prismaClient.products.findFirst({
      where: {
        id: idProduct,
      },
    });

    if (commissionPromoter && !idPromoter) {
      return {
        data: {
          message:
            "Para cadastrar a comissão do promotor deve informar qual o promotor.",
          status: 401,
        },
      };
    }

    if (idPromoter && !promoterExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, esse promotor não existe ou não cadastrado.",
          status: 404,
        },
      };
    }

    if (idProduct && !productExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, esse produto não existe ou não cadastrado.",
          status: 404,
        },
      };
    }

    if (
      isMultipleProducts &&
      (!Array.isArray(products) || products?.length <= 1)
    ) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, para vincular o cupom a múltiplos produtos, selecione mais de 1 produto.",
          status: 401,
        },
      };
    }
    if (!isMultipleProducts && products?.length > 0) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, Para vincular o cupom a vários produtos, selecione a opção destinada a múltiplos produtos.",
          status: 401,
        },
      };
    }

    if (Array.isArray(products) && products?.length > 0) {
      const idProducts = products
        .filter((item) => item && item.id !== undefined)
        .map((item) => item.id)
        .filter((id) => id !== null);

      if (idProducts?.length === 0) {
        return {
          data: {
            message: "Nenhum ID de produto válido foi encontrado.",
            status: 400,
          },
        };
      }

      const duplicateIds = idProducts.filter(
        (id, index) => idProducts.indexOf(id) !== index
      );
      const validationPercentage = products.filter(
        (item) => item.isPercentage && item.priceDiscount > 100
      );
      const validationPriceDiscount = products.filter(
        (item) => !item.priceDiscount
      );
      const validationExistsId = products.filter((item) => item.id === null);

      if (validationExistsId.length > 0) {
        return {
          data: {
            message:
              "Para prosseguir com a ação, é necessário selecionar um produto para vincular ao cupom",
            status: 400,
          },
        };
      }

      if (duplicateIds?.length > 0) {
        return {
          data: {
            message: `Não foi possível prosseguir com a ação, os produtos que enviou estão repetidos, selecione produtos diferentes para vincular ao cupom`,
            status: 400,
          },
        };
      }

      if (validationPercentage.length > 0) {
        return {
          data: {
            message:
              "Os valores de desconto informados para os produtos selecionados são inválidos. O sistema aceita apenas descontos no intervalo de 1% a 100%. Verifique e tente novamente.",
            status: 400,
          },
        };
      }

      if (validationPriceDiscount.length > 0) {
        return {
          data: {
            message:
              "Não foi possível prosseguir com a ação, para prosseguir precisa informar o preço de desconto de todos os produtos adicionados para vinculo com o cupom",
            status: 400,
          },
        };
      }

      const existingProducts = await prismaClient.products.findMany({
        where: {
          id: {
            in: idProducts,
          },
        },
      });

      const invalidProduct = idProducts.filter(
        (id) => !existingProducts.some((item) => item.id === id)
      );

      if (invalidProduct?.length > 0) {
        return {
          data: {
            message: `Verifique os produtos informados, algum dos produtos não foi informado ou não existe`,
            status: 404,
          },
        };
      }

      productVerify = existingProducts.map((product) => {
        const additionalData = products.find((p) => p.id === product.id);
        return {
          ...product,
          isPercentage: additionalData?.isPercentage || false,
          priceDiscount: additionalData?.priceDiscount || 0,
        };
      });
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

    if (
      userExistsLogged.typeAccess === TypesAccess.User ||
      userExistsLogged.typeAccess === TypesAccess.Worker ||
      userExistsLogged.typeAccess === TypesAccess.Promoter
    ) {
      return {
        data: {
          message:
            "Sua conta não possui permissão para realizar esta ação, apenas para conta (master ou admim)",
          status: 403,
        },
      };
    }

    if (couponExist) {
      return {
        data: {
          message:
            "Esse código de cupom já foi cadastrado, tente outro código.",
          status: 401,
        },
      };
    }

    if (isPercentage && priceDiscount > 100) {
      return {
        data: {
          message:
            "Desconto por percentual inválido: o sistema permite valores de desconto entre (1% e 100%).",
          status: 401,
        },
      };
    }

    // Validação de data de expiração
    if (expirationCoupon) {
      const expirationDate = expirationCoupon;
      // Formata a data de expiração para o formato YYYY-MM-DD
      const expirationFormatted = formatterDateToIso(expirationDate);
      if (expirationFormatted < todayFormatted) {
        return {
          data: {
            message:
              "A data de expiração deve ser maior ou igual à data atual.",
            status: 400,
          },
        };
      }
    }

    try {
      const todayAt = todayWithTime();
      await prismaClient.coupon.create({
        data: {
          idUserOwner: idUserOwner,
          idPromoter: idPromoter ?? null,
          idProduct: !isMultipleProducts ? idProduct : null,
          priceDiscount: !isMultipleProducts ? priceDiscount : null,
          isPercentage: !isMultipleProducts ? isPercentage : null,
          codeCoupon,
          isMultipleProducts: isMultipleProducts ?? false,
          products: productVerify ? JSON.stringify(productVerify) : null,
          commissionPromoter: commissionPromoter,
          cpfForUseUnique: cpfForUseUnique,
          limitUseMax: limitUseMax ?? null,
          limitCouponUsed: limitUseMax ? 0 : null,
          expirationCoupon: expirationCoupon ?? null,
          status:
            userExistsLogged.typeAccess === TypesAccess.Admin ? false : true,
          created_At: todayAt,
        },
      });

      return {
        data: {
          message: "Cupom cadastrado com sucesso!",
          status: 201,
        },
      };
    } catch (err) {
      return {
        data: {
          message: err.message || "Erro interno no servidor.",
          status: 500,
        },
      };
    }
  }
}

export { RegisterCouponService };
