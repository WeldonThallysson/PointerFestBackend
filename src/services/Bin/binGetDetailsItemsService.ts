import prismaClient from "../../prisma";

interface IBinGetDetailsItemsService {
  id: string;
  idUserOwner?: string | null;
}

class BinGetDetailsItemsService {
  async execute({ id, idUserOwner }: IBinGetDetailsItemsService) {
    const where: any = null;

    if (id) where.id = { contains: id, mode: "insensitive" };
    if (idUserOwner) where.idUserOwner = { contains: idUserOwner, mode: "insensitive" };

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });
    
    const binExists = await prismaClient.bin.findFirst({
      where,
    });

    if (!userExists) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, esse usuário responsável pelo item não existe!",
          status: 404,
        },
      };
    }

    if (!binExists) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, o item não existe na lixeira!",
          status: 404,
        },
      };
    }

    try {
      return {
        data: {
          items: binExists,
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `Erro na busca pelos detalhes do item na lixeira ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { BinGetDetailsItemsService };
