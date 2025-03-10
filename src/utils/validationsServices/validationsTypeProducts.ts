
interface IParamsTypeProductsService {
  idUserOwner: string;
  name: string;
  position?: string | null, 
}

 
export const validationsTypeProductsService = ({
  name,
  idUserOwner,
  position,
}: IParamsTypeProductsService) => {
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
        message: "Não foi possível realizar está ação, Preencha o nome do tipo do produto.", 
        status: 400,
      },
    };
  }

  if (!position) {
    return {
      data: {
        message: "Não foi possível realizar está ação, por favor informe a posição do tipo do produto",  
        status: 400,
      },
    };
  }
};
