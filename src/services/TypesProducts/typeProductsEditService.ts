import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { validationsTypeCommercialsService } from "../../utils/validationsServices/validationsTypeCommercials";
import { validationsTypeProductsService } from "../../utils/validationsServices/validationsTypeProducts";

interface ITypeProductsEditService {
  id: string;
  idUserOwner: string | null;
  name?: string | null;
  position?: string | null;
  status?: boolean | null;
}

class TypeProductsEditService {
  async execute({
    id,
    idUserOwner,
    name,
    position,
    status,
  }: ITypeProductsEditService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com esta ação, por favor envio o id do tipo do produto para prosseguir",
          status: 403,
        },
      };
    }

    const validationsTypeProducts = validationsTypeProductsService({
      idUserOwner,
      name,
      position,
    });

    if (validationsTypeProducts) {
      return validationsTypeProducts;
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const typeProductsExists = await prismaClient.typesProducts.findFirst({
      where: {
        id: id,
      },
    });

    if (!typeProductsExists) {
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
            "Não foi possível prosseguir com esta ação, usuário responsável não existe",
          status: 403,
        },
      };
    }

    try {
      await prismaClient.typesProducts.update({
        where: {
          id: id,
        },

        data: {
          idUserOwner: idUserOwner,
          name: name,
          position: position ? position : null,
          status: status ? status : null,
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

export { TypeProductsEditService };
