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

// src/controllers/Users/Auth/usersRegisterController.ts
var usersRegisterController_exports = {};
__export(usersRegisterController_exports, {
  UsersRegisterController: () => UsersRegisterController
});
module.exports = __toCommonJS(usersRegisterController_exports);

// src/services/Users/Auth/usersRegisterService.ts
var import_bcryptjs = require("bcryptjs");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/desformatter/index.ts
var deformatter = (item) => {
  return item.replace(/\D/g, "");
};

// src/utils/formatters/formatterDate.ts
var import_date_fns = require("date-fns");
var formatterDateToIso = (date) => {
  const dateObject = typeof date === "string" ? (0, import_date_fns.parseISO)(date) : date;
  const formattedBirthDate = (0, import_date_fns.format)(dateObject, "yyyy-MM-dd");
  return formattedBirthDate;
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

// src/services/Users/Auth/usersRegisterService.ts
var UsersRegisterService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      name,
      companyName,
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
    }) {
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
      ;
      const verifyAccountExists = yield prisma_default.users.findFirst({
        where: {
          cpfCnpj
        }
      });
      if (verifyAccountExists) {
        return {
          data: {
            message: `N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, esse ${typePerson === "PF" /* Fisic */ ? "CPF" : "CNPJ"} est\xE1 em uso.`,
            status: 403
          }
        };
      }
      ;
      const passwordHash = yield (0, import_bcryptjs.hash)(password, 8);
      const todayAt = todayWithTime();
      yield prisma_default.users.create({
        data: {
          name,
          companyName: companyName !== null ? companyName : null,
          email,
          password: passwordHash,
          cpfCnpj: deformatter(cpfCnpj),
          birthDate: formatterDateToIso(birthDate),
          gender,
          phone: deformatter(phone),
          typePerson,
          termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : null,
          termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : null,
          termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : null,
          termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews : null,
          created_At: todayAt
        }
      });
      return {
        data: {
          message: "Cadastro realizado com sucesso!",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/Auth/usersRegisterController.ts
var UsersRegisterController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        name,
        companyName,
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
      } = req.body;
      const usersRegister = new UsersRegisterService();
      const responseUsersRegister = yield usersRegister.execute({
        name,
        companyName,
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
      });
      res.status(responseUsersRegister.data.status).json(responseUsersRegister.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersRegisterController
});
//# sourceMappingURL=usersRegisterController.js.map