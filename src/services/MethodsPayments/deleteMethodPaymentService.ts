import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";

interface IDeleteMethodPaymentService {
  id: string;
  id_user_logged: string;
}

class DeleteMethodPaymentService {
  async execute({ id, id_user_logged }: IDeleteMethodPaymentService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, informe o id do método de pagamento",
          status: 400,
        },
      };
    }

    const methodExists = await prismaClient.methodsPayments.findFirst({
      where: {
        id: id,
      },
    });
    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    if (!methodExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, método de pagamento não existe.",
          status: 404,
        },
      };
    }
    if (!userExistsLogged) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, usuário responsavel não encontrado.",
          status: 400,
        },
      };
    }

    if (
      userExistsLogged.typeAccess !== TypesAccess.Owner &&
      userExistsLogged.typeAccess !== TypesAccess.Developer &&
      userExistsLogged.typeAccess !== TypesAccess.Master
    ) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, sua conta não tem permissão para deletar métodos de pagamentos apenas o acesso master",
          status: 403,
        },
      };
    }

    try {
      await prismaClient.methodsPayments.delete({
        where: {
          id: id,
        },
      });

      return {
        data: {
          message: "Método de pagamento deletado com sucesso!",
          status: 200,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, algum error ao cadastrar método de pagamento",
          status: 400,
        },
      };
    }
  }
}

export { DeleteMethodPaymentService };
