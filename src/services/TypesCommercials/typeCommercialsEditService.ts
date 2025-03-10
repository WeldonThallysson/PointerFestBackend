import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { validationsTypeCommercialsService } from "../../utils/validationsServices/validationsTypeCommercials";

interface ITypeCommercialsEditService {
  id: string;
  idUserOwner: string | null;
  name?: string | null;
  position?: string | null;
  status?: boolean | null
}

class TypeCommercialsEditService {
  async execute({
    id,
    idUserOwner,
    name,
    position,
    status
  }: ITypeCommercialsEditService) {

    if(!id){
        return {
            data: {
                message: "Não foi possível prosseguir com esta ação, por favor envio o id do tipo do comercial para prosseguir",
                status: 403,
            },
        }
    }
    
    const validationsTypeCommercials = validationsTypeCommercialsService({
      idUserOwner,
      name,
      position
    });

    if (validationsTypeCommercials) {
      return validationsTypeCommercials;
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const typeCommercialExists = await prismaClient.typesCommercials.findFirst({
        where: {
          id: id,
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
          message: "Não foi possível prosseguir com esta ação, usuário responsável não existe",
          status: 403,
        },
      };
    }

    try {

      await prismaClient.typesCommercials.update({
        where: {
            id: id,
        },

        data: {
          idUserOwner: idUserOwner,
          name: name,
          position: position ? position : null,
          status: status ? status : null
       
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

export { TypeCommercialsEditService };
