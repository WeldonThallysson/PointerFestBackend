import { UploadedFile } from "express-fileupload";
import prismaClient from "../../prisma";
import { validationsCategoriesService } from "../../utils/validationsServices/validationsCategories";
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'
import {v6 as uuid} from 'uuid'
interface ICategoriesRegister {
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
  }: ICategoriesRegister) {
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
      const iconId = uuid()

      const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({
            public_id: `icons/${iconId}`,
            folder: "icons"
          }, (err,result) => {
            if(err){
              return {
                data: {
                message: err,
                status:500 
              
                }
              }
            }
            resolve(result)
          }).end(icon.data)

      })

      await prismaClient.categories.create({
        data: {
          idUserOwner: idUserOwner,
          name: name,
          label: label ? label : null,
          icon: resultFile.url ? resultFile.url : null, // aqui vai um icone url gerada pelo cloudinary
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
