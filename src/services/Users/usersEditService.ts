import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { TypePerson } from "../../keys/typePerson/typePerson";
import { deformatter } from "../../utils/desformatter";
import { formatterDateToIso } from "../../utils/formatters/formatterDate";
import { todayWithTime } from "../../utils/formatters/formatterToday";
import { validatorPermissions } from "../../utils/validators/validatorPermissions";
import { hash } from "bcryptjs";

import prismaClient from "../../prisma";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import { UploadedFile } from "express-fileupload";
import { validationsUserService } from "../../utils/validationsServices/validationsUserService";

interface IEditUserService {
  id: string;
  id_user_logged: string;

  email: string;
  password: string;
  cpfCnpj: string;
  name?: string | null;
  complement?: string | null;
  typePerson?: TypePerson | null;
  phone?: string | null;
  birthDate?: string | null;
  residence?: string | null;
  neighborhood?: string | null;
  address?: string | null;
  city?: string | null;
  gender?: string | null;
  cep?: string | null;
  profileSocialUrl?: string | null;
  number_address?: string | null;
  region_code?: string | null;
  street?: string | null;
  status?: boolean;
  profileAvatar?: UploadedFile | null;
  typeAccess?: string | null;

  termsReceiptNews?: boolean | null;
  termsUsePlatform?: boolean | null;
  termsUseLGPD?: boolean | null;
  termsPrivacyPolicy?: boolean | null;
}

class UsersEditService {
  async execute({
    id,
    id_user_logged,
    complement,
    street,
    termsReceiptNews,
    typePerson,
    name,
    email,
    password,
    cpfCnpj,
    phone,
    birthDate,
    neighborhood,
    profileSocialUrl,
    profileAvatar,
    city,
    cep,
    region_code,
    number_address,
    typeAccess,
    termsUsePlatform,
    termsUseLGPD,
    termsPrivacyPolicy,
    gender,
    status,
  }: IEditUserService) {
    if (!id) {
      return {
        data: {
          message:
            "Não foi possível realizar está ação, por favor informe o (id) do usuário.",
          status: 400,
        },
      };
    }

    const verifyValidations = validationsUserService({
      name: name,
      email: email,
      cpfCnpj: cpfCnpj,
      phone: phone,
      birthDate: birthDate,
      gender: gender,
      typePerson: typePerson,
      password: password ? password : null,
    });

    if (verifyValidations) {
      return verifyValidations;
    }

    const isUserLogged = id === id_user_logged;

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    if (!userExistsLogged) {
      return {
        data: {
          message:
            "Não foi possível realizar a ação, o usuário responsável não foi encontrado.",
          status: 404,
        },
      };
    }

    const userExists = await prismaClient.users.findFirst({
      where: { id: id },
    });

    const userEmailExists = await prismaClient.users.findFirst({
      where: { email: email, NOT: { id: id } },
    });

    const userCPFOrCNPJExists = await prismaClient.users.findFirst({
      where: { cpfCnpj: cpfCnpj, NOT: { id: id, cpfCnpj: cpfCnpj } },
    });

    const CPFOrCNPJ =
      userCPFOrCNPJExists?.typePerson === TypePerson.Fisic ? "CPF" : "CNPJ";

    const validationPermission = validatorPermissions({
      typeAccess: userExistsLogged.typeAccess || "",
    });

    if (id !== id_user_logged && !validationPermission) {
      return {
        data: {
          message:
            "Sua conta não possui permissão para realizar esta ação, sua conta pode editar apenas o seus dados.",
          status: 403,
        },
      };
    }

    if (userExists !== null && !userExists) {
      return {
        data: {
          message:
            "Não foi possível realizar o esta ação, o usuário não existe.",
          status: 400,
        },
      };
    }

    if (email && userEmailExists) {
      return {
        data: {
          message: `Não foi possível realizar está ação, esse e-mail está em uso.`,
          status: 400,
        },
      };
    }

    if (cpfCnpj && userCPFOrCNPJExists) {
      return {
        data: {
          message: `Não foi possível realizar está ação, esse ${CPFOrCNPJ} está em uso.`,
          status: 400,
        },
      };
    }

    if (password && password.length < 8) {
      return {
        data: {
          message:
            "A senha deve ter de 8 a 14 caracteres para garantir maior segurança.",
          status: 401,
        },
      };
    }

    if (password && password.length > 14) {
      return {
        data: {
          message:
            "A senha deve ter de 8 a 14 caracteres para garantir maior segurança. você ultrapassou o limite de caracteres",
          status: 401,
        },
      };
    }

    const todayAt = todayWithTime();

    if (password && password?.length < 8) {
      return {
        data: {
          message:
            "A senha deve ter no mínimo 8 caracteres para garantir maior segurança.",
          status: 401,
        },
      };
    }

    if (password && password.length > 14) {
      return {
        data: {
          message:
            "A senha deve ter de 8 a 14 caracteres para garantir maior segurança. você ultrapassou o limite de caracteres",
          status: 401,
        },
      };
    }

    if (typeAccess && (userExistsLogged.typeAccess === TypesAccess.User ||
        userExistsLogged.typeAccess === TypesAccess.Promoter ||
        userExistsLogged.typeAccess === TypesAccess.Worker)
    ) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, sua conta não tem permissão para alterar o status do usuário",
          status: 403,
        },
      };
    }

    if (
      status &&
      (userExistsLogged.typeAccess === TypesAccess.User ||
        userExistsLogged.typeAccess === TypesAccess.Promoter ||
        userExistsLogged.typeAccess === TypesAccess.Worker)
    ) {
      return {
        data: {
          message:
            "Não foi possível realizar essa ação, sua conta não tem permissão para alterar o status do usuário",
          status: 403,
        },
      };
    }

    try {
      let idProfileAvatar = isUserLogged
        ? userExistsLogged.idProfileAvatar
        : userExists.idProfileAvatar;

      const resultFile: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: `users/${idProfileAvatar}`,
                overwrite: true,
                folder: "users",
              },
              (err, result) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(result);
              }
            )
            .end(profileAvatar.data);
        }
      );

      const profileAvatarUpdated = resultFile.secure_url;

      const updateUser = async (
        user: typeof userExistsLogged,
        isLoggedUser = false
      ) => {
        return await prismaClient.users.update({
          where: { id: isLoggedUser ? id_user_logged : id },
          data: {
            name: name ? name : null,
            email: email ? email : null,
            password: password ? await hash(password, 8) : user.password,
            cpfCnpj: cpfCnpj ? deformatter(cpfCnpj) : null,
            phone: phone ? deformatter(phone) : null,
            birthDate: birthDate
              ? formatterDateToIso(birthDate)
              : null,
            
            street: street ? street : null,
            complement: complement ? complement : null,
            profileAvatar: profileAvatarUpdated, // Será atualizado pelo controller
            profileSocialUrl: profileSocialUrl ? profileSocialUrl : null,
            typePerson: typePerson ? typePerson : null,
            neighborhood: neighborhood ? neighborhood : null,
            city: city ? city : null,
           
            gender: gender ? gender : null,
            cep: cep ? deformatter(cep) : null,
            region_code: region_code ? region_code : null,
            number_address: number_address ? number_address : null,
   
            typeAccess: typeAccess ? typeAccess : user.typeAccess,

            termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : user.termsUsePlatform,
            termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : user.termsUseLGPD,
            termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews : user.termsReceiptNews,
            termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy :  user.termsPrivacyPolicy,

            status: status !== null &&
              userExistsLogged.typeAccess !== TypesAccess.User
                ? status
                : user.status,
            updated_At: todayAt,
        
            editedBy: userExistsLogged?.name ?? null,
            typeAccessEditedBy: userExistsLogged?.typeAccess ?? null,
            cpfEditedBy: userExistsLogged?.cpfCnpj ?? null,
            dateEditedBy: todayAt ?? null,
          },
        });
      };

      if (isUserLogged) {
        await updateUser(userExistsLogged, true);
        return {
          data: {
            message: "Sua conta foi atualizada com sucesso!",
            status: 200,
          },
        };
      } else {
        await updateUser(userExists);
        return {
          data: {
            message: "Usuário atualizado com sucesso!",
            status: 200,
          },
        };
      }
    } catch (err) {
      return {
        data: {
          message: `Erro ao atualizar usuário: ${err.message}`,
          status: 500,
        },
      };
    }
  }
}

export { UsersEditService };
