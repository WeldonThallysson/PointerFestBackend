import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";

interface IDeleteCouponService {
  idUserOwner: string;
  idCoupon: string;
}

class DeleteCouponService {
  async execute({ idUserOwner, idCoupon }: IDeleteCouponService) {
    if (!idUserOwner) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, envie o ID do responsável",
          status: 404,
        },
      };
    }

    if (!idCoupon) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, envie o ID do cupom",
          status: 404,
        },
      };
    }

    const couponExist = await prismaClient.coupon.findFirst({
      where: { id: idCoupon },
    });

    const userExistsLogged = await prismaClient.users.findFirst({
      where: { id: idUserOwner },
    });

    if (
      userExistsLogged.typeAccess !== TypesAccess.Owner &&
      userExistsLogged.typeAccess !== TypesAccess.Developer &&
      userExistsLogged?.typeAccess !== TypesAccess.Master ) {
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

    if (!couponExist) {
      return {
        data: {
          message: "Esse cupom não existe, tente novamente",
          status: 401,
        },
      };
    }

    try {
      // Excluir todos os registros de quem usou o cupom
      await prismaClient.couponUsage.deleteMany({
        where: { idCouponUsed: idCoupon },
      });

      // Excluir o próprio cupom
      await prismaClient.coupon.delete({
        where: { id: idCoupon },
      });

      return {
        data: {
          message: "Cupom deletado com sucesso!",
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

export { DeleteCouponService };
