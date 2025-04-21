import { MessagesError } from "../../constants/messages.api";
import prismaClient from "../../prisma";

interface IListarDetalhesProdutosService {
  id: string;
  idUserLogged?: string | null;
  idUserOwner?: string | null;
}

class ProductsGetDetailsSevice {
  async execute({
    id,
    idUserLogged,
    idUserOwner,
  }: IListarDetalhesProdutosService) {
    const userIDSend = idUserLogged ?? idUserOwner;
    const products = await prismaClient.products.findFirst({
      where: {
        id: id,
        idUserOwner: userIDSend,
      },
    });

    if (!products) {
      return {
        message: "Não foi possível prosseguir, o produto não existe!",
        status: 404,
      };
    }

    try {
      return {
        data: {
          items: products,
          status: 200,
        },
      };
    } catch (error: any) {
      return {
        data: {
          message: MessagesError.GetDetailsMessageError,
          error: error?.message,
          status: 500,
        },
      };
    }
  }
}

export { ProductsGetDetailsSevice };
