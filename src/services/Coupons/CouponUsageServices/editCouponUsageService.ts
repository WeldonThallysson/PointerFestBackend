import { TypesAccess } from "../../../keys/typeAccess/typesAccess";
import prismaClient from "../../../prisma";
import { todayFormattedWithTimeToIso } from "../../../utils/formatters/formatterToday";

interface ICouponsUsedEdit {
  idUserOwner: string;
  idCouponUsed: string;
  statusComissionPaid?: boolean | null;
}

interface IEditCouponUsageService {
  idUserOwner: string;
  couponsUsed: ICouponsUsedEdit[] | null;
}

class EditCouponUsageService {
  async execute({ idUserOwner, couponsUsed }: IEditCouponUsageService) {
    if (!Array.isArray(couponsUsed) || couponsUsed.length === 0 || !couponsUsed) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, por favor selecione um uso de cupom para registrar o pagamento da comissão!",
          fields: ["idUserOwner", "idCouponUsed", "statusComissionPaid"],
          status: 400,
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

    // Verificação dos cupons antes de prosseguir
    const couponUsages = await prismaClient.couponUsage.findMany({
      where: {
        idCouponUsed: {
          in: couponsUsed.map((item) => item.idCouponUsed),
        },
        idUserOwner: {
          in: couponsUsed.map((item) => item.idUserOwner),
        },
      },
      select: {
        idCouponUsed: true,
        statusComissionPaid: true,
      },
    });

    // Verifica se algum dos cupons selecionados já está todo pago
    const totalPaidCoupons = couponUsages.every(
      (coupon) => coupon.statusComissionPaid === true
    );

    if (totalPaidCoupons) {
      return {
        data: {
          message: "Alguns usos de cupons selecionados já foram pagos. Para registrar o pagamento da comissão, selecione somente usos de cupons não pagos.",
          status: 400,
        },
      };
    }

    try {
      const results = await Promise.all(
        couponsUsed.map(async (item) => {
          const { idCouponUsed, idUserOwner, statusComissionPaid } = item;

          if (!idCouponUsed) {
            return {
              data: {
                message: "Por favor informe o ID do cupom utilizado.",
                status: 400,
              },
            };
          }

          if (!idUserOwner) {
            return {
              data: {
                message:
                  "Por favor informe o ID do responsável pelo uso do cupom utilizado.",
                status: 400,
              },
            };
          }

          // Buscar todos os registros correspondentes
          const couponUsages = await prismaClient.couponUsage.findMany({
            where: { idCouponUsed: idCouponUsed, idUserOwner: idUserOwner },
            select: {
              id: true,
              coupon: {
                select: {
                  commissionPromoter: true,
                },
              },
              dateLastPaymentComissionCoupon: true,
              statusComissionPaid: true,
            },
          });

          if (couponUsages.length === 0) {
            return {
              data: {
                message: "Nenhum uso de cupom correspondente foi encontrado.",
                status: 404,
              },
            };
          }

          const todayDate = new Date();

          // Atualizar todos os registros encontrados
          const updatedCoupons = await Promise.all(
            couponUsages.map((couponUsage) =>
              prismaClient.couponUsage.update({
                where: { id: couponUsage.id },
                data: {
                  dateLastPaymentComissionCoupon:
                    couponUsage.dateLastPaymentComissionCoupon
                      ? couponUsage.dateLastPaymentComissionCoupon
                      : todayFormattedWithTimeToIso(todayDate),
                  statusComissionPaid: statusComissionPaid,
                },
              })
            )
          );

          return { data: updatedCoupons, status: 200 };
        })
      );

      return {
        data: {
          message: "Pagamento de comissão do cupom utilizado registrado com sucesso",
          item: results,
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


export {EditCouponUsageService}