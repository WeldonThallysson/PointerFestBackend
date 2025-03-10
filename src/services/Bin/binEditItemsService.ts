import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

interface IBinEditItemsService {
  id: string;
  tableName: string;
  idUserOwner: string;
  data: JSON | null;
}

class BinEditItemsService {
  async execute({ id, idUserOwner, tableName, data }: IBinEditItemsService) {
    if (!idUserOwner) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com está ação, Informe o ID do responsável",
          status: 400,
        },
      };
    }

    if (!id || !tableName) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com está ação, Informe o ID e o nome da tabela",
          status: 400,
        },
      };
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const itemBinExists = await prismaClient.$queryRawUnsafe(
      `SELECT * FROM ${tableName} WHERE id = '${id}'`
    );

    if (!userExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com está ação, usuário não existe",
          status: 400,
        },
      };
    }

    if (!itemBinExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com está ação, item não existe na lixeira",
          status: 400,
        },
      };
    }

    try {
      await prismaClient.bin.update({
        where: {
          id: id,
        },
        data: {
          tableName,
          itemId: id,
          idUserOwner: idUserOwner,
          data: JSON.stringify(data),
        },
      });

      return {
        data: {
          message: Messages.UpdateMessageSuccess,
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `${MessagesError.UpdateMessageError} ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { BinEditItemsService };
