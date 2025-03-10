import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { validationsTypeCommercialsService } from "../../utils/validationsServices/validationsTypeCommercials";
import { validationsTypeProductsService } from "../../utils/validationsServices/validationsTypeProducts";

interface ITypeProductsRegisterService {
  idUserOwner: string;
  name: string;
  position: string;
}

class TypeProductsRegisterService {
  async execute({
    idUserOwner,
    name,
    position,
  }: ITypeProductsRegisterService) {
    
    const validationsCommercials = validationsTypeProductsService({
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

    const typeProductsExists = await prismaClient.typesProducts.findFirst({
        where: {
          name: name,
        },
    });

    if (typeProductsExists) {
        return {
          data: {
            message: "Não foi possível prosseguir com esta ação, este tipo de produto já existe",
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
      await prismaClient.typesProducts.create({
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

export { TypeProductsRegisterService };
