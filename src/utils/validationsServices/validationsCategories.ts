import { UploadedFile } from "express-fileupload";

interface IParamsCategoriesService {
  idUserOwner: string;
  name: string;
  icon?: UploadedFile | null;
}

export const validationsCategoriesService = ({

  name,
  icon,
  idUserOwner,
}: IParamsCategoriesService) => {
  if (!idUserOwner) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, informe o id do usuário responsável", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400,
      },
    };
  }
 
  if (!name) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, Preencha o nome da categoria.", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400,
      },
    };
  }

  if (!icon) {
    return {
      data: {
        message:
          "Não foi possível realizar está ação, por favor envie um icone para prosseguir", //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400,
      },
    };
  }
};
