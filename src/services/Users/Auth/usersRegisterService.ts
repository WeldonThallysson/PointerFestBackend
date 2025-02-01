import { hash } from "bcryptjs";
import prismaClient from "../../../prisma";
import { deformatter } from "../../../utils/desformatter";
import { formatterDateToIso } from "../../../utils/formatters/formatterDate";
import { todayWithTime } from "../../../utils/formatters/formatterToday";
import { TypePerson } from "../../../keys/typePerson/typePerson";
import { validationsUserService } from "../../../utils/validationsServices/validationsUserService";

interface IUsersRegisterService {
  name: string;
  cpfCnpj:  string;
  typePerson:  TypePerson
  email: string;
  birthDate: string;
  gender: string;
  phone: string;
  password: string;
  termsUsePlatform?: boolean | null;
  termsUseLGPD?: boolean | null;
  termsPrivacyPolicy?: boolean | null;
  termsReceiptNews?: boolean | null
}

class UsersRegisterService {
  async execute({
    name,
    email,
    cpfCnpj,
    typePerson,
    password,
    birthDate,
    gender,
    phone,
    termsUsePlatform,
    termsUseLGPD,
    termsPrivacyPolicy,
    termsReceiptNews
  }: IUsersRegisterService) {
 
    const verifyValidations = validationsUserService({
      name: name,
      email: email,
      cpfCnpj: cpfCnpj,
      phone: phone,
      birthDate: birthDate,
      gender: gender,
      typePerson: typePerson,
      password: password,
    });
    
    if(verifyValidations){
      return verifyValidations
    };

    const verifyAccountExists = await prismaClient.users.findFirst({
      where: {
        cpfCnpj: cpfCnpj,
      },
    });

    if (verifyAccountExists) {
      return {
        data: {
          message: `Não foi possível realizar está ação, esse ${typePerson === TypePerson.Fisic ? "CPF" : "CNPJ"} está em uso.`,
          status: 403,
        },
      };
    };

    const passwordHash = await hash(password, 8);
    const todayAt = todayWithTime();

    const users = await prismaClient.users.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        cpfCnpj: deformatter(cpfCnpj),
        birthDate: formatterDateToIso(birthDate),
        gender: gender,
        phone: deformatter(phone),
        typePerson: typePerson,
        termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : null,
        termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : null, 
        termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : null,
        termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews : null,
        created_At: todayAt,
      },
      select: {
        id: true,
        created_At: true,
        updated_At: true,
      },
    });

    return users;
  }
}

export { UsersRegisterService };
