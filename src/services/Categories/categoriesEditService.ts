import prismaClient from "../../prisma";
import { validationsCategoriesService } from "../../utils/validationsServices/validationsCategories";
import {UploadedFile} from 'express-fileupload'
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'
import {v6 as uuid} from 'uuid'

interface ICategoriesEditService {
    id: string,
    name: string
    idUserOwner: string;
    label?: string | null;
    icon?: UploadedFile
    themeImageUrl?: string | null
}

class CategoriesEditService {
    async execute({
        id,
        idUserOwner,
        name,
        label,
        icon,
        themeImageUrl
    }: ICategoriesEditService){

        if(!id){
            return {
                data: {
                    message: "Não foi possível prosseguir com esta ação, por favor envie o id da categoria para prosseguir.",
                    status: 400
                }
            }
        }
        
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
                id: id,
            }
        })    
 
        
        if(!categoryExists){
            return {
                message: "Não foi possível prosseguir com esta ação, essa categoria não existe",
                status: 404,
              };
        }

        try {   
            let idIcon = categoryExists.idIcon

            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    public_id: `icon/${idIcon}`,
                    overwrite: true,
                    folder: "users",
                }, (err, result) => {
                    if(err){
                        reject(err)
                        return;
                    }

                    resolve(result)
                }).end(icon.data)
            })
            
            await prismaClient.categories.update({
                where: {
                    id: id
                },
                
                data:{
                    name: name,
                    label: label,
                    icon: resultFile.url ? resultFile.url : null,
                    themeImageUrl: themeImageUrl
                }
    
            })
            

            return {
                data: {
                    message: "Categoria atualizada com sucesso",
                    status: 500
                }
            }
            
        }
        catch(err){
            return {
                data: {
                    message: `Ocorreu um error ao tentar atualizar a categoria, erro:${err}`,
                    status: 500
                }
            }
        }
        

 

    }

}

export {CategoriesEditService}