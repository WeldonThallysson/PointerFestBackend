import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { TypePerson } from "../../keys/typePerson/typePerson";
import prismaClient from "../../prisma";
import { formatterCEP } from "../../utils/formatters/formatterCEP";
import { formatterCNPJ } from "../../utils/formatters/formatterCNPJ";
import { formatterCPF } from "../../utils/formatters/formatterCPF";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";

interface IUsersGetDetailsService {
  id: string;
  idUserLogged: string;
}

class UsersGetDetailsService {
  async execute({ id, idUserLogged }: IUsersGetDetailsService) {

    if (!id) {
        return {
          data: {
            message: "Não foi possível realizar esta ação, por favor informe o (id) do usuário.",
            status: 400,
          },
         
        };
    }

    const userExistsLogged = await prismaClient.users.findFirst({
        where: { id: idUserLogged },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            cpfCnpj: true,
            birthDate: true,
            gender: true,
            city: true,
            neighborhood: true, 
            cep: true,
            number_address: true,
            region_code: true,
            typeAccess: true,
      
            status: true, 
            created_At: true
        }
    });

    if (!userExistsLogged) {
        return {
            data: {
                message: "Não foi possível realizar a ação, o usuário responsável não foi encontrado.",
                status: 404,  
            },
         
        };
    }

    const userExists = await prismaClient.users.findFirst({
        where: {  
         id: {
           contains: id,
         }, 
       },
        select: {
            id: true,
            name: true,
            email: true,
            cpfCnpj: true,
            birthDate: true,
            phone: true,
            gender: true,
            
            city: true,
            neighborhood: true, 
            cep: true,
            number_address: true,
            region_code: true,
            street: true,
            complement: true,

            typeAccess: true,
            typePerson: true,

            profileAvatar: true,
            profileSocialUrl: true,

            termsUsePlatform: true,
            termsUseLGPD: true,
            termsPrivacyPolicy: true,
            termsReceiptNews: true,
            registeredBy: true, 
            typeAccessRegisteredBy: true,

            cpfRegisteredBy: true,
            dateRegisteredBy: true,

            editedBy: true,
            typeAccessEditedBy: true, 
            cpfEditedBy: true, 
            dateEditedBy: true, 
            
            tutorialFirstAccess: true,
            status: true, 
            created_At: true,
            

        },
    });

    if (!userExists) {
        return {
            data: {
              message: "Não foi possível realizar esta ação, o usuário não existe.",
            },
            status: 404,
        };
    }

    if (userExistsLogged.typeAccess === TypesAccess.Admin) {
        return {
            data: {
                message: "Acesso negado. Administradores não podem visualizar dados de contas master.",
                status: 403,
            },
        };
    }

    return {
        data: {
            items: {
                ...userExists,
                cpfCnpj: userExists.typePerson === TypePerson.Fisic 
                 ? formatterCPF(userExists.cpfCnpj) 
                 : formatterCNPJ(userExists.cpfCnpj),
                cep: formatterCEP(userExists.cep),
                birthDate: formatterDateToIso(userExists.birthDate),
            },
            status: 200,
        },
   
    };

  }
}

export { UsersGetDetailsService };
