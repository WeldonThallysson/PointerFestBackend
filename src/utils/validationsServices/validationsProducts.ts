
interface IParamsProductsService {
  idUserOwner: string;
  name: string;
  description?: string | null, 
  idCategory: string,
  idTypeProduct:string
  price: number
  allowAddCoupon: boolean
  available: boolean
}

 
export const validationsProductsService = ({
  name,
  idUserOwner,
  description,
  allowAddCoupon,
  available,
  idCategory,
  idTypeProduct,
  price
}: IParamsProductsService) => {
  if (!idUserOwner) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe o id do usuário responsável",
        status: 400,
      },
    };
  }

  if (!idCategory) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe a categoria do produto",
        status: 400,
      },
    };
  }
 
  
  if (!idTypeProduct) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe o tipo do produto",
        status: 400,
      },
    };
  }

  if (available === null) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe se o produto está disponível para venda",
        status: 400,
      },
    };
  }

  if (allowAddCoupon === null) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe se pode haver uso de cupom para os produtos",
        status: 400,
      },
    };
  }
  if (!name) {
    return {
      data: {
        message: "Não foi possível realizar está ação, Preencha o nome do produto.", 
        status: 400,
      },
    };
  }

  if (!description) {
    return {
      data: {
        message: "Não foi possível realizar está ação, por favor informe a descrição do produto",  
        status: 400,
      },
    };
  }

  if (!price) {
    return {
      data: {
        message: "Não foi possível realizar está ação, por favor informe preço do produto",  
        status: 400,
      },
    };
  }
};
