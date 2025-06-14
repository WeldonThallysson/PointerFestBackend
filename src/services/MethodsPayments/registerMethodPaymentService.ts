import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import {
  TypesMethodPayment,
  validateTypeMethodsPayment,
} from "../../keys/typeMethodPayment/typesAccess";
import prismaClient from "../../prisma";
import { todayWithTime } from "../../utils/formatters/formatterToday";

interface IRegisterMethodPaymentService {
  id_user_logged: string;
  name: string;
  description: string;
  typeMethodPayment: TypesMethodPayment;
}

class RegisterMethodPaymentService {
  async execute({
    id_user_logged,
    name,
    description,
    typeMethodPayment,
  }: IRegisterMethodPaymentService) {
    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    const methodExists = await prismaClient.methodsPayments.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    const methodTypeExists = await prismaClient.methodsPayments.findFirst({
      where: {
        typeMethodPayment: {
          contains: typeMethodPayment,
          mode: "insensitive",
        },
      },
    });

    if (methodExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, método de pagamento já cadastrado.",
          status: 400,
        },
      };
    }
    if (methodTypeExists) {
      return {
        data: {
          message:
            "Não foi possível prosseguir com a ação, tipo do método de pagamento já cadastrado.",
          status: 400,
        },
      };
    }

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
      userExistsLogged.typeAccess !== TypesAccess.Master  ) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, sua conta não tem permissão para cadastrar métodos de pagamentos apenas o acesso master",
          status: 403,
        },
      };
    }
    
    if (!validateTypeMethodsPayment.includes(typeMethodPayment)) {
      return {
        data: {
          message: "Não foi possível realizar essa ação, o tipo de método de pagamento não autorizado pela API, apenas (avista, pix, debito ou credito)",
          status: 403,
        },
      };
    }

 
    try {
      const todayAt = todayWithTime();
       
      await prismaClient.methodsPayments.create({
        data: {
          name,
          idUserOwner: id_user_logged,
          description,
          typeMethodPayment: typeMethodPayment,
          created_At: todayAt
        },
      });

      return {
        data: {
          message: "Método de pagamento cadastrado com sucesso!",
          status: 201,
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

export { RegisterMethodPaymentService };
