import { stat } from "fs";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import prismaClient from "../../prisma";
import {
  formatterDate,
  formatterDateToIso,
} from "../../utils/formatters/formatterDate";
import { validatorPermissions } from "../../utils/validators/validatorPermissions";
import { formatterCPF } from "../../utils/formatters/formatterCPF";
import { formatterCEP } from "../../utils/formatters/formatterCEP";
import { TypePerson } from "../../keys/typePerson/typePerson";
import { formatterCNPJ } from "../../utils/formatters/formatterCNPJ";

interface IGetAllUserService {
  id_user_logged: string;
  idOtherUser: string | null;
  name?: string | null;
  email?: string | null;
  cpfCnpj?: string | null;
  complement?: string | null;
  phone?: string | null;
  birthDate?: string | null;
  residence?: string | null;
  neighborhood?: string | null;
  address?: string | null;
  city?: string | null;
  gender?: string | null;
  cep?: string | null;
  typeAccess?: string | null;
  typePerson?: string | null;
  number_address?: string | null;
  region_code?: string | null;
  street?: string | null;
  status?: boolean;
  page?: number | null;
  limit?: number | null;
}

class UsersGetAllService {
  async execute({
    id_user_logged,
    idOtherUser,
    name,
    email,
    cpfCnpj,
    complement,
    phone,
    birthDate,
    residence,
    neighborhood,
    address,
    city,
    gender,
    cep,
    typeAccess,
    typePerson,
    number_address,
    region_code,
    street,
    status,
    page,
    limit,
  }: IGetAllUserService) {
    
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

    if (
      userExistsLogged?.typeAccess === TypesAccess.Owner ||
      userExistsLogged?.typeAccess === TypesAccess.Developer
    ) {
      where.typeAccess = { contains: typeAccess, mode: "insensitive" };
    }

    if (userExistsLogged.typeAccess === TypesAccess.Master) {
      where.typeAccess = {
        notIn: [TypesAccess.Master, TypesAccess.Owner, TypesAccess.Developer],
      };
    }

    if (userExistsLogged.typeAccess === TypesAccess.Admin) {
      where.typeAccess = {
        notIn: [
          TypesAccess.Admin,
          TypesAccess.Master,
          TypesAccess.Owner,
          TypesAccess.Developer,
        ],
      };
    } else if (userExistsLogged.typeAccess === TypesAccess.Worker) {
      where.typeAccess = {
        notIn: [
          TypesAccess.Admin,
          TypesAccess.Owner,
          TypesAccess.Developer,
          TypesAccess.Master,
          TypesAccess.Worker,
        ],
      };
    }

    if (idOtherUser) where.id = { contains: idOtherUser, mode: "insensitive" };
    if (name)
      where.name = {
        contains: name,
        mode: "insensitive",
      };

    if (email) where.email = { contains: email, mode: "insensitive" };

    if (cpfCnpj) where.cpfCnpj = { contains: cpfCnpj, mode: "insensitive" };

    if (phone) where.phone = { contains: phone, mode: "insensitive" };
    if (complement)
      where.complement = { contains: complement, mode: "insensitive" };
    if (birthDate) where.birthDate = formatterDate(birthDate);
    if (residence)
      where.residence = { contains: residence, mode: "insensitive" };
    if (neighborhood)
      where.neighborhood = { contains: neighborhood, mode: "insensitive" };
    if (address) where.address = { contains: address, mode: "insensitive" };
    if (cep) where.cep = { contains: address, mode: "insensitive" };
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (gender) where.gender = gender;
    if (status !== null) where.status = status;
    if (typeAccess)
      where.typeAccess = { contains: typeAccess, mode: "insensitive" };
    if (typePerson)
      where.typePerson = { contains: typePerson, mode: "insensitive" };
    if (street) where.street = { contains: street, mode: "insensitive" };
    if (number_address)
      where.number_address = { contains: number_address, mode: "insensitive" };
    if (region_code)
      where.region_code = { contains: region_code, mode: "insensitive" };
    // Configurar paginação
    const shouldPaginate = page !== undefined || limit !== undefined;
    const skip = shouldPaginate ? ((page ?? 1) - 1) * (limit ?? 10) : undefined;
    const take = shouldPaginate ? limit ?? 10 : undefined;

    const users = await prismaClient.users.findMany({
      where,
      skip,
      take,
      orderBy: { created_At: "desc" },
      select: {
        id: true,
        idPlan: true,
        name: true,
        email: true,
        cpfCnpj: true,
        phone: true,
        birthDate: true,
        gender: true,
        typePerson: true,

        city: true,
        street: true,
        neighborhood: true,
        complement: true,
        cep: true,
        number_address: true,
        region_code: true,
        typeAccess: true,
        profileAvatar: true, // essa é a logo que o usuário ira enviar apenas a url do banco de fotos
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
        typeAccessEditedBy: true, // para quando o admin ou master cadastrar um novo cliente saber quem cadastrou esse novo usuário
        cpfEditedBy: true,
        dateEditedBy: true,

        tutorialFirstAccess: true,
        status: true,

        planSubscription: true,

        created_At: true,
        updated_At: true,
      },
    });

    const totalUsers = await prismaClient.users.count({ where });
    const totalPages = shouldPaginate
      ? Math.ceil(totalUsers / (limit ?? 10))
      : 1;

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
        totalItems: totalUsers,
        totalPages: totalPages,
        currentPage: shouldPaginate ? page ?? 1 : 1,
        status: 200,
      },
    };
  }
}

export { UsersGetAllService };
