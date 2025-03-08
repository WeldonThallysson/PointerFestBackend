import prismaClient from "../../prisma";
import { UploadedFile } from "express-fileupload"; 
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { v6 as uuid } from "uuid";
import { validationsCommercialsService } from "../../utils/validationsServices/validationsCommercials";

interface ICommercialsRegisterService {
  idUserOwner: string;
  idTypeCommercial: string;
  name: string;
  description: string;
  urlImageCommercial: UploadedFile | null;
  urlSocialMediaCommercial: string;
  positionOrder: number;
}

class CommercialsRegisterService {
  async execute({
    idUserOwner,
    name,
    description,
    positionOrder,
    idTypeCommercial,
    urlImageCommercial,
    urlSocialMediaCommercial,
  }: ICommercialsRegisterService) {
    
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
        name: name,
      }
    });

    if (commercialsExists) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, este comercial já existe",
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
          message: "Não foi possível prosseguir com esta ação, está usuário responsável não existe",
          status: 403,
        },
      };
    }

    try {
      const idUrlImageCommercial = uuid();
  
      const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: `commercials/${idUrlImageCommercial}`,
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

      await prismaClient.commercials.create({
        data: {
          idUserOwner: idUserOwner,
          name: name,
          description: description ? description : null,
          idTypeCommercial: idTypeCommercial,
          positionOrder:positionOrder ? positionOrder : null,
          idUrlImageCommercial:idUrlImageCommercial ? idUrlImageCommercial : null,
          urlImageCommercial: resultFile.url
            ? resultFile.url
            : null,
          urlSocialMediaCommercial: urlSocialMediaCommercial ? urlSocialMediaCommercial : null,
        },
      });

      return {
        data: {
          message: "Comercial cadastrado com sucesso",
          status: 200,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `Ocorreu um error durante o cadastro de comercial ${err}`,
          status: 500,
        },
      };
    }
  }
}

export { CommercialsRegisterService };
