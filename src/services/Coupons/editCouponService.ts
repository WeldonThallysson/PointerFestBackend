import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";
import { todayFormatted } from "../../utils/formatters/formatterToday";
import { validationsCouponsService } from "../../utils/validationsServices/validationsCouponsService";

interface IProductsVinculed {
  id: string | null;
  priceDiscount: number | null;
  isPercentage: boolean | null;
}
interface IEditCouponService {
  idUserOwner: string;
  idCoupon: string;
  expirationCoupon?: string | null;
  limitUseMax?: number | null;
  codeCoupon: string;
  priceDiscount: number;
  commissionPromoter?: number | null;
  isPercentage?: boolean | null;
  cpfForUseUnique?: string | null;
  idPromoter?: string | null;
  idProduct?: string | null;
  available?: boolean | null;
  isMultipleProducts?: boolean | null;
  products?: IProductsVinculed[] | null;
  status?: boolean | null;
}

class EditCouponService {
  async execute({
    idCoupon,
    idUserOwner,
    expirationCoupon,
    limitUseMax,
    codeCoupon,
    priceDiscount,
    commissionPromoter,
    isPercentage,
    cpfForUseUnique,
    idPromoter,
    idProduct,
    available,
    isMultipleProducts,
    products,
    status,
  }: IEditCouponService) {
    if (!idUserOwner) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, envie o id do responsável",
          status: 404,
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
    
    if(!isMultipleProducts && !codeCoupon){
      return {
        data:{
          message: "Por favor, informe o código do cupom para prosseguir.", 
          status: 400
        }
      }
    }

     
    if(!isMultipleProducts && !priceDiscount){
      return {
        data:{
          message: "Por favor, informe o preço do desconto para prosseguir.", 
          status: 400
        }
      }
    }
    let productVerify;

    const couponExist = await prismaClient.coupon.findFirst({
      where: {
        id: idCoupon,
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
            "Para editar a comissão do promotor deve informar qual o promotor.",
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

      const duplicateIds = idProducts.filter((id, index) => idProducts.indexOf(id) !== index);
      const validationPercentage = products.filter((item) => item.isPercentage && item.priceDiscount > 100)
      const validationPriceDiscount = products.filter((item) => !item.priceDiscount)
      const validationExistsId = products.filter((item) => !item.id)


      if (validationExistsId.length > 0) {
        return {
          data: {
            message: "Não foi possível concluir a ação. Alguns produtos adicionados para vinculo estão vazios ou inválidos. Verifique e selecione os produtos corretamente para vincular ao cupom",
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
            message: "Os valores de desconto informados para os produtos selecionados são inválidos. O sistema aceita apenas descontos no intervalo de 1% a 100%. Verifique e tente novamente.",
            status: 400,
          },
        };
      }

      if (validationPriceDiscount.length > 0) {
        return {
          data: {
            message: "Não foi possível prosseguir com a ação, para prosseguir precisa informar o preço de desconto de todos os produtos adicionados para vinculo com o cupom",
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

    if (!userExistsLogged) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, usuário responsável não encontrado.",
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

    if (isPercentage && priceDiscount > 100) {
      return {
        data: {
          message:
            "Desconto por percentual inválido: o sistema permite valores de desconto entre (1% e 100%).",
          status: 401,
        },
      };
    }

    if (limitUseMax !== null && limitUseMax < couponExist.limitCouponUsed) {
      return {
        data: {
          message:
            "Limite máximo de uso para o cupom inválido: não pode ser menor que o limite já utilizado pelos usuários.",
          status: 401,
        },
      };
    }

    if (expirationCoupon) {
      // Formata a data de expiração para o formato YYYY-MM-DD
      const expirationFormatted = expirationCoupon;

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
      await prismaClient.coupon.update({
        where: {
          id: idCoupon,
        },
        data: {
          idPromoter: idPromoter ?? null,
          idProduct: !isMultipleProducts ? idProduct : null,
          priceDiscount: !isMultipleProducts ? priceDiscount : null,
          isPercentage: !isMultipleProducts ? isPercentage : null,
          isMultipleProducts: isMultipleProducts ?? false,
          products: productVerify
            ? JSON.stringify(productVerify)
            : null,
          expirationCoupon: expirationCoupon ? expirationCoupon : null,
          limitUseMax: limitUseMax,
          commissionPromoter: commissionPromoter ?? null,
          cpfForUseUnique: cpfForUseUnique ?? null,
          limitCouponUsed:
            limitUseMax !== null ? couponExist.limitCouponUsed : null, // Define como null quando limitUseMax é null
          /** limitUseMax !== null
              ? limitUseMax >= couponExist.limitCouponUsed
                ? limitUseMax - couponExist.limitCouponUsed
                : couponExist.limitCouponUsed
              : null, // Define como null quando limitUseMax é null */
          codeCoupon: codeCoupon ?? couponExist.codeCoupon,
          status: status,
        },
      });

      return {
        data: {
          message: "Cupom atualizado com sucesso!",
          status: 200,
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

export { EditCouponService };
