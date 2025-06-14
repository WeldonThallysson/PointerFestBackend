import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import {
  TypesMethodPayment,
  validateTypeMethodsPayment,
} from "../../keys/typeMethodPayment/typesAccess";
import prismaClient from "../../prisma";

interface IEditMethodPaymentService {
  id: string;
  id_user_logged: string;
  name: string;
  description: string;
  typeMethodPayment: TypesMethodPayment;
}

class EditMethodPaymentService {
  async execute({
    id,
    id_user_logged,
    name,
    description,
    typeMethodPayment,
  }: IEditMethodPaymentService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, informe o id do método de pagamento",
          status: 400,
        },
      };
    }

    const methodExists = await prismaClient.methodsPayments.findFirst({
      where: {
        id: id,
      },
    });

    if (!methodExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, método de pagamento não existe",
          status: 400,
        },
      };
    }

    /*
        
        
       

        if(!methodExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com a ação, método de pagamento já cadastrado.",
                    status: 400
                }
            }
        }
             const methodTypeExists = await prismaClient.methodsPayments.findFirst({
            where: {
                typeMethodPayment: {
                    contains: typeMethodPayment,
                    mode: "insensitive"
                }
            }
        })

        if(methodTypeExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com a ação, tipo do método de pagamento já cadastrado.",
                    status: 400
                }
            }
        }*/

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    /*
                const nameMethodExists = await prismaClient.methodsPayments.findFirst({
            where: {
                name: name
                
            }
        })

        
        if(nameMethodExists){
            return {
                data: {
                    message: "Não foi possível prosseguir com a ação, método de pagamento já cadastrado.",
                    status: 400
                }
            }
        }
        
        if(!methodExists){
            return {
                    data: {
                        message: "Não foi possível prosseguir com a ação, método de pagamento não existe.",
                        status: 404
                    }
            }
        }*/

    if (!userExistsLogged) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, usuário responsavel não encontrado.",
          status: 400,
        },
      };
    }
    if (!name) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, informe o nome do método de pagamento",
          status: 400,
        },
      };
    }
    if (!typeMethodPayment) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, informe o tipo do método de pagamento (typeMethodPayment)",
          status: 400,
        },
      };
    }

    if (
      userExistsLogged.typeAccess !== TypesAccess.Owner &&
      userExistsLogged.typeAccess !== TypesAccess.Developer &&
      userExistsLogged.typeAccess !== TypesAccess.Master
      ) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, sua conta não tem permissão para editar os métodos de pagamentos apenas o acesso master",
          status: 403,
        },
      };
    }

    if (!validateTypeMethodsPayment.includes(typeMethodPayment)) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, o tipo de método de pagamento não autorizado pela API, apenas (avista,pix,debito ou credito)",
          status: 403,
        },
      };
    }
    try {
      await prismaClient.methodsPayments.update({
        where: {
          id: id,
        },
        data: {
          name,
          description,
          typeMethodPayment:
            typeMethodPayment ?? methodExists.typeMethodPayment,
        },
      });

      return {
        data: {
          message: "Método de pagamento atualizado com sucesso!",
          status: 200,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, algum error ao cadastrar método de pagamento",
          status: 400,
        },
      };
    }
  }
}

export { EditMethodPaymentService };
