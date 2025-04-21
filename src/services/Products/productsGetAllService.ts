import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

interface IProductsGetAllService {
  name?: string | null;
  idUserLogged?: string | null;
  idUserOwner?: string | null;
  idTypeProduct?: string | null;
  available?: string | null;
  status?: boolean | null;
  page?: number | null;
  limit?: number | null;
}

class ProductsGetAllService {
  async execute({
    available,
    idTypeProduct,
    idUserLogged,
    idUserOwner,
    name,
    status,
    page,
    limit,
  }: IProductsGetAllService) {
    const userIDSend = idUserLogged ?? idUserOwner;
    // Verificar se o usuário existe
    const userExists = await prismaClient.users.findFirst({
      where: { id: idUserOwner ?? idUserLogged },
    });

    const typesProductsExists = await prismaClient.products.findFirst({
      where: {
        id: idTypeProduct,
      },
    });

    if (!userExists) {
      return {
        message: "Não foi possível prosseguir, este usuário não existe!",
        status: 404,
      };
    }
    if (!typesProductsExists) {
      return {
        message:
          "Não foi possível prosseguir com está ação, o tipo do produto não existe!",
        status: 404,
      };
    }

    const where: any = {};

    if (name)
      where.id = {
        contains: name,
        mode: "insensitive",
      };
    if (userIDSend) {
      where.idUserOwner = {
        contains: userIDSend,
        mode: "insensitive",
      };
    }
    if (idTypeProduct)
      where.idTypeProduct = { contains: idTypeProduct, mode: "insensitive" };
    if (available)
      where.available = { contains: available, mode: "insensitive" };

    if (status !== null)
      where.status = {
        contains: status,
      };

    try {
      const shouldPaginate = page !== undefined || limit !== undefined;
      const skip = shouldPaginate
        ? ((page ?? 1) - 1) * (limit ?? 10)
        : undefined;
      const take = shouldPaginate ? limit ?? 10 : undefined;

      const products = await prismaClient.products.findMany({
        where,
        skip,
        take,
      });

      const totalProducts = await prismaClient.products.count({ where });
      const totalPages = shouldPaginate
        ? Math.ceil(totalProducts / (limit ?? 10))
        : 1;

      return {
        data: {
          items: products,
          totalItems: totalProducts,
          totalPages: totalPages,
          currentPage: shouldPaginate ? page ?? 1 : 1,
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: MessagesError.GetAllMessageError,
          error: err?.message,
          status: 500,
        },
      };
    }
  }
}

export { ProductsGetAllService };
