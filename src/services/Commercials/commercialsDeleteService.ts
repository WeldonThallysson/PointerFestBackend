import { Messages, MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";
import { BinRegisterMoveItemsService } from "../Bin/binRegisterMoveItemsService";

interface ICommercialsDeleteService {
  id: string;
  idUserOwner: string;
}

class CommercialsDeleteService {
  async execute({
    id,
    idUserOwner,
  }: ICommercialsDeleteService) {
    if(!id){
        return {
            data: {
                message: "Não foi possível prosseguir com esta ação, por favor envio o id do comercial para prosseguir",
                status: 403,
            },
        }
    }

    if(!idUserOwner){
        return {
            data: {
                message: "Não foi possível prosseguir com esta ação, por favor envie o id do responsável",
                status: 403,
            },
        }
    }
  
    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });


    const commercialsExists = await prismaClient.commercials.findFirst({
      where: {
        id: id,
        idUserOwner: idUserOwner,
      }
    });

    if (!commercialsExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, este comercial não existe",
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

      const binRegisterItemsService = new BinRegisterMoveItemsService() 

      const responseDelete = await binRegisterItemsService.execute({
          id: id,
          tableName: "commercials",
          idUserOwner: commercialsExists.idUserOwner
      })  

      return {
          data: {
              message: responseDelete.data.message,
              status: responseDelete.data.status
          }
      }   
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

export { CommercialsDeleteService };
