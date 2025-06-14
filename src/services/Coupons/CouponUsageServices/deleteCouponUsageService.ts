import { TypesAccess } from "../../../keys/typeAccess/typesAccess";
import prismaClient from "../../../prisma";

interface ICouponsUsedDelete {
  idUserOwner: string;
  idCouponUsed: string;
}

interface IDeleteCouponUsageService {
  idUserOwner: string
  couponsUsed: ICouponsUsedDelete[] | null;
}

class DeleteCouponUsageService {
  async execute({ idUserOwner, couponsUsed }: IDeleteCouponUsageService) {
    // Verificar se os dados foram enviados corretamente
    if (!Array.isArray(couponsUsed) || couponsUsed.length === 0 || !couponsUsed) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, por favor envie os dados do cupom utilizado para a exclusão!",
          fields: ["idUserOwner", "idCouponUsed"],
          status: 400,
        },
      };
    }
    if (!idUserOwner) {
      return {
        data: {
          message: "Não foi possível prosseguir com a ação, envie o id do responsável",
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

    if((userExistsLogged.typeAccess === TypesAccess.User || userExistsLogged.typeAccess === TypesAccess.Promoter || userExistsLogged.typeAccess === TypesAccess.Worker)){
      return {
        data: {
          message: "Você não tem permissão para realizar está ação",
          status: 403
        }
      }
    }

    try {
      // Mapear os itens e realizar as exclusões
      const results = await Promise.all(
        couponsUsed.map(async (item) => {
          const { idCouponUsed, idUserOwner } = item;

          // Validações de campos obrigatórios
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
                message: "Por favor informe o ID do responsável pelo uso do cupom utilizado.",
                status: 400,
              },
            };
          }

          // Verificar se o cupom existe
          const couponsUsageExists = await prismaClient.couponUsage.findMany({
            where: {
              idCouponUsed: idCouponUsed,
              idUserOwner: idUserOwner,
            },
          });
      
          // Verificar se há registros encontrados
          if (couponsUsageExists.length === 0) {
            return {
              data: {
                message: "Nenhum uso do cupom especificado foi encontrado.",
                status: 404,
              },
            };
          }
      
          // Deletar todos os registros encontrados
          await prismaClient.couponUsage.deleteMany({
            where: {
              idCouponUsed: idCouponUsed,
              idUserOwner: idUserOwner,
            },
          });
      

          return {
            data: {
              message: `O cupom utilizado com ID ${idCouponUsed} foi deletado com sucesso.`,
              status: 200,
            },
          };
        })
      );

      return {
        data: {
          message: "Os cupons utilizados foram deletados com sucesso.",
          items: results,
          status: 200,
        },
        status: 200,
      };
    } catch (err) {
      console.error(err);
        return {
        data: {
          message: "Erro ao deletar cupons utilizados.",
          error: err.message,
          status: 500,
        },
      };
    }
  }
}

export { DeleteCouponUsageService };
