import { validatorCPF } from "../validators/validatorCPF";
import { validateBirthDate } from "../validators/validatorDate";
import { validatorEmail } from "../validators/validatorEmail";
import { validatorFieldsEmpty } from "../validators/validatorFieldsEmpty";
import { isValidPhoneNumber } from "../validators/validatorPhone";

interface IParamsDependentsService {
  name: string; // nome do cliente ou administrador
  cpf: string; // cpf
  birthDate: string; // Data de nascimento
  gender?: string;
  email?: string | null,
  phone?: string | null, // é o genero ele pode mandar masculino, feminino ou prefiro não dizer
  emailExists?: boolean | null;
  cpfExists?: boolean | null;
  userExists?: boolean | null;
}

export const validationsDependentsService = ({
  name,
  cpf,
  birthDate,
  gender,
  email,
  phone,
  emailExists,
  cpfExists,
  userExists,
}: IParamsDependentsService) => {

  const validatorEmpty = validatorFieldsEmpty(
    name,
    cpf,
    birthDate,
    gender
  );

  if (validatorEmpty) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, Preencha todos os campos obrigatórios.", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: [
          "name",
          "cpf",
          "birthDate",
          "gender",
        ],
        status: 400,
      },
    };
  }


  if (!validatorCPF(cpf)) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, CPF inválido. Deve conter 11 dígitos.",
        status: 400,
      },
    };
  }
  if (!validateBirthDate(birthDate)) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, data de nascimento inválida, verifique e tente novamente!",
        status: 400,
      },
    };
  }

    if (email && !validatorEmail(email)) {
      return {
        data: {
          message: "Não foi possível realizar está ação, E-mail inválido.",
          status: 400,
        },
      };
    }
  
    if(phone && !isValidPhoneNumber(phone)){
      return {
        data: {
          message: "Não foi possível realizar está ação, Número de telefone inválido.",
          status: 400,
        },
      };
    }
    
  /*
  if (validatorAge(birthDate)) {
    return {
      data: {
        message:
          "A ação não pode ser realizada. É necessário ter pelo menos 18 anos para prosseguir.",
        status: 400,
      },
    };
  }*/

  if (userExists !== null && userExists) {
    return {
      data: {
        message: "Não foi possível realizar o esta ação, o usuário não existe.",
        status: 400,
      },
    };
  }

  if (emailExists !== null && emailExists) {
    return {
      data: {
        message: "Não foi possível realizar está ação, Esse email está em uso.",
        status: 400,
      },
    };
  }

  if (cpfExists !== null && cpfExists) {
    return {
      data: {
        message: "Não foi possível realizar está ação, esse CPF está em uso.",
        status: 400,
      },
    };
  }
};
