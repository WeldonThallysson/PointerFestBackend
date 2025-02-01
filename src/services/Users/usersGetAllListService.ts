import { formatterCEP } from "../../utils/formatters/formatterCEP";
import { formatterCPF } from "../../utils/formatters/formatterCPF";
import {
  formatterDate,
  formatterDateToIso,
} from "../../utils/formatters/formatterDate";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { validatorPermissions } from "../../utils/validators/validatorPermissions";

import prismaClient from "../../prisma";
import { TypePerson } from "../../keys/typePerson/typePerson";
import { formatterCNPJ } from "../../utils/formatters/formatterCNPJ";
import { deformatter } from "../../utils/desformatter";

interface IGetListUserService {
  id_user_logged: string;
  idOtherUser: string | null;
  name?: string | null;
  email?: string | null;
  cpfCnpj?: string | null;
  phone?: string | null;
  birthDate?: string | null;
  residence?: string | null;
  neighborhood?: string | null;
  address?: string | null;
  city?: string | null;
  gender?: string | null;
  cep?: string | null;
  typeAccess?: string | null;
  masterAccess?: boolean | null;
  status?: boolean;
  page?: number | null;
  limit?: number | null;
}

class UsersGetAllListService {
  async execute({
    id_user_logged,
    idOtherUser,
    name,
    email,
    cpfCnpj,
    phone,
    birthDate,
    residence,
    neighborhood,
    address,
    city,
    gender,
    cep,
    typeAccess,
    status,
  }: IGetListUserService) {
    const userExistsLogged = await prismaClient.users.findFirst({
      where: { id: id_user_logged },
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

    const responseValidation = validatorPermissions({
      typeAccess: userExistsLogged.typeAccess,
    });

    if (!responseValidation) {
      return {
        data: {
          message: "Sua conta não possui permissão para realizar esta ação.",
          status: 403,
        },
      };
    }

    if (
      (typeAccess && userExistsLogged.typeAccess === TypesAccess.User) ||
      userExistsLogged.typeAccess === TypesAccess.Promoter
    ) {
      return {
        data: {
          message:
            "Sua conta não possui permissão para buscar pelos parâmetros de tipo do usuário",
          status: 403,
        },
      };
    }

    const where: any = { id: { not: id_user_logged } };

    if (idOtherUser) where.id = { contains: idOtherUser, mode: "insensitive" };
    if (name) where.name = { contains: name, mode: "insensitive" };
    if (email) where.email = { contains: email, mode: "insensitive" };
    if (cpfCnpj) where.cpfCnpj = { contains: cpfCnpj, mode: "insensitive" };
    if (phone) where.phone = { contains: phone };
    if (birthDate) where.birthDate = formatterDate(birthDate);
    if (residence)
      where.residence = { contains: residence, mode: "insensitive" };
    if (neighborhood)
      where.neighborhood = { contains: neighborhood, mode: "insensitive" };
    if (address) where.address = { contains: address, mode: "insensitive" };
    if (cep) where.cep = { contains: cep, mode: "insensitive" };
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (gender) where.gender = gender;
    if (status !== null) where.status = status;
    if (typeAccess) where.typeAccess = { not: typeAccess, mode: "insensitive" };

    const users = await prismaClient.users.findMany({
      where,
      orderBy: { created_At: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        cpfCnpj: true,
        phone: true,
        birthDate: true,
        gender: true,
        city: true,
        street: true,
        neighborhood: true,
        complement: true,
        cep: true,
        number_address: true,
        region_code: true,
        typeAccess: true,
        typePerson:true,
        termsUsePlatform: true,
        termsUseLGPD: true,
        termsPrivacyPolicy: true,
        termsReceiptNews: true,
        
        profileSocialUrl: true,
        profileAvatar: true,

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

    const formattedUsers = users.map((user) => ({
      ...user,
      cpfCnpj:
        user.typePerson === TypePerson.Fisic
          ? formatterCPF(user.cpfCnpj)
          : formatterCNPJ(user.cpfCnpj),
      cep: formatterCEP(user.cep),
      birthDate: user.birthDate ? formatterDateToIso(user.birthDate) : null,
    }));

    return {
      data: {
        items: formattedUsers,
        status: 200,
      },
      status: 200,
    };
  }
}

export { UsersGetAllListService };
