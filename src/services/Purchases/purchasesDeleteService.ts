import { Messages, MessagesError } from "../../constants/messages.api";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";
import { BinRegisterMoveItemsService } from "../Bin/binRegisterMoveItemsService";

interface IPurchasesDeleteService {
  id: string;
  idUserLogged: string;
}

class PurchasesDeleteService {
  async execute({ id, idUserLogged }: IPurchasesDeleteService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível prosseguir, envie o id da compra para prosseguir",
          fields: ["/purchases/:id"],
          status: 400,
        },
      };
    }

    const userLoggedExists = await prismaClient.users.findFirst({
      where: {
        id: idUserLogged,
      },
    });

    const purchasesExists = await prismaClient.purchases.findFirst({
      where: {
        id: id,
        //idUser: idUserLogged
      },
    });

    if (!purchasesExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir, sua compra não foi encontrada!",
          status: 404,
        },
      };
    }

    if (!userLoggedExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir, o responsável não foi encontrado!",
          status: 404,
        },
      };
    }

    if (
      userLoggedExists?.typeAccess !== TypesAccess.Owner &&
      userLoggedExists?.typeAccess !== TypesAccess.Developer &&
      userLoggedExists?.typeAccess !== TypesAccess.Master
    ) {
      return {
        data: {
          message: "Não foi possível prosseguir, sua conta não possui permissão para esta ação apenas contas master!",
          status: 404,
        },
      };
    }

    try {
      const binRegisterItemsService = new BinRegisterMoveItemsService();
      const responseDelete = await binRegisterItemsService.execute({
        id: id,
        tableName: "purchases",
        idUserOwner: purchasesExists.idUser,
      });

      return {
        data: {
          message: responseDelete.data.message,
          status: responseDelete.data.status,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `${MessagesError.DeleteMessageError} ${err}`,
          error: err,
          status: 500,
        },
      };
    }
  }
}

export { PurchasesDeleteService };
