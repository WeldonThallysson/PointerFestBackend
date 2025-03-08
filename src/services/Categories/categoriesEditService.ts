import prismaClient from "../../prisma";
import { validationsCategoriesService } from "../../utils/validationsServices/validationsCategories";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

interface ICategoriesEditService {
  id: string;
  name: string;
  idUserOwner: string;
  label?: string | null;
  icon?: UploadedFile | null;
  themeImageUrl?: UploadedFile | null;
}

class CategoriesEditService {
  async execute({
    id,
    idUserOwner,
    name,
    label,
    icon,
    themeImageUrl,
  }: ICategoriesEditService) {
    if (!id) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, por favor envie o id da categoria para prosseguir.",
          status: 400,
        },
      };
    }

    const validationsCategories = validationsCategoriesService({
      idUserOwner,
      name,
      icon,
    });

    if (validationsCategories) {
      return validationsCategories;
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const categoryExists = await prismaClient.categories.findFirst({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, o usuário responsável não existe",
          status: 404,
        }
      };
    }

    if (!categoryExists) {
      return {
        data: {
         message: "Não foi possível prosseguir com esta ação, essa categoria não existe",
         status: 404,
        }
      };
    }

    try {
      let idIcon = categoryExists.idIcon;
      let idThemeImageUrl = categoryExists.idThemeImageUrl


      const resultFile: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: `icons/${idIcon}`,
                overwrite: true,
                folder: "icons",
              },
              (err, result) => {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(result);
              }
            )
            .end(icon.data);
        }
      );

      const resultThemeImageUrl: UploadApiResponse = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream({
          public_id: `themesCategories/${idThemeImageUrl}`,
          folder: "themesCategories"
        }, (err, result) => {
          if(err){
            return {
              data: {
                 message: err,
                 status: 500
              }
            }
          }
          resolve(result)
        }).end(themeImageUrl.data)
      })

      await prismaClient.categories.update({
        where: {
          id: id,
        },

        data: {
          name: name,
          label: label,
          icon: resultFile.url ? resultFile.url : null,
          themeImageUrl: resultThemeImageUrl.url ? resultThemeImageUrl.url : null,
        },
      });

      return {
        data: {
          message: "Categoria atualizada com sucesso",
          status: 500,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `Ocorreu um error ao tentar atualizar a categoria, erro:${err}`,
          status: 500,
        },
      };
    }
  }
}

export { CategoriesEditService };
