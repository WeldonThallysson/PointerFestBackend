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
  themeImageUrl?: UploadedFile | null;
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

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner
      }
    })

    const categoryExists = await prismaClient.categories.findFirst({
      where: {
        name: name,
      },
    });

    if (categoryExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, está categoria já existe",
          status: 403,
        }
     
      };
    }

    if(!userExists){
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, está usuário responsável não existe",
          status: 403,
        }
      }
    }

    try {
      const iconId = uuid()
      const idThemeImageUrl = uuid()

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

      await prismaClient.categories.create({
        data: {
          idUserOwner: idUserOwner,
          name: name,
          label: label ? label : null,
          idIcon: iconId,
          icon: resultFile.url ? resultFile.url : null, 
          idThemeImageUrl: idThemeImageUrl,
          themeImageUrl: resultThemeImageUrl.url ? resultThemeImageUrl.url : null,
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
