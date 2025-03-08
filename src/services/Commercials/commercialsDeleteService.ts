import prismaClient from "../../prisma";

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
   
      await prismaClient.commercials.delete({
        where: {
            id: id,
        },
      });

      return {
        data: {
          message: "Comercial deletado com sucesso",
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `Ocorreu um error durante a exclusão do comercial ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { CommercialsDeleteService };
