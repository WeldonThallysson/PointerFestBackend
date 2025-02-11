import { UploadedFile } from "express-fileupload";
import prismaClient from "../../prisma";
import { validationsCategoriesService } from "../../utils/validationsServices/validationsCategories";

interface CadastroCategoriaType {
  idUserOwner: string;
  name: string;
  label?: string | null;
  icon?: UploadedFile | null;
  themeImageUrl?: string | null;
}

class CategoriesRegisterService {
  async execute({
    idUserOwner,
    name,
    label,
    icon,
    themeImageUrl,
  }: CadastroCategoriaType) {
    const validationsCategories = validationsCategoriesService({
      idUserOwner,
      name,
      icon,
    });

    if (validationsCategories) {
      return validationsCategories;
    }

    const categoryExists = await prismaClient.categories.findFirst({
      where: {
        name: name,
      },
    });

    if (categoryExists) {
      return {
        message:
          "Não foi possível prosseguir com esta ação, está categoria já existe",
        status: 403,
      };
    }

    try {
      await prismaClient.categories.create({
        data: {
          idUserOwner: idUserOwner,
          name: name,
          label: label ? label : null,
          icon: "", // aqui vai um icone url gerada pelo cloudinary
          themeImageUrl: themeImageUrl ? themeImageUrl : null,
        },
      });

      return {
        data: {
          message: "Categoria cadastrada com sucesso",
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
        message: `Ocorreu um error durante o cadastro da categoria ${err}`,
        status: 500,
      }};
    }
  }
}

export { CategoriesRegisterService };
