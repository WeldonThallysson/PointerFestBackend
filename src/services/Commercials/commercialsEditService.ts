import prismaClient from "../../prisma";
import { UploadedFile } from "express-fileupload"; 
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { validationsCommercialsService } from "../../utils/validationsServices/validationsCommercials";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { Messages, MessagesError } from "../../constants/messages.api";

interface ICommercialsEditService {
  id: string;
  idUserOwner: string;
  idTypeCommercial: string;
  name: string;
  description: string;
  urlImageCommercial: UploadedFile | null;
  urlSocialMediaCommercial: string;
  positionOrder: number;
  status?: boolean | null
}

class CommercialsEditService {
  async execute({
    id,
    idUserOwner,
    name,
    description,
    positionOrder,
    idTypeCommercial,
    urlImageCommercial,
    urlSocialMediaCommercial,
    status
  }: ICommercialsEditService) {

    if(!id){
        return {
            data: {
                message: "Não foi possível prosseguir com esta ação, por favor envio o id do comercial para prosseguir",
                status: 403,
            },
        }
    }
    
    const validationsCommercials = validationsCommercialsService({
      idUserOwner,
      name,
      urlImageCommercial,
      urlSocialMediaCommercial,
    });

    if (validationsCommercials) {
      return validationsCommercials;
    }

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: idUserOwner,
      },
    });

    const typeCommercialExists = await prismaClient.typesCommercials.findFirst({
        where: {
          id: idTypeCommercial,
        },
    });

    const commercialsExists = await prismaClient.commercials.findFirst({
      where: {
        id: id,
      }
    });

    if(status !== null && (userExists.typeAccess === TypesAccess.Worker || userExists.typeAccess === TypesAccess.User || userExists.typeAccess === TypesAccess.Promoter)){
        return {
            data: {
                message: "Não foi possível prosseguir com esta ação, você não tem permissão para alterar o status do comercial",
                status: 403,
              },  
        }
    }
    if (!commercialsExists) {
        return {
          data: {
            message: "Não foi possível prosseguir com esta ação, este comercial não existe",
            status: 403,
          },
        };
      }
      
    if (!typeCommercialExists) {
        return {
          data: {
            message: "Não foi possível prosseguir com esta ação, este tipo do comercial não existe",
            status: 403,
          },
        };
    }

    if (!userExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, usuário responsável não existe",
          status: 403,
        },
      };
    }

    try {
      const idUrlImageCommercial = commercialsExists.idUrlImageCommercial;
  
      const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: `commercials/${idUrlImageCommercial}`,
                overwrite: true,
                folder: "commercials",
              },
              (err, result) => {
                if (err) {
                  return {
                    data: {
                      message: err,
                      status: 500,
                    },
                  };
                }
                resolve(result);
              }
            )
            .end(urlImageCommercial.data);
        }
      );

      await prismaClient.commercials.update({
        where: {
            id: id,
        },

        data: {
          idUserOwner: idUserOwner,
          name: name,
          description: description ? description : null,
          idTypeCommercial: typeCommercialExists.id,
          positionOrder: positionOrder ? positionOrder : null,
          idUrlImageCommercial: idUrlImageCommercial ? idUrlImageCommercial : null,
          urlImageCommercial: resultFile.url
          ? resultFile.url
          : null,
          urlSocialMediaCommercial: resultFile ? resultFile.url : null,
        },
      });

      return {
        data: {
          message: Messages.UpdateMessageSuccess,
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `${MessagesError.UpdateMessageError} ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { CommercialsEditService };
