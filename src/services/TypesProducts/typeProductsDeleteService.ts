import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { BinRegisterMoveItemsService } from "../Bin/binRegisterMoveItemsService";

interface ITypeProductsDeleteService {
  id: string;
  idUserOwner: string;
}

class TypeProductsDeleteService {
  async execute({ id, idUserOwner }: ITypeProductsDeleteService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com esta ação, por favor envio o id do tipo do produto para prosseguir",
          status: 403,
        },
      };
    }

    if (!idUserOwner) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com esta ação, por favor envie o id do responsável",
          status: 403,
        },
      };
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const typeProductExists = await prismaClient.typesProducts.findFirst({
      where: {
        id: id,
      },
    });

    if (!typeProductExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com esta ação, este tipo do produto não existe",
          status: 403,
        },
      };
    }

    if (!userExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com esta ação, está usuário responsável não existe",
          status: 403,
        },
      };
    }

    try {
      const binRegisterItemsService = new BinRegisterMoveItemsService();

      const responseDelete = await binRegisterItemsService.execute({
        id: id,
        tableName: "typesProducts",
        idUserOwner: typeProductExists.idUserOwner,
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
          status: 500,
        },
      };
    }
  }
}

export { TypeProductsDeleteService };
