import { TypesAccess } from "../../../keys/typeAccess/typesAccess";
import prismaClient from "../../../prisma";

interface IAllowAccessUserService {
  cpfCnpj_user: string;
  id_user_logged: string;
  typeAccessParam?: string | null;
}

class AllowAccessUserService {
  async execute({
    cpfCnpj_user,
    id_user_logged,
    typeAccessParam,
  }: IAllowAccessUserService) {
    if (!id_user_logged) {
      return {
        data: {
          message: "Não foi possível realizar esta ação, por favor envie o id do responsável pela alteração",
          status: 400,
        },
      };
    }

    if (!cpfCnpj_user) {
      return {
        data: {
          message: "Não foi possível realizar esta ação, por favor envie o CPF ou CNPJ do usuário.",
          status: 400,
        },
      };
    }

    if (
      typeAccessParam !== TypesAccess.Owner &&
      typeAccessParam !== TypesAccess.Developer &&
      typeAccessParam !== TypesAccess.Master &&
      typeAccessParam !== TypesAccess.Admin &&
      typeAccessParam !== TypesAccess.Promoter &&
      typeAccessParam !== TypesAccess.User
    ) {
      return {
        data: {
          message:
            "Não foi possível realizar esta ação, tipo de acesso não reconhecido pelo sistema.",
          typesAccessAccepts: [
            TypesAccess.Owner,
            TypesAccess.Developer,
            TypesAccess.Master,
            TypesAccess.Admin,
            TypesAccess.Promoter,
            TypesAccess.User,
          
          ],
          status: 404,
        },
      };
    }

    const userLoggedExists = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    const userExists = await prismaClient.users.findFirst({
      where: {
        cpfCnpj: cpfCnpj_user,
      },
    });

    if (!userLoggedExists) {
      return {
        data: {
          message:
            "Não foi possível realizar esta ação, usuário responsavel não encontrado.",
          status: 400,
        },
      };
    }

    if (!userExists) {
      return {
        data: {
          message:
            "Não foi possível realizar esta ação, usuário não encontrado.",
          status: 400,
        },
      };
    }

    if (
      userLoggedExists?.typeAccess !== TypesAccess.Owner &&
      userLoggedExists?.typeAccess !== TypesAccess.Developer &&
      userLoggedExists.typeAccess !== TypesAccess.Master 
    ) {
      return {
        data: {
          message: "Você não tem permissão de autorização para esta ação.",
          status: 403,
        },
      };
    }

    if (userExists.id === id_user_logged) {
      return {
        data: {
          message:
            "Não é possível alterar o próprio tipo de acesso, para está ação entre em contato com o suporte",
          status: 403,
        },
      };
    }

    await prismaClient.users.update({
      where: {
        id: userExists.id,
      },
      data: {
        typeAccess: typeAccessParam ? typeAccessParam : TypesAccess.User,
      },
    });

    return {
      data: {
        message: "Permissão de autorizações alteradas com sucesso.",
        status: 200,
      },
    };
  }
}

export { AllowAccessUserService };
