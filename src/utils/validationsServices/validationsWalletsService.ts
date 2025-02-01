
import { validatorAge } from "../validators/validatorAge";
import { validatorCPF } from "../validators/validatorCPF";
import { validateBirthDate } from "../validators/validatorDate";
import { validatorEmail } from "../validators/validatorEmail";
import { validatorFieldsEmpty } from "../validators/validatorFieldsEmpty";

interface IParamsWalletsService {
    idUserOwner: string,
    idUserForWallet: string | null,
    idCodePassport?: string | null,
    userLoggedExists?: boolean | null
    userExists?: boolean | null
    dependentExists?: boolean | null
    passportExists?: boolean | null
}

export const validationsWalletsService = ({
    idUserOwner,
    idUserForWallet,
    idCodePassport,
    userLoggedExists,
    userExists,
    dependentExists,
    passportExists
}: IParamsWalletsService) => 
  {
  const validatorEmpty = validatorFieldsEmpty(
    idUserOwner,
    idUserForWallet,
    idCodePassport,
  );

  if (validatorEmpty) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, Preencha todos os campos obrigatórios.", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: [
          "idUserForWallet",
          "idCodePassport",
        ],
        status: 400,
      },
    };
  }

 
  
  if(!userLoggedExists){
    return {
        data: {
          message: "Não foi possível realizar o esta ação, o usuário responsável não existe.",
          status: 400,
        },
      };
  }

  if (!dependentExists) {
    return {
      data: {
        message: "Não foi possível realizar está ação, o dependente ou usuário não existe.",
        status: 400,
      },
    };
  }

  if (passportExists) {
    return {
      data: {
        message: "Não foi possível realizar está ação, o passaporte já existe.",
        status: 400,
      },
    };
  }
};
