import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import { validationsUserService } from "../../utils/validationsServices/validationsUserService";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { todayWithTime } from "../../utils/formatters/formatterToday";
import { deformatter } from "../../utils/desformatter";
import { TypePerson } from "../../keys/typePerson/typePerson";
import { v2 as cloudinary,  UploadApiResponse } from "cloudinary";
import { v6 as uuid} from "uuid";
import { UploadedFile } from "express-fileupload";




interface IUsersRegisterService {
  id_user_logged?: string;
  name: string;
  companyName?: string | null
  email: string; 
  password: string; 
  cpfCnpj: string; 
  phone: string;
  birthDate: string;
  residence?: string; 
  neighborhood?: string; 
  address?: string; 
  city?: string; 
  cep?: string;
  region_code?: string;
  number_address: string;
  gender?: string; // gênero
  status?: boolean | null;
  street?: string | null;
  complement?: string | null;
  profileAvatar?: UploadedFile,
  profileSocialUrl?: string | null;

  typeAccess?: string | null
  typePerson: TypePerson;
  termsUsePlatform?: boolean | null
  termsUseLGPD?: boolean | null
  termsPrivacyPolicy?: boolean | null
  termsReceiptNews?: boolean | null
}

class UsersRegisterOtherService {
  async execute({
    id_user_logged,
    name,
    companyName,
    email,
    password,
    cpfCnpj,
    phone,
    birthDate,
    street,
    complement,
    neighborhood,
    city,
    cep,
    region_code,
    number_address,
    gender,
    profileSocialUrl,
    profileAvatar,
    termsUsePlatform,
    termsUseLGPD,
    termsPrivacyPolicy,
    termsReceiptNews,
    typeAccess,
    typePerson,

    status,
  }: IUsersRegisterService) {
    
    if (!id_user_logged) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação,informe o id do responsável",
          status: 400,
        },
      };
    }

    const verifyValidations = validationsUserService({
      name,
      companyName,
      email,
      cpfCnpj,
      phone,
      birthDate,
      gender,
      typePerson,
      password: password ? password : null,
    });

    if (verifyValidations) {
      return verifyValidations;
    }


    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    const userCPFOrCNPJExists = await prismaClient.users.findFirst({
      where: { cpfCnpj: deformatter(cpfCnpj) },
    });

    const CPFOrCNPJ = userCPFOrCNPJExists.typePerson === TypePerson.Fisic ? "CPF" : "CNPJ"
    
    if(userCPFOrCNPJExists){
      return {
        data: {
          message: `Não foi possível prosseguir com esta ação, ${CPFOrCNPJ} já está em uso`,
          status: 404,
        },
      }
    }

    if (!userExistsLogged) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, usuário responsável não existe",
          status: 404,
        },
      };
    }

    if (
      userExistsLogged.typeAccess === TypesAccess.User ||
      userExistsLogged.typeAccess === TypesAccess.Promoter ||
      userExistsLogged.typeAccess === TypesAccess.Worker
    ) {
      return {
        data: {
          message: "Não foi possível prosseguir com esta ação, sua conta não possui permissão para está ação apenas (Master e Admin)",
          status: 404,
        },
      };
    }
    
    const validationError = validationsUserService({
      name,
      companyName,
      email,
      password,
      cpfCnpj,
      phone,
      gender,
    });

    if (validationError) {
     return validationError;
    }

    if (password.length < 8) {
      return {
        data: {
          message: "A senha deve ter no mínimo 8 caracteres para garantir maior segurança.",
          status: 401,
        },
      };
    }


    try {
      
    const todayAt = todayWithTime();

    const passwordHash = await hash(password, 8);
    const dateRegisteredBy = new Date();
    const idProfileAvatar = uuid()

    const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
         cloudinary.uploader.upload_stream({
               public_id: `users/${idProfileAvatar}`,
               folder: "users"
         }, (err, result) => {
           if(err) {
            return {
              message: err,
              status: 500,
            }
           }
           resolve(result)
         }
        
        ).end(profileAvatar.data)
    })

      const responseRegisterUser = await prismaClient.users.create({
        data: {
          name,
          companyName,
          email,
          password: passwordHash,
          cpfCnpj: deformatter(cpfCnpj),
          phone: deformatter(phone),
          birthDate: formatterDateToIso(birthDate),
          gender,
          street,
          neighborhood,
          complement,
          city,
          cep: cep ? deformatter(cep) : null, 
          region_code,
          number_address,
          status,        
          idProfileAvatar: idProfileAvatar,
          profileAvatar: resultFile.url ? resultFile.url : null,
          profileSocialUrl: profileSocialUrl !== null ? profileSocialUrl : null,
          termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : true,
          termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : true,
          termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews : true,
          termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : true,
          typePerson: typePerson ? typePerson : TypePerson.Fisic,
          typeAccess: typeAccess ? typeAccess : TypesAccess.User,
         
          registeredBy: userExistsLogged?.name ? userExistsLogged?.name : null,
          typeAccessRegisteredBy: userExistsLogged?.typeAccess ? userExistsLogged?.typeAccess : null,
          cpfRegisteredBy: userExistsLogged?.cpfCnpj ? userExistsLogged?.cpfCnpj : null,
          dateRegisteredBy: dateRegisteredBy ? formatterDateToIso(dateRegisteredBy) : null,
          
          tutorialFirstAccess: true,
         
          created_At: todayAt,
        },
      });
      return {
        data: {
          id: responseRegisterUser.id,
          message: "Usuário cadastrado com sucesso!",
          status: 201,
        },
      };
    } catch (err) {
      return {
        data: {
          message: `Erro ao registrar usuário: ${err.message}`,
          status: 500,
        },
      };
    }
  

   
  }
}

export { UsersRegisterOtherService };
