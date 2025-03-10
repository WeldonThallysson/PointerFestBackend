import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

interface ITypeCommercialGetAllService {
  name?: string | null;
  position?: string | null;
  page?: number | null;
  limit?: number | null;
}

class TypeCommercialGetAllService {
  async execute({ name, position, page, limit }: ITypeCommercialGetAllService) {
    try {
      const where: any = "";

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (position)
        where.description = { contains: position, mode: "insensitive" };

      const shouldPaginate = page !== undefined || limit !== undefined;
      const skip = shouldPaginate
        ? ((page ?? 1) - 1) * (limit ?? 10)
        : undefined;
      const take = shouldPaginate ? limit ?? 10 : undefined;

      const typeCommercials = await prismaClient.typesCommercials.findMany({
        where,
        skip,
        take,
        orderBy: { created_At: "desc" },
      });

      const totalTypeCommercials = await prismaClient.typesCommercials.count();
      const totalPages = shouldPaginate
        ? Math.ceil(totalTypeCommercials / (limit ?? 10))
        : 1;

      return {
        items: typeCommercials,
        totalItems: totalTypeCommercials,
        totalPages: totalPages,
        currentPage: shouldPaginate ? page ?? 1 : 1,
        status: 200,
      };
    } catch (err) {
      return {
        data: {
          message: `${MessagesError.GetAllMessageError} ${err}`,
          status: 500,
        }
      };
    }
  }
}

export { TypeCommercialGetAllService };
