var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/Users/usersRegisterController.ts
var usersRegisterController_exports = {};
__export(usersRegisterController_exports, {
  UsersRegisterOtherController: () => UsersRegisterOtherController
});
module.exports = __toCommonJS(usersRegisterController_exports);

// src/services/Users/usersRegisterOtherService.ts
var import_bcryptjs = require("bcryptjs");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/formatters/formatterDate.ts
var import_date_fns = require("date-fns");
var formatterDateToIso = (date) => {
  const dateObject = typeof date === "string" ? (0, import_date_fns.parseISO)(date) : date;
  const formattedBirthDate = (0, import_date_fns.format)(dateObject, "yyyy-MM-dd");
  return formattedBirthDate;
};

// src/utils/validators/validatorAge.ts
var validatorAge = (birthDate) => {
  const today2 = /* @__PURE__ */ new Date();
  const birth = new Date(birthDate);
  let age = today2.getFullYear() - birth.getFullYear();
  const monthDiff = today2.getMonth() - birth.getMonth();
  if (monthDiff < 0 || monthDiff === 0 && today2.getDate() < birth.getDate()) {
    age--;
  }
  return age < 18;
};

// src/utils/validators/validatorCNPJ.ts
var validatorCNPJ = (value) => {
  const cnpjRegex = /^\d{14}$/;
  return cnpjRegex.test(value);
};

// src/utils/validators/validatorCPF.ts
var validatorCPF = (value) => {
  const cpfRegex = /^\d{11}$/;
  const isCPF = cpfRegex.test(value);
  return isCPF;
};

// src/utils/validators/validatorDate.ts
var import_date_fns2 = require("date-fns");
var validateBirthDate = (dateString) => {
  const date = (0, import_date_fns2.parseISO)(dateString);
  return (0, import_date_fns2.isValid)(date);
};

// src/utils/validators/validatorEmail.ts
var validatorEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(value);
  return isEmail;
};

// src/utils/validators/validatorFieldsEmpty.ts
var validatorFieldsEmpty = (...fields) => {
  return fields.some((field) => !field || field === "" || field === null);
};

// src/utils/validators/validatorPhone.ts
var isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\d{1,3})(\d{1,4})(\d{6,10})$/;
  const match = phoneRegex.exec(phoneNumber);
  if (!match) return false;
  const countryCode = match[1];
  const areaCode = match[2];
  const number = match[3];
  if (countryCode === "55") {
    const isValidBrazilAreaCode = areaCode.length >= 2 && areaCode.length <= 4;
    const isValidBrazilNumber = number.length >= 8 && number.length <= 9;
    return isValidBrazilAreaCode && isValidBrazilNumber;
  } else {
    const isValidAreaCode = areaCode.length >= 1 && areaCode.length <= 4;
    const isValidNumber = number.length >= 6 && number.length <= 10;
    return isValidAreaCode && isValidNumber;
  }
};

// src/utils/validationsServices/validationsUserService.ts
var validationsUserService = ({
  name,
  companyName,
  email,
  cpfCnpj,
  phone,
  birthDate,
  gender,
  typePerson,
  password
}) => {
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
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha todos os campos obrigat\xF3rios.",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: ["name", "email", "cpf", "phone", "typePerson", "gender"],
        status: 400
      }
    };
  }
  if (!validatorEmail(email)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, E-mail inv\xE1lido.",
        status: 400
      }
    };
  }
  if (!isValidPhoneNumber(phone)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, N\xFAmero de telefone inv\xE1lido.",
        status: 400
      }
    };
  }
  if (password && (password == null ? void 0 : password.length) < 8) {
    return {
      data: {
        message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a.",
        status: 400
      }
    };
  }
  if (password && (password == null ? void 0 : password.length) > 14) {
    return {
      data: {
        message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a. voc\xEA ultrapassou o limite de caracteres",
        status: 400
      }
    };
  }
  if (companyName && typePerson === "PF" /* Fisic */) {
    return {
      data: {
        message: "N\xE3o \xE9 poss\xEDvel cadastrar um nome fantasia para pessoas f\xEDsicas.",
        status: 400
      }
    };
  }
  if (!companyName && typePerson === "PJ" /* Juridic */) {
    return {
      data: {
        message: "N\xE3o \xE9 poss\xEDvel prosseguir. Por favor, informe o nome fantasia da sua empresa.",
        status: 400
      }
    };
  }
  if (typePerson !== "PF" /* Fisic */ && typePerson !== "PJ" /* Juridic */) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, o tipo da pessoa deve ser F\xEDsica ou Jur\xEDdica",
        status: 400
      }
    };
  }
  if (typePerson === "PF" /* Fisic */ && !validatorCPF(cpfCnpj)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, CPF inv\xE1lido. Deve conter 11 d\xEDgitos.",
        status: 400
      }
    };
  }
  if (typePerson === "PJ" /* Juridic */ && !validatorCNPJ(cpfCnpj)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, CNPJ inv\xE1lido. Deve conter 14 d\xEDgitos.",
        status: 400
      }
    };
  }
  if (birthDate && birthDate === "") {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, \xE9 necess\xE1rio informar sua data de nascimento !",
        status: 400
      }
    };
  }
  if (birthDate && !validateBirthDate(birthDate)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, \xC9 necess\xE1rio ter pelo menos 18 anos para se cadastrar!",
        status: 400
      }
    };
  }
  if (birthDate && validatorAge(birthDate)) {
    return {
      data: {
        message: "A a\xE7\xE3o n\xE3o pode ser realizada. \xC9 necess\xE1rio ter pelo menos 18 anos para prosseguir.",
        status: 400
      }
    };
  }
};

// src/utils/formatters/formatterToday.ts
var import_luxon = require("luxon");
var today = /* @__PURE__ */ new Date();
var todayFormatted = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Sao_Paulo"
  // Garante o horário do Brasil
}).format(today).split("/").reverse().join("-");
var todayWithTime = () => {
  const now = import_luxon.DateTime.now().setZone("America/Sao_Paulo");
  return now.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};

// src/utils/desformatter/index.ts
var deformatter = (item) => {
  return item.replace(/\D/g, "");
};

// src/services/Users/usersRegisterOtherService.ts
var import_cloudinary = require("cloudinary");
var import_uuid = require("uuid");
var UsersRegisterOtherService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
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
      status
    }) {
      if (!id_user_logged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o,informe o id do respons\xE1vel",
            status: 400
          }
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
        password: password ? password : null
      });
      if (verifyValidations) {
        return verifyValidations;
      }
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      const userCPFOrCNPJExists = yield prisma_default.users.findFirst({
        where: { cpfCnpj: deformatter(cpfCnpj) }
      });
      const CPFOrCNPJ = userCPFOrCNPJExists.typePerson === "PF" /* Fisic */ ? "CPF" : "CNPJ";
      if (userCPFOrCNPJExists) {
        return {
          data: {
            message: `N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, ${CPFOrCNPJ} j\xE1 est\xE1 em uso`,
            status: 404
          }
        };
      }
      if (!userExistsLogged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 404
          }
        };
      }
      if (userExistsLogged.typeAccess === "client" /* User */ || userExistsLogged.typeAccess === "promoter" /* Promoter */ || userExistsLogged.typeAccess === "worker" /* Worker */) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, sua conta n\xE3o possui permiss\xE3o para est\xE1 a\xE7\xE3o apenas (Master e Admin)",
            status: 404
          }
        };
      }
      const validationError = validationsUserService({
        name,
        companyName,
        email,
        password,
        cpfCnpj,
        phone,
        gender
      });
      if (validationError) {
        return validationError;
      }
      if (password.length < 8) {
        return {
          data: {
            message: "A senha deve ter no m\xEDnimo 8 caracteres para garantir maior seguran\xE7a.",
            status: 401
          }
        };
      }
      try {
        const todayAt = todayWithTime();
        const passwordHash = yield (0, import_bcryptjs.hash)(password, 8);
        const dateRegisteredBy = /* @__PURE__ */ new Date();
        const idProfileAvatar = (0, import_uuid.v6)();
        const resultFile = yield new Promise((resolve, reject) => {
          import_cloudinary.v2.uploader.upload_stream(
            {
              public_id: `users/${idProfileAvatar}`,
              folder: "users"
            },
            (err, result) => {
              if (err) {
                return {
                  message: err,
                  status: 500
                };
              }
              resolve(result);
            }
          ).end(profileAvatar.data);
        });
        const responseRegisterUser = yield prisma_default.users.create({
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
            idProfileAvatar,
            profileAvatar: resultFile.url ? resultFile.url : null,
            profileSocialUrl: profileSocialUrl !== null ? profileSocialUrl : null,
            termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : true,
            termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : true,
            termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews : true,
            termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : true,
            typePerson: typePerson ? typePerson : "PF" /* Fisic */,
            typeAccess: typeAccess ? typeAccess : "client" /* User */,
            registeredBy: (userExistsLogged == null ? void 0 : userExistsLogged.name) ? userExistsLogged == null ? void 0 : userExistsLogged.name : null,
            typeAccessRegisteredBy: (userExistsLogged == null ? void 0 : userExistsLogged.typeAccess) ? userExistsLogged == null ? void 0 : userExistsLogged.typeAccess : null,
            cpfRegisteredBy: (userExistsLogged == null ? void 0 : userExistsLogged.cpfCnpj) ? userExistsLogged == null ? void 0 : userExistsLogged.cpfCnpj : null,
            dateRegisteredBy: dateRegisteredBy ? formatterDateToIso(dateRegisteredBy) : null,
            tutorialFirstAccess: true,
            created_At: todayAt
          }
        });
        return {
          data: {
            id: responseRegisterUser.id,
            message: "Usu\xE1rio cadastrado com sucesso!",
            status: 201
          }
        };
      } catch (err) {
        return {
          data: {
            message: `Erro ao registrar usu\xE1rio: ${err.message}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Users/usersRegisterController.ts
var UsersRegisterOtherController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const {
        name,
        companyName,
        email,
        password,
        cpfCnpj,
        phone,
        birthDate,
        gender,
        street,
        neighborhood,
        complement,
        city,
        cep,
        region_code,
        number_address,
        typeAccess,
        typePerson,
        status,
        termsUsePlatform,
        termsUseLGPD,
        termsPrivacyPolicy,
        termsReceiptNews
      } = req.body;
      const profileAvatar = req.files.profileAvatar;
      const usersRegisterOtherService = new UsersRegisterOtherService();
      const responseRegisterUser = yield usersRegisterOtherService.execute({
        id_user_logged,
        name,
        companyName,
        email,
        password,
        cpfCnpj,
        phone,
        birthDate,
        gender,
        street,
        neighborhood,
        complement,
        city,
        cep,
        region_code,
        number_address,
        typeAccess,
        typePerson,
        status,
        termsUsePlatform,
        termsUseLGPD,
        termsPrivacyPolicy,
        termsReceiptNews,
        profileAvatar
      });
      return res.status(responseRegisterUser.data.status).json(responseRegisterUser.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersRegisterOtherController
});
//# sourceMappingURL=usersRegisterController.js.map