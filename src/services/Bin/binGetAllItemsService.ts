import { MessagesError } from "../../constants/messages.api";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";

interface IBinGetAllItemsService {
  tableName?: string;
  idUserOwner?: string;
  page?: number;
  limit?: number;
}

class BinGetAllItemsService {
  async execute({
    tableName,
    idUserOwner,
    page,
    limit,
  }: IBinGetAllItemsService) {
    const where: any = null;

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    if (!userExists) {
      return {
        data: {
          message: "Não foi possível realizar essa ação, o usuário não existe",
          status: 403,
        },
      };
    }

    if (
        idUserOwner !== userExists.id &&
      (userExists.typeAccess === TypesAccess.User ||
        userExists.typeAccess === TypesAccess.Promoter ||
        userExists.typeAccess === TypesAccess.Worker)
    ) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, sua conta não tem permissão para realizar essa ação",
          status: 403,
        },
      };
    }

    if (tableName) where.tableName = { contains: tableName, mode: "insensitive" };
    if (idUserOwner) where.idUserOwner = { contains: idUserOwner, mode: "insensitive" };

    const shouldPaginate = page !== undefined || limit !== undefined;
    const skip = shouldPaginate ? (page ?? 1) - 1 + (limit ?? 10) : undefined;
    const take = shouldPaginate ? limit ?? 10 : undefined;

    try {
      const binItems = await prismaClient.bin.findMany({
        where,
        skip,
        take,
        orderBy: { created_At: "desc" },
        select: {
          id: true,
          tableName: true,
          data: true,
          created_At: true,
          updated_At: true,
          itemId: true,
        },
      });

      const binItemsCount = await prismaClient.bin.count();
      const totalPages = shouldPaginate
        ? Math.ceil(binItemsCount / (limit ?? 10))
        : 1;

      return {
        data: {
          items: binItems,
          totalItems: binItemsCount,
          totalPages: totalPages,
          currentPage: shouldPaginate ? page ?? 1 : 1,
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `${MessagesError.GetAllMessageError} ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { BinGetAllItemsService };
