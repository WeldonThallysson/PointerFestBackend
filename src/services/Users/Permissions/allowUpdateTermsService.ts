
import prismaClient from "../../../prisma";

interface IAllowAccessUserService {
  id_user_logged: string;  
  termsUsePlatform?: boolean | null
  termsUseLGPD?: boolean | null
  termsUsePark?: boolean | null
  termsReceiptNews?: boolean | null;
  termsPrivacyPolicy?: boolean | null
}

class AllowUpdateTermsService {
  async execute({
    id_user_logged,
    termsUsePlatform,
    termsUseLGPD,
    termsPrivacyPolicy,
    termsReceiptNews
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
        termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : userLoggedExists.termsPrivacyPolicy,
        termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : userLoggedExists.termsUseLGPD,
        termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : userLoggedExists.termsUsePlatform,
        termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews: userLoggedExists.termsReceiptNews
      },
    });

    return {
      data: {
        message: "Termo(s) atualizado(s) com sucesso.",
        status: 200,
      },
    };
  }
}

export { AllowUpdateTermsService };
