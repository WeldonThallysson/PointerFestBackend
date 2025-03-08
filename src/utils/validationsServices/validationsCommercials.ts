import { UploadedFile } from "express-fileupload";

interface IParamsCommercialsService {
  idUserOwner: string;
  name: string;
  urlImageCommercial: UploadedFile | null,
  urlSocialMediaCommercial: string,
}

export const validationsCommercialsService = ({
  name,
  idUserOwner,
  urlImageCommercial,
  urlSocialMediaCommercial,
}: IParamsCommercialsService) => {
  if (!idUserOwner) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe o id do usuário responsável",
        status: 400,
      },
    };
  }
 
  if (!name) {
    return {
      data: {
        message: "Não foi possível realizar está ação, Preencha o nome da categoria.", 
        status: 400,
      },
    };
  }

  if (!urlImageCommercial) {
    return {
      data: {
        message: "Não foi possível realizar está ação, por favor envie a sua imagem comercial.",  
        status: 400,
      },
    };
  }

  if (!urlSocialMediaCommercial) {
    return {
      data: {
        message: "Não foi possível realizar está ação, por favor envie a sua url de midia para vinculo com comercial",  
        status: 400,
      },
    };
  }
};
