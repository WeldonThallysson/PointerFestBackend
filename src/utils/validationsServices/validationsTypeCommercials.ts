
interface IParamsTypeCommercialsService {
  idUserOwner: string;
  name: string;
  position?: string | null, 
}

 
export const validationsTypeCommercialsService = ({
  name,
  idUserOwner,
  position,
}: IParamsTypeCommercialsService) => {
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
        message: "Não foi possível realizar está ação, Preencha o nome do tipo do comercial.", 
        status: 400,
      },
    };
  }

  if (!position) {
    return {
      data: {
        message: "Não foi possível realizar está ação, por favor informe a possição do tipo do comercial",  
        status: 400,
      },
    };
  }
};
