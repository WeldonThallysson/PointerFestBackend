import { TypePerson } from "../../keys/typePerson/typePerson";
import { validatorAge } from "../validators/validatorAge";
import { validatorCNPJ } from "../validators/validatorCNPJ";
import { validatorCPF } from "../validators/validatorCPF";
import { validateBirthDate } from "../validators/validatorDate";
import { validatorEmail } from "../validators/validatorEmail";
import { validatorFieldsEmpty } from "../validators/validatorFieldsEmpty";
import { isValidPhoneNumber } from "../validators/validatorPhone";

interface IParamsUserService {
  name: string; // nome do cliente ou administrador
  companyName?: string | null
  email: string; // email
  password?: string; // senha
  cpfCnpj: string; // cpf
  phone: string; // numero de telefone
  birthDate?: string | null; // Data de nascimento
  residence?: string; // casa ou detalhe da morada
  neighborhood?: string; // bairro
  address?: string; // endereço
  city?: string; // cidade
  cep?: string,
  region_code?: string,
  number_address?: string,
  typePerson?: TypePerson,
  gender?: string; // é o genero ele pode mandar masculino, feminino ou prefiro não dizer
}

export const validationsUserService = ({
  name,
  companyName,
  email,
  cpfCnpj,
  phone,
  birthDate,
  gender,
  typePerson,
  password
}: IParamsUserService) => {

  const validatorEmpty = validatorFieldsEmpty(
    name,
    email,
    cpfCnpj,
    phone,
    gender,
    typePerson
  );

  if (validatorEmpty) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, Preencha todos os campos obrigatórios.", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: ['name','email','cpf','phone','typePerson','gender'],
        status: 400,
      },
    };
  }

  
  if (!validatorEmail(email)) {
    return {
      data: {
        message: "Não foi possível realizar está ação, E-mail inválido.",
        status: 400,
      },
    };
  }

  if(!isValidPhoneNumber(phone)){
    return {
      data: {
        message: "Não foi possível realizar está ação, Número de telefone inválido.",
        status: 400,
      },
    };
  }

  
  if(password && password?.length < 8 ){
    return {
      data: {
        message:
          "A senha deve ter de 8 a 14 caracteres para garantir maior segurança.",
        status: 400,
      },
    };
  }

  
  if(password && password?.length > 14 ){
    return {
      data: {
        message:
          "A senha deve ter de 8 a 14 caracteres para garantir maior segurança. você ultrapassou o limite de caracteres",
        status: 400,
      },
    };
  }

  if (companyName && typePerson === TypePerson.Fisic) {
    return {
      data: {
        message: "Não é possível cadastrar um nome fantasia para pessoas físicas.",
        status: 400
      }
    }
  }
  
  if(!companyName && typePerson === TypePerson.Juridic){
     return {
      data: {
        message: "Não é possível prosseguir. Por favor, informe o nome fantasia da sua empresa.",
        status: 400
      }
     }
  }

  if (typePerson !== TypePerson.Fisic && typePerson !== TypePerson.Juridic) {
    return {
      data: {
        message:
          "Não foi possível realizar esta ação, o tipo da pessoa deve ser Física ou Jurídica",
        status: 400,
      },
    };
  }

  if (typePerson === TypePerson.Fisic && !validatorCPF(cpfCnpj)) {
    return {
      data: {
        message: "Não foi possível realizar está ação, CPF inválido. Deve conter 11 dígitos.",
        status: 400,
      },
    };
  }

  if (typePerson === TypePerson.Juridic && !validatorCNPJ(cpfCnpj)) {
    return {
      data: {
        message: "Não foi possível realizar está ação, CNPJ inválido. Deve conter 14 dígitos.",
        status: 400,
      },
    };
  }

  if (birthDate && birthDate === '') {
    return {
      data: {
        message: "Não foi possível realizar está ação, é necessário informar sua data de nascimento !",
        status: 400,
      },
    };
  }

  if (birthDate && !validateBirthDate(birthDate)) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, É necessário ter pelo menos 18 anos para se cadastrar!",
        status: 400,
      },
    };
  }
  if (birthDate && validatorAge(birthDate)) {
    return {
      data: {
        message:
          "A ação não pode ser realizada. É necessário ter pelo menos 18 anos para prosseguir.",
        status: 400,
      },
    };
  }



};
