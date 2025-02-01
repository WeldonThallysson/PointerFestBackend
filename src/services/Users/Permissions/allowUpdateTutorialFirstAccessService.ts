import prismaClient from "../../../prisma";

interface IAllowAccessUserService {
  id_user_logged: string;
  tutorialFirstAccess?: boolean | null;
}

class AllowUpdateTutorialFirstAccessService {
  async execute({
    id_user_logged,
    tutorialFirstAccess
  }: IAllowAccessUserService) {
    if (!id_user_logged) {
      return {
        data: {
          message:
            "Não foi possível realizar esta ação, por favor envie o id_user_logged do usuário.",
          status: 400,
        },
      };
    }


    const userLoggedExists = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    if (!userLoggedExists) {
      return {
        data: {
          message:
            "Não foi possível realizar esta ação, usuário responsável não encontrado.",
          status: 400,
        },
      };
    }

    await prismaClient.users.update({
      where: {
        id: id_user_logged,
      },
      data: {
        tutorialFirstAccess: tutorialFirstAccess
      },
    });

    return {
      data: {
        message: "Tutorial de primeiro acesso atualizado com sucesso.",
        status: 200,
      },
    };
  }
}

export { AllowUpdateTutorialFirstAccessService };
