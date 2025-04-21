import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";
import { validatorPermissions } from "../../utils/validators/validatorPermissions";

interface IUsersDeleteService {
  id: string;
  id_user_logged: string;
}

class UsersDeleteService {
  async execute({ id, id_user_logged }: IUsersDeleteService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível realizar esta ação, por favor informe o (id) do usuário.",
          status: 400,
        },
      };
    }

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    const userExists = await prismaClient.users.findFirst({
      where: { id: id },
    });

    const responsePermission = validatorPermissions({
      typeAccess: userExistsLogged.typeAccess,
    });

    if (!responsePermission) {
      return {
        data: {
          message: "Sua conta não possui permissão para realizar esta ação.",
          status: 403,
        },
      };
    }

    if (!userExists) {
      return {
        data: {
          message: "Não foi possível deletar, o usuário não existe.",
          status: 404,
        },
      };
    }

    if (
      userExists.id === id_user_logged &&
      userExistsLogged.typeAccess === TypesAccess.Admin
    ) {
      return {
        data: {
          message:
            "Não é possível como administrador deletar a própria conta, está ação está disponível somente para contas master",
          status: 403,
        },
      };
    }
    
    await prismaClient.$transaction(async (tx) => {
      if (userExists.typeAccess === TypesAccess.Promoter) {
        await tx.coupon.updateMany({
          where: { idPromoter: id },
          data: { idPromoter: null, commissionPromoter: null },
        });
      }

      await tx.couponUsage.deleteMany({ where: { idUserOwner: id } });
      await tx.coupon.deleteMany({
        where: { idUserOwner: id },
      });

      await tx.couponUsage.deleteMany({ where: { idUserOwner: id } });

      await tx.events.deleteMany({ where: { idUserOwner: id } });
      await tx.methodsPayments.deleteMany({ where: { idUserOwner: id } });
      await tx.typesCommercials.deleteMany({ where: { idUserOwner: id } });
      await tx.typesProducts.deleteMany({ where: { idUserOwner: id } });

      await tx.users.delete({ where: { id: id } });

      await tx.categories.deleteMany({ where: { idUserOwner: id } });
      await tx.commercials.deleteMany({ where: { idUserOwner: id } });
      await tx.purchases.deleteMany({ where: { idUser: id } });
      await tx.bin.deleteMany({ where: { idUserOwner: id } });
    });

    return {
      data: {
        message: "Usuário deletado com sucesso!",
        status: 200,
      },
    };
  }
}

export { UsersDeleteService };
