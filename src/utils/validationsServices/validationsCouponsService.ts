import { validatorFieldsEmpty } from "../validators/validatorFieldsEmpty";

interface IParamsCouponsService {
  idUserOwner: string
 
}

export const validationsCouponsService = ({
    idUserOwner,

 

}: IParamsCouponsService) => 
  {
  const validatorEmpty = validatorFieldsEmpty(
    idUserOwner,

  );

  if (validatorEmpty) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, Preencha todos os campos obrigatórios.", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: [
          "idUserOwner",
        ],
        status: 400,
      },
    };
  }

 
 
};
