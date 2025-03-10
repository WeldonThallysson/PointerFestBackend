import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

import { validationsTypeCommercialsService } from "../../utils/validationsServices/validationsTypeCommercials";

interface ITypeCommercialsRegisterService {
  idUserOwner: string;
  idTypeCommercial: string;
  name: string;
  description: string;
  position: string;
}

class TypeCommercialsRegisterService {
  async execute({
    idUserOwner,
    name,
    position,
  }: ITypeCommercialsRegisterService) {
    
    const validationsCommercials = validationsTypeCommercialsService({
      idUserOwner,
      name,
      position

    });

    if (validationsCommercials) {
      return validationsCommercials;
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const typeCommercialExists = await prismaClient.typesCommercials.findFirst({
        where: {
          name: name,
        },
    });

    if (!typeCommercialExists) {
        return {
          data: {
            message: "Não foi possível prosseguir com esta ação, este tipo do comercial não existe",
            status: 403,
          },
        };
    }

    if (!userExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, está usuário responsável não existe",
          status: 403,
        },
      };
    }

    try {
      await prismaClient.typesCommercials.create({
        data: {
          idUserOwner: idUserOwner,
          name: name,
          position: position ? position : null,
        },
      });

      return {
        data: {
          message: Messages.RegisterMessageSuccess,
          status: 200,
        },
      };
    }
    
    catch (err) {
      return {
        data: {
          message: `${MessagesError.RegisterMessageError} ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { TypeCommercialsRegisterService };
