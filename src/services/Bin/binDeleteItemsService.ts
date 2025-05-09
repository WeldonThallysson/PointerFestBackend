import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

interface IBinDeleteItemsService {
  id?: string | null;
  idUserOwner?: string | null;
}

class BinDeleteItemsService {
  async execute({ id }: IBinDeleteItemsService) {
    if (!id) {
      return {
        data: {
          message: "Informe o ID do item na lixeira",
          status: 400,
        }
      };
    }

    const itemBinExists = await prismaClient.bin.findUnique({
      where: {
        id: id, 
      },
    });

    if (!itemBinExists) {
      return {
        message:
          "Não foi possível prosseguir com a ação, item não encontrado na lixeira",
        status: 404,
      };
    }

    try {
      await prismaClient.bin.delete({
        where: { id },
      });

      return {
        message: "Item deletado permanentemente com sucesso",
        status: 200,
      };
    } catch (err) {
      return {
        message: `${MessagesError.DeleteMessageError} ${err}`,
        status: 500,
      };
    }
  }
}

export { BinDeleteItemsService };
