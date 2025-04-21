var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
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
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_express2 = __toESM(require("express"));

// src/routes.ts
var import_express = require("express");

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
var formatterDate = (date) => {
  const formattedBirthDate = (0, import_date_fns.parseISO)(date);
  return formattedBirthDate;
};
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
var todayWithTimeAtFormat = (date) => {
  if (!date) {
    return "";
  }
  const isoString = date instanceof Date ? date.toISOString() : date;
  const [datePart, timePart] = isoString.split("T");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
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
  if (!companyName && typePerson === "PJ" /* Juridic */) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel prosseguir, por favor informe o Nome Fantasia sua Empresa",
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

// src/services/Users/Auth/usersLoginService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var UsersLoginService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ account, password }) {
      if (!account) {
        return {
          data: {
            message: "Por favor, informe seu e-mail, CPF ou CNPJ para continuar.",
            status: 400
          }
        };
      }
      if (!password) {
        return {
          data: {
            message: "Por favor, informe sua senha para continuar.",
            status: 400
          }
        };
      }
      const users = yield prisma_default.users.findFirst({
        where: {
          OR: [
            {
              cpfCnpj: account
            },
            {
              email: account
            }
          ]
        }
      });
      if (!users) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, este E-mail, CPF ou CNPJ n\xE3o existe.",
            status: 404
          }
        };
      }
      const verifyPassword = yield (0, import_bcryptjs2.compare)(password, users.password);
      if (!verifyPassword) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, sua senha est\xE1 incorreta.",
            status: 401
          }
        };
      }
      const token = (0, import_jsonwebtoken.sign)(
        {
          id: users.id,
          name: users.name,
          password: users.password
        },
        process.env.JWT_SECRET,
        {
          subject: users.id,
          expiresIn: "30d"
        }
      );
      return {
        data: {
          message: `Bem Vindo ${users.name.split(" ")[0].charAt(0).toUpperCase()}${users.name.split(" ")[0].slice(1).toLocaleLowerCase()}`,
          token,
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/Auth/usersLoginController.ts
var UsersLoginController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      var _a;
      const { account, password } = req.body;
      const usersLogin = new UsersLoginService();
      const responseUsersLogin = yield usersLogin.execute({
        account,
        password
      });
      return res.status((_a = responseUsersLogin == null ? void 0 : responseUsersLogin.data) == null ? void 0 : _a.status).json(responseUsersLogin == null ? void 0 : responseUsersLogin.data);
    });
  }
};

// src/utils/formatters/formatterCEP.ts
var formatterCEP = (cep) => {
  if (cep) {
    const cleanedCEP = cep.replace(/\D/g, "");
    const formattedCEP = cleanedCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
    return formattedCEP;
  }
  return null;
};

// src/utils/formatters/formatterCNPJ.ts
var formatterCNPJ = (cnpj) => {
  const cleanedCNPJ = cnpj.replace(/\D/g, "");
  const formattedCNPJ = cleanedCNPJ.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d{2})$/, "$1-$2");
  return formattedCNPJ;
};

// src/utils/formatters/formatterCPF.ts
var formatterCPF = (cpf) => {
  const cleanedCPF = cpf.replace(/\D/g, "");
  const formattedCPF = cleanedCPF.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return formattedCPF;
};

// src/services/Users/usersGetDetailsService.ts
var UsersGetDetailsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserLogged }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor informe o (id) do usu\xE1rio.",
            status: 400
          }
        };
      }
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: { id: idUserLogged },
        select: {
          id: true,
          name: true,
          companyName: true,
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
            message: "N\xE3o foi poss\xEDvel realizar a a\xE7\xE3o, o usu\xE1rio respons\xE1vel n\xE3o foi encontrado.",
            status: 404
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: {
            contains: id
          }
        },
        select: {
          id: true,
          name: true,
          companyName: true,
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
          created_At: true
        }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, o usu\xE1rio n\xE3o existe."
          },
          status: 404
        };
      }
      if (userExistsLogged.typeAccess === "admin" /* Admin */) {
        return {
          data: {
            message: "Acesso negado. Administradores n\xE3o podem visualizar dados de contas master.",
            status: 403
          }
        };
      }
      return {
        data: {
          items: __spreadProps(__spreadValues({}, userExists), {
            cpfCnpj: userExists.typePerson === "PF" /* Fisic */ ? formatterCPF(userExists.cpfCnpj) : formatterCNPJ(userExists.cpfCnpj),
            cep: formatterCEP(userExists.cep),
            birthDate: formatterDateToIso(userExists.birthDate)
          }),
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/usersGetDetailsController.ts
var UsersGetDetailsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      var _a;
      const idUserLogged = req.user_id;
      const { id } = req.params;
      const usersGetDetails = new UsersGetDetailsService();
      const responseUsersGetDetails = yield usersGetDetails.execute({
        id,
        idUserLogged
      });
      return res.status((_a = responseUsersGetDetails == null ? void 0 : responseUsersGetDetails.data) == null ? void 0 : _a.status).json(responseUsersGetDetails.data);
    });
  }
};

// src/middlewares/isLogged.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
var isLogged = (req, res, next) => {
  const loggedToken = req.headers.authorization;
  if (!loggedToken) {
    return res.status(401).json({
      status: 401,
      message: "Solicita\xE7\xE3o necessita do token de autentica\xE7\xE3o, fa\xE7a o login."
    }).end();
  }
  const [, token] = loggedToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken2.verify)(token, process.env.JWT_SECRET);
    req.user_id = sub;
    console.log("Verifica\xE7\xE3o de token conclu\xEDda");
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Solicita\xE7\xE3o falhou, ocorreu algum erro na verifica\xE7\xE3o do token."
    }).end();
  }
  return next();
};

// src/utils/validators/validatorPermissions.ts
var validatorPermissions = ({ typeAccess }) => {
  return typeAccess === "owner" /* Owner */ || typeAccess === "developer" /* Developer */ || typeAccess === "master" /* Master */ || typeAccess === "admin" /* Admin */;
};

// src/services/Users/usersDeleteService.ts
var UsersDeleteService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, id_user_logged }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor informe o (id) do usu\xE1rio.",
            status: 400
          }
        };
      }
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      const userExists = yield prisma_default.users.findFirst({
        where: { id }
      });
      const responsePermission = validatorPermissions({
        typeAccess: userExistsLogged.typeAccess
      });
      if (!responsePermission) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para realizar esta a\xE7\xE3o.",
            status: 403
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel deletar, o usu\xE1rio n\xE3o existe.",
            status: 404
          }
        };
      }
      if (userExists.id === id_user_logged && userExistsLogged.typeAccess === "admin" /* Admin */) {
        return {
          data: {
            message: "N\xE3o \xE9 poss\xEDvel como administrador deletar a pr\xF3pria conta, est\xE1 a\xE7\xE3o est\xE1 dispon\xEDvel somente para contas master",
            status: 403
          }
        };
      }
      yield prisma_default.$transaction((tx) => __async(this, null, function* () {
        if (userExists.typeAccess === "promoter" /* Promoter */) {
          yield tx.coupon.updateMany({
            where: { idPromoter: id },
            data: { idPromoter: null, commissionPromoter: null }
          });
        }
        yield tx.couponUsage.deleteMany({ where: { idUserOwner: id } });
        yield tx.coupon.deleteMany({
          where: { idUserOwner: id }
        });
        yield tx.couponUsage.deleteMany({ where: { idUserOwner: id } });
        yield tx.events.deleteMany({ where: { idUserOwner: id } });
        yield tx.methodsPayments.deleteMany({ where: { idUserOwner: id } });
        yield tx.typesCommercials.deleteMany({ where: { idUserOwner: id } });
        yield tx.typesProducts.deleteMany({ where: { idUserOwner: id } });
        yield tx.users.delete({ where: { id } });
        yield tx.categories.deleteMany({ where: { idUserOwner: id } });
        yield tx.commercials.deleteMany({ where: { idUserOwner: id } });
        yield tx.purchases.deleteMany({ where: { idUser: id } });
        yield tx.bin.deleteMany({ where: { idUserOwner: id } });
      }));
      return {
        data: {
          message: "Usu\xE1rio deletado com sucesso!",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/usersDeleteController.ts
var UsersDeleteController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const id_user_logged = req.user_id;
      const usersDelete = new UsersDeleteService();
      const responseUsersDelete = yield usersDelete.execute({
        id,
        id_user_logged
      });
      return res.json(responseUsersDelete);
    });
  }
};

// src/utils/validationsServices/validationsCategories.ts
var validationsCategoriesService = ({
  name,
  icon,
  idUserOwner
}) => {
  if (!idUserOwner) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o id do usu\xE1rio respons\xE1vel",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400
      }
    };
  }
  if (!name) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome da categoria.",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400
      }
    };
  }
  if (!icon) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor envie um icone para prosseguir",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400
      }
    };
  }
};

// src/services/Categories/categoriesRegisterService.ts
var import_cloudinary = require("cloudinary");
var import_uuid = require("uuid");
var CategoriesRegisterService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      idUserOwner,
      name,
      label,
      icon,
      themeImageUrl
    }) {
      const validationsCategories = validationsCategoriesService({
        idUserOwner,
        name,
        icon
      });
      if (validationsCategories) {
        return validationsCategories;
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const categoryExists = yield prisma_default.categories.findFirst({
        where: {
          name
        }
      });
      if (categoryExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, est\xE1 categoria j\xE1 existe",
            status: 403
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, est\xE1 usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 403
          }
        };
      }
      try {
        const iconId = (0, import_uuid.v6)();
        const idThemeImageUrl = (0, import_uuid.v6)();
        const resultFile = yield new Promise((resolve2, reject) => {
          import_cloudinary.v2.uploader.upload_stream({
            public_id: `icons/${iconId}`,
            folder: "icons"
          }, (err, result) => {
            if (err) {
              return {
                data: {
                  message: err,
                  status: 500
                }
              };
            }
            resolve2(result);
          }).end(icon.data);
        });
        const resultThemeImageUrl = yield new Promise((resolve2) => {
          import_cloudinary.v2.uploader.upload_stream({
            public_id: `themesCategories/${idThemeImageUrl}`,
            folder: "themesCategories"
          }, (err, result) => {
            if (err) {
              return {
                data: {
                  message: err,
                  status: 500
                }
              };
            }
            resolve2(result);
          }).end(themeImageUrl.data);
        });
        yield prisma_default.categories.create({
          data: {
            idUserOwner,
            name,
            label: label ? label : null,
            idIcon: iconId,
            icon: resultFile.url ? resultFile.url : null,
            idThemeImageUrl,
            themeImageUrl: resultThemeImageUrl.url ? resultThemeImageUrl.url : null
          }
        });
        return {
          data: {
            message: "Cadastro realizado com sucesso" /* RegisterMessageSuccess */,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante o cadastro" /* RegisterMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Categories/categoriesRegisterController.ts
var CategoriesRegisterController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const { name, label } = req.body;
      const icon = req.files.icon;
      const themeImageUrl = req.files.themeImageUrl;
      const categoriesRegister = new CategoriesRegisterService();
      const responseCategoriesRegister = yield categoriesRegister.execute({
        idUserOwner: id_user_logged,
        name,
        label,
        icon,
        themeImageUrl
      });
      return res.status(responseCategoriesRegister.data.status).json(responseCategoriesRegister.data);
    });
  }
};

// src/services/Categories/categoriesGetAllService.ts
var CategoriesGetAllService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, label, page, limit }) {
      try {
        const where = "";
        if (name) where.name = { contains: name, mode: "insensitive" };
        if (label) where.label = { contains: label, mode: "insensitive" };
        const shouldPaginate = page !== void 0 || limit !== void 0;
        const skip = shouldPaginate ? ((page != null ? page : 1) - 1) * (limit != null ? limit : 10) : void 0;
        const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
        const categories = yield prisma_default.categories.findMany({
          where,
          skip,
          take,
          orderBy: { created_At: "desc" }
        });
        const totalCategories = yield prisma_default.categories.count();
        const totalPages = shouldPaginate ? Math.ceil(totalCategories / (limit != null ? limit : 10)) : 1;
        return {
          items: categories,
          totalItems: totalCategories,
          totalPages,
          currentPage: shouldPaginate ? page != null ? page : 1 : 1,
          status: 200
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca por todos os itens" /* GetAllMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Categories/categoriesGetAllController.ts
var CategoriesGetAllController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        label,
        limit,
        name,
        page
      } = req.body;
      const categoriesGetAllController = new CategoriesGetAllService();
      const responseCategoriesGetAllController = yield categoriesGetAllController.execute({
        label,
        limit,
        name,
        page
      });
      return res.json(responseCategoriesGetAllController);
    });
  }
};

// src/services/Categories/categoriesGetDetailsService.ts
var CategoriesGetDetailsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner
    }) {
      try {
        if (!id) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id da categoria para prosseguir",
              status: 400
            }
          };
        }
        if (!idUserOwner) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id do respons\xE1vel para prosseguir",
              status: 400
            }
          };
        }
        const userExists = yield prisma_default.users.findFirst({
          where: {
            id: idUserOwner
          }
        });
        const categoryExists = yield prisma_default.categories.findFirst({
          where: {
            id,
            idUserOwner
          }
        });
        if (!userExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, esse usu\xE1rio respons\xE1vel n\xE3o existe",
              status: 404
            }
          };
        }
        if (!categoryExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, essa categoria n\xE3o existe",
              status: 404
            }
          };
        }
        return {
          data: {
            item: categoryExists,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca pelo detalhamento" /* GetDetailsMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Categories/categoriesGetDetailsController.ts
var CategoriesGetDetailsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const categoriesGetDetails = new CategoriesGetDetailsService();
      const responseCategoriesGetDetails = yield categoriesGetDetails.execute({ id });
      return res.status(responseCategoriesGetDetails.data.status).json(responseCategoriesGetDetails.data);
    });
  }
};

// src/services/Categories/categoriesEditService.ts
var import_cloudinary2 = require("cloudinary");
var CategoriesEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner,
      name,
      label,
      icon,
      themeImageUrl
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envie o id da categoria para prosseguir.",
            status: 400
          }
        };
      }
      const validationsCategories = validationsCategoriesService({
        idUserOwner,
        name,
        icon
      });
      if (validationsCategories) {
        return validationsCategories;
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const categoryExists = yield prisma_default.categories.findFirst({
        where: {
          id
        }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, o usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 404
          }
        };
      }
      if (!categoryExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, essa categoria n\xE3o existe",
            status: 404
          }
        };
      }
      try {
        let idIcon = categoryExists.idIcon;
        let idThemeImageUrl = categoryExists.idThemeImageUrl;
        const resultFile = yield new Promise(
          (resolve2, reject) => {
            import_cloudinary2.v2.uploader.upload_stream(
              {
                public_id: `icons/${idIcon}`,
                overwrite: true,
                folder: "icons"
              },
              (err, result) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve2(result);
              }
            ).end(icon.data);
          }
        );
        const resultThemeImageUrl = yield new Promise((resolve2) => {
          import_cloudinary2.v2.uploader.upload_stream({
            public_id: `themesCategories/${idThemeImageUrl}`,
            folder: "themesCategories"
          }, (err, result) => {
            if (err) {
              return {
                data: {
                  message: err,
                  status: 500
                }
              };
            }
            resolve2(result);
          }).end(themeImageUrl.data);
        });
        yield prisma_default.categories.update({
          where: {
            id
          },
          data: {
            name,
            label,
            icon: resultFile.url ? resultFile.url : null,
            themeImageUrl: resultThemeImageUrl.url ? resultThemeImageUrl.url : null
          }
        });
        return {
          data: {
            message: "Atualiza\xE7\xE3o realizada com sucesso" /* UpdateMessageSuccess */,
            status: 500
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a atualiza\xE7\xE3o" /* UpdateMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Categories/categoriesEditController.ts
var CategoriesEditController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id,
        idUserOwner,
        name,
        label
      } = req.body;
      const icon = req.files.icon;
      const themeImageUrl = req.files.themeImageUrl;
      const categoriesEditController = new CategoriesEditService();
      const responseCategoriesEditController = yield categoriesEditController.execute({
        id,
        idUserOwner,
        name,
        label,
        icon,
        themeImageUrl
      });
      return res.status(responseCategoriesEditController.data.status).json(responseCategoriesEditController.data);
    });
  }
};

// src/services/Bin/binRegisterMoveItemsService.ts
var BinRegisterMoveItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner, tableName }) {
      if (!idUserOwner) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, Informe o ID do respons\xE1vel",
            status: 400
          }
        };
      }
      if (!id || !tableName) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, Informe o ID e o nome da tabela",
            status: 400
          }
        };
      }
      const item = yield prisma_default.$queryRawUnsafe(`SELECT * FROM ${tableName} WHERE id = '${id}'`);
      try {
        yield prisma_default.bin.create({
          data: {
            tableName,
            itemId: id,
            idUserOwner,
            data: JSON.stringify(item)
          }
        });
        yield prisma_default.$executeRawUnsafe(`DELETE FROM ${tableName} WHERE id = '${id}'`);
        return {
          data: {
            message: `Item movido para a lixeira com sucesso`,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `Ocorreu um erro ao mover item para a lixeira ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/services/Categories/categoriesDeleteService.ts
var CategoriesDeleteService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor informe o id da categoria",
            status: 400
          }
        };
      }
      const categoriesExists = yield prisma_default.categories.findFirst({ where: { id } });
      if (!categoriesExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, essa categoria n\xE3o existe",
            status: 404
          }
        };
      }
      const binRegisterItemsService = new BinRegisterMoveItemsService();
      const deletarCategoriasId = yield binRegisterItemsService.execute({
        id,
        tableName: "categories",
        idUserOwner: categoriesExists.idUserOwner
      });
      return {
        data: {
          message: deletarCategoriasId.data.message,
          status: deletarCategoriasId.data.status
        }
      };
    });
  }
};

// src/controllers/Categories/categoriesDeleteController.ts
var CategoriesDeleteController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const categoriesDelete = new CategoriesDeleteService();
      const responseCategoriesDelete = yield categoriesDelete.execute({ id });
      return res.status(responseCategoriesDelete.data.status).json(responseCategoriesDelete.data);
    });
  }
};

// src/services/Events/cadastrarEventoService.ts
var CadastrarEventoService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      idUserOwner,
      idProduct,
      idCategory,
      name,
      description,
      localityEvent,
      urlLocalityEvent,
      bannerImageUrl,
      dateEvent,
      hourEvent,
      restrictionsEvent,
      placesPurchaseTicket,
      urlPostSocialNetwork,
      phoneForContact
    }) {
      const eventoExiste = yield prisma_default.events.findFirst({
        where: {
          name
        }
      });
      if (eventoExiste) {
        return {
          message: "Essa evento j\xE1 existe",
          status: 400
        };
      }
      const cadastrarEvento = yield prisma_default.events.create({
        data: {
          idUserOwner,
          name,
          description,
          idProduct,
          idCategory,
          localityEvent,
          urlLocalityEvent,
          bannerImageUrl,
          dateEvent,
          hourEvent,
          restrictionsEvent,
          placesPurchaseTicket,
          urlPostSocialNetwork,
          phoneForContact
        }
      });
      return cadastrarEvento;
    });
  }
};

// src/controllers/Events/cadastrarEventoController.ts
var import_cloudinary3 = require("cloudinary");
import_cloudinary3.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var CadastrarEventoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.url;
      const {
        idProduct,
        idCategory,
        name,
        description,
        localityEvent,
        urlLocalityEvent,
        bannerImageUrl,
        dateEvent,
        hourEvent,
        restrictionsEvent,
        placesPurchaseTicket,
        urlPostSocialNetwork,
        phoneForContact
      } = req.body;
      const cadastrarEvento = new CadastrarEventoService();
      const file = req.files["bannerEvento"];
      if (Array.isArray(file)) {
        throw new Error("Only one file is allowed for 'bannerEvento'");
      } else {
        const resultFile = yield new Promise((resolve2, reject) => {
          import_cloudinary3.v2.uploader.upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
            }
            resolve2(result);
          }).end(file.data);
        });
        const eventoCadastrado = yield cadastrarEvento.execute({
          idUserOwner: id_user_logged,
          idProduct,
          idCategory,
          name,
          description,
          localityEvent,
          urlLocalityEvent,
          bannerImageUrl,
          dateEvent,
          hourEvent,
          restrictionsEvent,
          placesPurchaseTicket,
          urlPostSocialNetwork,
          phoneForContact
        });
        if (eventoCadastrado.status === 403) {
          return res.status(403).json(eventoCadastrado);
        }
        return res.json(eventoCadastrado);
      }
    });
  }
};

// src/services/Events/listarTodosEventosService.ts
var ListarTodosEventosService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ nome }) {
      const listarTodosEventos = yield prisma_default.events.findMany({
        where: {
          name: {
            contains: nome,
            mode: "insensitive"
          }
        },
        include: {
          categories: true
        }
      });
      return listarTodosEventos;
    });
  }
};

// src/controllers/Events/listarTodosEventosController.ts
var ListarTodosEventosController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const nome = req.query.nome;
      const listarTodosEventos = new ListarTodosEventosService();
      const listarEventos = yield listarTodosEventos.execute({ nome });
      return res.json(listarEventos);
    });
  }
};

// src/services/Events/listarEventoIdService.ts
var ListarEventoIdService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      const listarEventoId = yield prisma_default.events.findFirst({
        where: {
          id
        },
        include: {
          categories: true
        }
      });
      return listarEventoId;
    });
  }
};

// src/controllers/Events/listarEventoIdController.ts
var ListarEventoIdController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const listarEventoId = new ListarEventoIdService();
      const listarEvento = yield listarEventoId.execute({ id });
      return res.json(listarEvento);
    });
  }
};

// src/routes.ts
var import_multer2 = __toESM(require("multer"));

// src/config/multer.ts
var import_crypto = __toESM(require("crypto"));
var import_multer = __toESM(require("multer"));
var import_path = require("path");
var multer_default = {
  upload(folder) {
    return {
      storage: import_multer.default.diskStorage({
        destination: (0, import_path.resolve)(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = import_crypto.default.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        }
      })
    };
  }
};

// src/services/Events/editarEventoService.ts
var EditarEventosService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner,
      idProduct,
      name,
      description,
      localityEvent,
      urlLocalityEvent,
      bannerImageUrl,
      dateEvent,
      hourEvent,
      idCategory,
      restrictionsEvent,
      placesPurchaseTicket,
      urlPostSocialNetwork,
      phoneForContact,
      status
    }) {
      const editar = yield prisma_default.events.update({
        where: {
          id
        },
        data: {
          name,
          description,
          idProduct,
          idCategory,
          localityEvent,
          urlLocalityEvent,
          bannerImageUrl: "",
          // aqui vai a url do evento,
          dateEvent,
          hourEvent,
          restrictionsEvent,
          placesPurchaseTicket,
          urlPostSocialNetwork,
          phoneForContact,
          status: status ? status : true
        }
      });
      return editar;
    });
  }
};

// src/controllers/Events/editarEventoController.ts
var EditarEventoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.url;
      const {
        id,
        idProduct,
        idCategory,
        name,
        description,
        localityEvent,
        urlLocalityEvent,
        bannerImageUrl,
        dateEvent,
        hourEvent,
        restrictionsEvent,
        placesPurchaseTicket,
        urlPostSocialNetwork,
        phoneForContact
      } = req.body;
      const editarEvento = new EditarEventosService();
      const eventoEditado = yield editarEvento.execute({
        id,
        idUserOwner: id_user_logged,
        idProduct,
        idCategory,
        name,
        description,
        localityEvent,
        urlLocalityEvent,
        bannerImageUrl,
        dateEvent,
        hourEvent,
        restrictionsEvent,
        placesPurchaseTicket,
        urlPostSocialNetwork,
        phoneForContact
      });
      return res.json(eventoEditado);
    });
  }
};

// src/services/Events/deletarEventoService.ts
var DeletarEventoService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      const deletarEvento = yield prisma_default.events.delete({
        where: {
          id
        }
      });
      return {
        message: `Evento deletado com sucesso`,
        evento: deletarEvento.id,
        status: 200
      };
    });
  }
};

// src/controllers/Events/deletarEventoController.ts
var DeletarEventoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const deletarEvento = new DeletarEventoService();
      const eventoDeletado = yield deletarEvento.execute({ id });
      return res.json(eventoDeletado);
    });
  }
};

// src/services/Users/usersEditService.ts
var import_bcryptjs3 = require("bcryptjs");
var import_cloudinary4 = require("cloudinary");
var UsersEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      id_user_logged,
      complement,
      street,
      termsReceiptNews,
      typePerson,
      name,
      companyName,
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
      status
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe o (id) do usu\xE1rio.",
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
      const isUserLogged = id === id_user_logged;
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      if (!userExistsLogged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar a a\xE7\xE3o, o usu\xE1rio respons\xE1vel n\xE3o foi encontrado.",
            status: 404
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: { id }
      });
      const userEmailExists = yield prisma_default.users.findFirst({
        where: { email, NOT: { id } }
      });
      const userCPFOrCNPJExists = yield prisma_default.users.findFirst({
        where: { cpfCnpj, NOT: { id, cpfCnpj } }
      });
      const CPFOrCNPJ = (userCPFOrCNPJExists == null ? void 0 : userCPFOrCNPJExists.typePerson) === "PF" /* Fisic */ ? "CPF" : "CNPJ";
      const validationPermission = validatorPermissions({
        typeAccess: userExistsLogged.typeAccess || ""
      });
      if (id !== id_user_logged && !validationPermission) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para realizar esta a\xE7\xE3o, sua conta pode editar apenas o seus dados.",
            status: 403
          }
        };
      }
      if (userExists !== null && !userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar o esta a\xE7\xE3o, o usu\xE1rio n\xE3o existe.",
            status: 400
          }
        };
      }
      if (email && userEmailExists) {
        return {
          data: {
            message: `N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, esse e-mail est\xE1 em uso.`,
            status: 400
          }
        };
      }
      if (cpfCnpj && userCPFOrCNPJExists) {
        return {
          data: {
            message: `N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, esse ${CPFOrCNPJ} est\xE1 em uso.`,
            status: 400
          }
        };
      }
      if (password && password.length < 8) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a.",
            status: 401
          }
        };
      }
      if (password && password.length > 14) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a. voc\xEA ultrapassou o limite de caracteres",
            status: 401
          }
        };
      }
      const todayAt = todayWithTime();
      if (password && (password == null ? void 0 : password.length) < 8) {
        return {
          data: {
            message: "A senha deve ter no m\xEDnimo 8 caracteres para garantir maior seguran\xE7a.",
            status: 401
          }
        };
      }
      if (password && password.length > 14) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a. voc\xEA ultrapassou o limite de caracteres",
            status: 401
          }
        };
      }
      if (typeAccess && (userExistsLogged.typeAccess === "client" /* User */ || userExistsLogged.typeAccess === "promoter" /* Promoter */ || userExistsLogged.typeAccess === "worker" /* Worker */)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, sua conta n\xE3o tem permiss\xE3o para alterar o status do usu\xE1rio",
            status: 403
          }
        };
      }
      if (status && (userExistsLogged.typeAccess === "client" /* User */ || userExistsLogged.typeAccess === "promoter" /* Promoter */ || userExistsLogged.typeAccess === "worker" /* Worker */)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, sua conta n\xE3o tem permiss\xE3o para alterar o status do usu\xE1rio",
            status: 403
          }
        };
      }
      try {
        let idProfileAvatar = isUserLogged ? userExistsLogged.idProfileAvatar : userExists.idProfileAvatar;
        const resultFile = yield new Promise(
          (resolve2, reject) => {
            import_cloudinary4.v2.uploader.upload_stream(
              {
                public_id: `users/${idProfileAvatar}`,
                overwrite: true,
                folder: "users"
              },
              (err, result) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve2(result);
              }
            ).end(profileAvatar.data);
          }
        );
        const profileAvatarUpdated = resultFile.secure_url;
        const updateUser = (user, isLoggedUser = false) => __async(this, null, function* () {
          var _a, _b, _c;
          return yield prisma_default.users.update({
            where: { id: isLoggedUser ? id_user_logged : id },
            data: {
              name: name ? name : null,
              companyName: companyName !== null ? companyName : null,
              email: email ? email : null,
              password: password ? yield (0, import_bcryptjs3.hash)(password, 8) : user.password,
              cpfCnpj: cpfCnpj ? deformatter(cpfCnpj) : null,
              phone: phone ? deformatter(phone) : null,
              birthDate: birthDate ? formatterDateToIso(birthDate) : null,
              street: street ? street : null,
              complement: complement ? complement : null,
              profileAvatar: profileAvatarUpdated,
              // Será atualizado pelo controller
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
              termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : user.termsPrivacyPolicy,
              status: status !== null && userExistsLogged.typeAccess !== "client" /* User */ ? status : user.status,
              updated_At: todayAt,
              editedBy: (_a = userExistsLogged == null ? void 0 : userExistsLogged.name) != null ? _a : null,
              typeAccessEditedBy: (_b = userExistsLogged == null ? void 0 : userExistsLogged.typeAccess) != null ? _b : null,
              cpfEditedBy: (_c = userExistsLogged == null ? void 0 : userExistsLogged.cpfCnpj) != null ? _c : null,
              dateEditedBy: todayAt != null ? todayAt : null
            }
          });
        });
        if (isUserLogged) {
          yield updateUser(userExistsLogged, true);
          return {
            data: {
              message: "Sua conta foi atualizada com sucesso!",
              status: 200
            }
          };
        } else {
          yield updateUser(userExists);
          return {
            data: {
              message: "Usu\xE1rio atualizado com sucesso!",
              status: 200
            }
          };
        }
      } catch (err) {
        return {
          data: {
            message: `Erro ao atualizar usu\xE1rio: ${err.message}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Users/usersEditController.ts
var UsersEditController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      var _a, _b;
      const id_user_logged = req.user_id;
      const {
        id,
        name,
        companyName,
        email,
        password,
        cpfCnpj,
        typePerson,
        birthDate,
        phone,
        gender,
        complement,
        street,
        city,
        cep,
        region_code,
        number_address,
        neighborhood,
        profileSocialUrl,
        status
      } = req.body;
      const profileAvatar = req.files.profileAvatar;
      const usersEdit = new UsersEditService();
      const responseEdit = yield usersEdit.execute(__spreadValues({
        id,
        id_user_logged,
        name,
        companyName,
        email,
        password,
        cpfCnpj,
        typePerson,
        birthDate,
        phone,
        gender,
        complement,
        street,
        city,
        cep,
        region_code,
        number_address,
        neighborhood,
        profileSocialUrl,
        profileAvatar
      }, status !== null && { status: status !== "false" ? true : false }));
      res.status((_a = responseEdit == null ? void 0 : responseEdit.data) == null ? void 0 : _a.status).json((_b = responseEdit == null ? void 0 : responseEdit.data) == null ? void 0 : _b.message);
    });
  }
};

// src/services/Users/usersGetAllSevice.ts
var UsersGetAllService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id_user_logged,
      idOtherUser,
      name,
      companyName,
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
      limit
    }) {
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: { id: id_user_logged }
      });
      if (!userExistsLogged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar a a\xE7\xE3o, o usu\xE1rio respons\xE1vel n\xE3o foi encontrado.",
            status: 404
          }
        };
      }
      const responseValidation = validatorPermissions({
        typeAccess: userExistsLogged.typeAccess
      });
      if (!responseValidation) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para realizar esta a\xE7\xE3o.",
            status: 403
          }
        };
      }
      if (typeAccess && userExistsLogged.typeAccess === "client" /* User */ || userExistsLogged.typeAccess === "promoter" /* Promoter */) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para buscar pelos par\xE2metros de tipo do usu\xE1rio",
            status: 403
          }
        };
      }
      const where = { id: { not: id_user_logged } };
      if ((userExistsLogged == null ? void 0 : userExistsLogged.typeAccess) === "owner" /* Owner */ || (userExistsLogged == null ? void 0 : userExistsLogged.typeAccess) === "developer" /* Developer */) {
        where.typeAccess = { contains: typeAccess, mode: "insensitive" };
      }
      if (userExistsLogged.typeAccess === "master" /* Master */) {
        where.typeAccess = {
          notIn: ["master" /* Master */, "owner" /* Owner */, "developer" /* Developer */]
        };
      }
      if (userExistsLogged.typeAccess === "admin" /* Admin */) {
        where.typeAccess = {
          notIn: [
            "admin" /* Admin */,
            "master" /* Master */,
            "owner" /* Owner */,
            "developer" /* Developer */
          ]
        };
      } else if (userExistsLogged.typeAccess === "worker" /* Worker */) {
        where.typeAccess = {
          notIn: [
            "admin" /* Admin */,
            "owner" /* Owner */,
            "developer" /* Developer */,
            "master" /* Master */,
            "worker" /* Worker */
          ]
        };
      }
      if (idOtherUser) where.id = { contains: idOtherUser, mode: "insensitive" };
      if (name)
        where.name = {
          contains: name,
          mode: "insensitive"
        };
      if (companyName)
        where.companyName = {
          contains: companyName,
          mode: "insensitive"
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
      const shouldPaginate = page !== void 0 || limit !== void 0;
      const skip = shouldPaginate ? ((page != null ? page : 1) - 1) * (limit != null ? limit : 10) : void 0;
      const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
      const users = yield prisma_default.users.findMany({
        where,
        skip,
        take,
        orderBy: { created_At: "desc" },
        select: {
          id: true,
          idPlan: true,
          name: true,
          companyName: true,
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
          profileAvatar: true,
          // essa é a logo que o usuário ira enviar apenas a url do banco de fotos
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
          // para quando o admin ou master cadastrar um novo cliente saber quem cadastrou esse novo usuário
          cpfEditedBy: true,
          dateEditedBy: true,
          tutorialFirstAccess: true,
          status: true,
          planSubscription: true,
          created_At: true,
          updated_At: true
        }
      });
      const totalUsers = yield prisma_default.users.count({ where });
      const totalPages = shouldPaginate ? Math.ceil(totalUsers / (limit != null ? limit : 10)) : 1;
      const formattedUsers = users.map((user) => __spreadProps(__spreadValues({}, user), {
        cpfCnpj: user.typePerson === "PF" /* Fisic */ ? formatterCPF(user.cpfCnpj) : formatterCNPJ(user.cpfCnpj),
        cep: formatterCEP(user.cep),
        birthDate: user.birthDate ? formatterDateToIso(user.birthDate) : null
      }));
      return {
        data: {
          items: formattedUsers,
          totalItems: totalUsers,
          totalPages,
          currentPage: shouldPaginate ? page != null ? page : 1 : 1,
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/usersGetAllController.ts
var UsersGetAllController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const idOtherUser = req.query.idOtherUser;
      const name = req.query.name;
      const companyName = req.query.companyName;
      const email = req.query.email;
      const cpfCnpj = req.query.cpfCnpj;
      const phone = req.query.phone;
      const birthDate = req.query.birthDate;
      const gender = req.query.gender;
      const typePerson = req.query.typePerson;
      const city = req.query.city;
      const street = req.query.street;
      const neighborhood = req.query.neighborhood;
      const complement = req.query.complement;
      const cep = req.query.cep;
      const number_address = req.query.number_address;
      const region_code = req.query.region_code;
      const typeAccess = req.query.typeAccess;
      const status = req.query.status;
      const page = req.query.page;
      const limit = req.query.limit;
      const usersGetAll = new UsersGetAllService();
      const responseUsersGetAll = yield usersGetAll.execute(__spreadProps(__spreadValues({
        id_user_logged,
        idOtherUser,
        name,
        companyName,
        email,
        cpfCnpj,
        phone,
        birthDate,
        gender,
        typeAccess,
        typePerson,
        city,
        street,
        neighborhood,
        complement,
        cep,
        number_address,
        region_code
      }, status !== null && { status: status !== "false" ? true : false }), {
        page: Number(page),
        limit: Number(limit)
      }));
      return res.status(responseUsersGetAll.data.status).json(responseUsersGetAll.data);
    });
  }
};

// src/utils/validationsServices/validationsProducts.ts
var validationsProductsService = ({
  name,
  idUserOwner,
  description,
  allowAddCoupon,
  available,
  idCategory,
  idTypeProduct,
  price
}) => {
  if (!idUserOwner) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o id do usu\xE1rio respons\xE1vel",
        status: 400
      }
    };
  }
  if (!idCategory) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe a categoria do produto",
        status: 400
      }
    };
  }
  if (!idTypeProduct) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o tipo do produto",
        status: 400
      }
    };
  }
  if (available === null) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe se o produto est\xE1 dispon\xEDvel para venda",
        status: 400
      }
    };
  }
  if (allowAddCoupon === null) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe se pode haver uso de cupom para os produtos",
        status: 400
      }
    };
  }
  if (!name) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome do produto.",
        status: 400
      }
    };
  }
  if (!description) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe a descri\xE7\xE3o do produto",
        status: 400
      }
    };
  }
  if (!price) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe pre\xE7o do produto",
        status: 400
      }
    };
  }
};

// src/services/Products/productsRegisterService.ts
var ProductsRegisterService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      name,
      allowAddCoupon,
      available,
      description,
      expirationDate,
      idCategory,
      idTypeProduct,
      idUserOwner,
      labelPrice,
      positionOrder,
      price
    }) {
      const validationsProducts = validationsProductsService({
        name,
        idUserOwner,
        idCategory,
        idTypeProduct,
        description,
        price,
        allowAddCoupon,
        available
      });
      if (validationsProducts) {
        return validationsProducts;
      }
      const productExists = yield prisma_default.products.findFirst({
        where: {
          name
        }
      });
      if (productExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse produto j\xE1 existe"
          }
        };
      }
      const categoryExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idCategory
        }
      });
      const typesProductsExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idTypeProduct
        }
      });
      const userExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idUserOwner
        }
      });
      if (!categoryExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse categoria n\xE3o existe"
          }
        };
      }
      if (!typesProductsExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse tipo do produto n\xE3o existe"
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse usu\xE1rio n\xE3o existe"
          }
        };
      }
      try {
        const todayAt = todayWithTimeAtFormat(/* @__PURE__ */ new Date());
        yield prisma_default.products.create({
          data: {
            name,
            allowAddCoupon: allowAddCoupon !== null ? allowAddCoupon : null,
            available: available !== null ? available : null,
            description,
            expirationDate: expirationDate ? expirationDate : null,
            idCategory,
            idTypeProduct,
            idUserOwner,
            labelPrice,
            dateRegistered: todayAt,
            positionOrder: positionOrder ? positionOrder : null,
            price: price ? price : null
          }
        });
        return {
          data: {
            message: "Cadastro realizado com sucesso" /* RegisterMessageSuccess */,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante o cadastro" /* RegisterMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Products/productsRegisterController.ts
var ProductRegisterController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        name,
        description,
        expirationDate,
        idCategory,
        idTypeProduct,
        price,
        allowAddCoupon,
        available,
        labelPrice,
        positionOrder
      } = req.body;
      const idUserOwner = req.user_id;
      const productsRegister = new ProductsRegisterService();
      const responseProductsRegister = yield productsRegister.execute({
        name,
        description,
        expirationDate,
        idCategory,
        idTypeProduct,
        idUserOwner,
        labelPrice,
        positionOrder,
        price,
        allowAddCoupon,
        available
      });
      return res.status(responseProductsRegister.data.status).json(responseProductsRegister.data);
    });
  }
};

// src/services/Products/productsGetAllService.ts
var ProductsGetAllService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      available,
      idTypeProduct,
      idUserLogged,
      idUserOwner,
      name,
      status,
      page,
      limit
    }) {
      const userIDSend = idUserLogged != null ? idUserLogged : idUserOwner;
      const userExists = yield prisma_default.users.findFirst({
        where: { id: idUserOwner != null ? idUserOwner : idUserLogged }
      });
      const typesProductsExists = yield prisma_default.products.findFirst({
        where: {
          id: idTypeProduct
        }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, este usu\xE1rio n\xE3o existe!",
            status: 404
          }
        };
      }
      if (!typesProductsExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, o tipo do produto n\xE3o existe!",
            status: 404
          }
        };
      }
      const where = {};
      if (name)
        where.id = {
          contains: name,
          mode: "insensitive"
        };
      if (userIDSend) {
        where.idUserOwner = {
          contains: userIDSend,
          mode: "insensitive"
        };
      }
      if (idTypeProduct)
        where.idTypeProduct = { contains: idTypeProduct, mode: "insensitive" };
      if (available)
        where.available = { contains: available, mode: "insensitive" };
      if (status !== null)
        where.status = {
          contains: status
        };
      try {
        const shouldPaginate = page !== void 0 || limit !== void 0;
        const skip = shouldPaginate ? ((page != null ? page : 1) - 1) * (limit != null ? limit : 10) : void 0;
        const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
        const products = yield prisma_default.products.findMany({
          where,
          skip,
          take
        });
        const totalProducts = yield prisma_default.products.count({ where });
        const totalPages = shouldPaginate ? Math.ceil(totalProducts / (limit != null ? limit : 10)) : 1;
        return {
          data: {
            items: products,
            totalItems: totalProducts,
            totalPages,
            currentPage: shouldPaginate ? page != null ? page : 1 : 1,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: "Ocorreu um error durante a busca por todos os itens" /* GetAllMessageError */,
            error: err == null ? void 0 : err.message,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Products/productsGetAllController.ts
var ProductGetAllController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const name = req.query.name;
      const page = req.query.page;
      const limit = req.query.limit;
      const idUserLogged = req.query.idUserLogged;
      const idUserOwner = req.query.idUserOwner;
      const idTypeProduct = req.query.idTypeProduct;
      const available = req.query.available;
      const status = req.query.status;
      const productGetAll = new ProductsGetAllService();
      const responseProductGetAll = yield productGetAll.execute(__spreadValues({
        available,
        idTypeProduct,
        idUserLogged,
        idUserOwner,
        limit: Number(limit),
        name,
        page: Number(page)
      }, status !== null && { status: status !== "false" ? true : false }));
      return res.status(responseProductGetAll.data.status).json(responseProductGetAll.data);
    });
  }
};

// src/services/Products/productsDeleteService.ts
var ProductsDeleteService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id do comercial para prosseguir",
            status: 403
          }
        };
      }
      if (!idUserOwner) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envie o id do respons\xE1vel",
            status: 403
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const commercialsExists = yield prisma_default.products.findFirst({
        where: {
          id,
          idUserOwner
        }
      });
      if (!commercialsExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, este produto n\xE3o existe",
            status: 403
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, est\xE1 usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 403
          }
        };
      }
      try {
        const binRegisterItemsService = new BinRegisterMoveItemsService();
        const responseDelete = yield binRegisterItemsService.execute({
          id,
          tableName: "commercials",
          idUserOwner: commercialsExists.idUserOwner
        });
        return {
          data: {
            message: responseDelete.data.message,
            status: responseDelete.data.status
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a exclus\xE3o" /* DeleteMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Products/productDeleteController.ts
var ProductsDeleteController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const idUserOwner = req.user_id;
      const productsDelete = new ProductsDeleteService();
      const responseProductsDelete = yield productsDelete.execute({ id, idUserOwner });
      return res.status(responseProductsDelete.data.status).json(responseProductsDelete.data);
    });
  }
};

// src/services/Products/productsGetDetailsSevice.ts
var ProductsGetDetailsSevice = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserLogged,
      idUserOwner
    }) {
      const userIDSend = idUserLogged != null ? idUserLogged : idUserOwner;
      const products = yield prisma_default.products.findFirst({
        where: {
          id,
          idUserOwner: userIDSend
        }
      });
      if (!products) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, o produto n\xE3o existe!",
            status: 404
          }
        };
      }
      try {
        return {
          data: {
            items: products,
            status: 200
          }
        };
      } catch (error) {
        return {
          data: {
            message: "Ocorreu um error durante a busca pelo detalhamento" /* GetDetailsMessageError */,
            error: error == null ? void 0 : error.message,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Products/productsGetDetailsController.ts
var ProductGetDetailsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const productsGetDetails = new ProductsGetDetailsSevice();
      const responseProductsGetDetails = yield productsGetDetails.execute({ id });
      return res.status(responseProductsGetDetails.data.status).json(responseProductsGetDetails.data);
    });
  }
};

// src/services/Products/productEditService.ts
var ProductsEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      name,
      allowAddCoupon,
      available,
      description,
      expirationDate,
      idCategory,
      idTypeProduct,
      idUserOwner,
      labelPrice,
      positionOrder,
      price,
      status
    }) {
      const validationsProducts = validationsProductsService({
        name,
        idUserOwner,
        idCategory,
        idTypeProduct,
        description,
        price,
        allowAddCoupon,
        available
      });
      if (validationsProducts) {
        return validationsProducts;
      }
      const productExists = yield prisma_default.products.findFirst({
        where: {
          id
        }
      });
      const categoryExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idCategory
        }
      });
      const typesProductsExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idTypeProduct
        }
      });
      const userExists = yield prisma_default.typesProducts.findFirst({
        where: {
          id: idUserOwner
        }
      });
      if (!productExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse produto n\xE3o existe"
          }
        };
      }
      if (!categoryExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse categoria n\xE3o existe"
          }
        };
      }
      if (!typesProductsExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse tipo do produto n\xE3o existe"
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            status: 400,
            message: "N\xE3o foi poss\xEDvel prosseguir, esse usu\xE1rio n\xE3o existe"
          }
        };
      }
      try {
        yield prisma_default.products.update({
          where: {
            id
          },
          data: {
            name,
            allowAddCoupon: allowAddCoupon !== null ? allowAddCoupon : null,
            available: available !== null ? available : null,
            description,
            expirationDate: expirationDate ? expirationDate : null,
            idCategory,
            idTypeProduct,
            idUserOwner,
            labelPrice,
            positionOrder: positionOrder ? positionOrder : null,
            price: price ? price : null,
            status: status ? status : null
          }
        });
        return {
          data: {
            status: 200,
            message: "Atualiza\xE7\xE3o realizada com sucesso" /* UpdateMessageSuccess */
          }
        };
      } catch (err) {
        return {
          data: {
            status: 500,
            message: `${"Ocorreu um error durante a atualiza\xE7\xE3o" /* UpdateMessageError */} ${err}`
          }
        };
      }
    });
  }
};

// src/controllers/Products/productsEditController.ts
var ProductsEditController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id,
        idCategory,
        name,
        allowAddCoupon,
        available,
        description,
        expirationDate,
        idTypeProduct,
        labelPrice,
        positionOrder,
        price,
        status
      } = req.body;
      const idUserOwner = req.user_id;
      const productsEdit = new ProductsEditService();
      const responseProductsEdit = yield productsEdit.execute({
        id,
        idCategory,
        name,
        allowAddCoupon,
        available,
        description,
        expirationDate,
        idTypeProduct,
        idUserOwner,
        labelPrice,
        positionOrder,
        price,
        status
      });
      return res.status(responseProductsEdit.data.status).json(responseProductsEdit.data);
    });
  }
};

// src/services/Users/usersGetAllListService.ts
var UsersGetAllListService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id_user_logged,
      idOtherUser,
      name,
      companyName,
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
      status
    }) {
      const userExistsLogged = yield prisma_default.users.findFirst({
        where: { id: id_user_logged }
      });
      if (!userExistsLogged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar a a\xE7\xE3o, o usu\xE1rio respons\xE1vel n\xE3o foi encontrado.",
            status: 404
          }
        };
      }
      const responseValidation = validatorPermissions({
        typeAccess: userExistsLogged.typeAccess
      });
      if (!responseValidation) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para realizar esta a\xE7\xE3o.",
            status: 403
          }
        };
      }
      if (typeAccess && userExistsLogged.typeAccess === "client" /* User */ || userExistsLogged.typeAccess === "promoter" /* Promoter */) {
        return {
          data: {
            message: "Sua conta n\xE3o possui permiss\xE3o para buscar pelos par\xE2metros de tipo do usu\xE1rio",
            status: 403
          }
        };
      }
      const where = { id: { not: id_user_logged } };
      if (idOtherUser) where.id = { contains: idOtherUser, mode: "insensitive" };
      if (name) where.name = { contains: name, mode: "insensitive" };
      if (companyName) where.companyName = { contains: companyName, mode: "insensitive" };
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
      const users = yield prisma_default.users.findMany({
        where,
        orderBy: { created_At: "desc" },
        select: {
          id: true,
          name: true,
          companyName: true,
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
          typePerson: true,
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
          created_At: true
        }
      });
      const formattedUsers = users.map((user) => __spreadProps(__spreadValues({}, user), {
        cpfCnpj: user.typePerson === "PF" /* Fisic */ ? formatterCPF(user.cpfCnpj) : formatterCNPJ(user.cpfCnpj),
        cep: formatterCEP(user.cep),
        birthDate: user.birthDate ? formatterDateToIso(user.birthDate) : null
      }));
      return {
        data: {
          items: formattedUsers,
          status: 200
        },
        status: 200
      };
    });
  }
};

// src/controllers/Users/usersListUsersController.ts
var UsersGetAllListController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const idOtherUser = req.query.idOtherUser;
      const name = req.query.name;
      const companyName = req.query.companyName;
      const email = req.query.email;
      const cpfCnpj = req.query.cpfCnpj;
      const cep = req.query.cep;
      const phone = req.query.phone;
      const birthDate = req.query.birthDate;
      const residence = req.query.residence;
      const neighborhood = req.query.neighborhood;
      const address = req.query.address;
      const city = req.query.city;
      const gender = req.query.gender;
      const typeAccess = req.query.typeAccess;
      const status = req.query.status;
      const getListUsers = new UsersGetAllListService();
      const responseGetListUsers = yield getListUsers.execute(__spreadValues({
        id_user_logged,
        idOtherUser,
        name,
        companyName,
        email,
        cpfCnpj: cpfCnpj ? deformatter(cpfCnpj) : null,
        phone: phone ? deformatter(phone) : null,
        birthDate,
        residence,
        neighborhood,
        address,
        city,
        gender,
        typeAccess,
        cep: cep ? deformatter(cep) : null
      }, status !== null && { status: status !== "false" ? true : false }));
      return res.status(responseGetListUsers.data.status).json(responseGetListUsers.data);
    });
  }
};

// src/services/Users/PasswordRecover/recoverPasswordUserService.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));

// src/config/nodemailerConfig.ts
var import_nodemailer = __toESM(require("nodemailer"));
var transporter = ({ authEmail, authPassword }) => {
  var _a;
  return import_nodemailer.default.createTransport({
    host: (_a = process.env.SMTP_HOST_NODEMAILER) != null ? _a : "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: authEmail,
      pass: authPassword
    }
  });
};

// src/services/Users/PasswordRecover/recoverPasswordUserService.ts
var import_fs = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var RecoverPasswordService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email }) {
      if (!email) {
        return {
          data: {
            message: "Por favor informe seu email para prosseguir.",
            status: 400
          }
        };
      }
      if (!validatorEmail(email)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, E-mail inv\xE1lido.",
            status: 400
          }
        };
      }
      try {
        const userExists = yield prisma_default.users.findFirst({
          where: {
            email
          }
        });
        if (!userExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, E-mail do usu\xE1rio n\xE3o encontrado!",
              status: 404
            }
          };
        }
        const tokenRecoverPassword = import_jsonwebtoken3.default.sign(
          { userId: userExists.id },
          process.env.JWT_SECRET,
          { expiresIn: "30min" }
        );
        const resetLink = `${process.env.FRONTEND_URL}${process.env.LINK_REDEFINE_PASSWORD_URL}/${tokenRecoverPassword}`;
        const filePath = import_path2.default.join(__dirname, "../../../config/templates/templateRecoverPassword.html");
        let htmlContent = import_fs.default.readFileSync(filePath, "utf-8");
        htmlContent = htmlContent.replace("{{resetLink}}", resetLink).replace("{{userName}}", userExists.name.split(" ")[0]);
        const mailOptions = {
          from: `Suporte Up Point <${process.env.EMAIL_USER_RECOVERPASSWORD}>`,
          to: userExists.email,
          subject: "Redefini\xE7\xE3o de Senha",
          html: htmlContent,
          messageId: `<${Date.now()}-${Math.random().toString(36).slice(2)}>`,
          headers: { "X-Entity-Ref-ID": `${Date.now()}` }
        };
        yield transporter({
          authEmail: process.env.EMAIL_USER_RECOVERPASSWORD,
          authPassword: process.env.EMAIL_PASSWORD_RECOVERPASSWORD
        }).sendMail(mailOptions);
        return {
          data: {
            message: "E-mail de recupera\xE7\xE3o enviado, confira sua caixa de entrada.",
            status: 200
          }
        };
      } catch (err) {
        console.log(err);
        return {
          data: {
            err,
            message: "Erro ao enviar e-mail para recupera\xE7\xE3o de senha.",
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Users/PasswordRecover/recoverPasswordUserController.ts
var RecoverPasswordController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        email
      } = req.body;
      const recoverPassword = new RecoverPasswordService();
      const responseRecoverPassword = yield recoverPassword.execute({
        email
      });
      return res.status(responseRecoverPassword.data.status).json(responseRecoverPassword.data);
    });
  }
};

// src/services/Users/PasswordRecover/redefinePasswordUserService.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
var import_bcryptjs4 = require("bcryptjs");
var RedefinePasswordService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ tokenPassword, newPassword, confirmPassword }) {
      if (!tokenPassword) {
        return {
          data: {
            message: "Por favor informe o token de recupera\xE7\xE3o de senha enviado no seu email",
            status: 400
          }
        };
      }
      if (!newPassword) {
        return {
          data: {
            message: "Por favor informe sua nova senha para prosseguir.",
            status: 400
          }
        };
      }
      if (newPassword.length < 8) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a.",
            status: 400
          }
        };
      }
      if (newPassword.length > 14) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a. voc\xEA ultrapassou o limite de caracteres",
            status: 400
          }
        };
      }
      if (newPassword !== confirmPassword) {
        return {
          data: {
            message: "As credenciais informadas n\xE3o coincidem. Confirme a senha corretamente para continuar",
            status: 400
          }
        };
      }
      try {
        const decoded = import_jsonwebtoken4.default.verify(
          tokenPassword,
          process.env.JWT_SECRET
        );
        const { userId } = decoded;
        const userExists = yield prisma_default.users.findFirst({
          where: {
            id: userId
          }
        });
        if (!userExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, dados do token inv\xE1lidos.",
              status: 404
            }
          };
        }
        const newPasswordHash = yield (0, import_bcryptjs4.hash)(newPassword, 8);
        yield prisma_default.users.update({
          where: {
            id: userExists.id
          },
          data: {
            password: newPasswordHash
          }
        });
        return {
          data: {
            message: "Sua senha foi redefinida com sucesso",
            status: 200
          }
        };
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return {
            data: {
              message: "Link para redefini\xE7\xE3o de senha expirado (token).",
              status: 401
            }
          };
        }
        return {
          data: {
            message: "Erro ao redefinir senha",
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Users/PasswordRecover/redefinePasswordUserController.ts
var RedefinePasswordController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        tokenPassword,
        newPassword,
        confirmPassword
      } = req.body;
      const recoverPassword = new RedefinePasswordService();
      const responseRecoverPassword = yield recoverPassword.execute({
        tokenPassword,
        newPassword,
        confirmPassword
      });
      return res.status(responseRecoverPassword.data.status).json(responseRecoverPassword.data);
    });
  }
};

// src/services/Users/Permissions/allowAccessUserServices.ts
var AllowAccessUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      cpfCnpj,
      id_user_logged,
      typeAccess
    }) {
      if (!id_user_logged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor envie o id do respons\xE1vel pela altera\xE7\xE3o",
            status: 400
          }
        };
      }
      if (!cpfCnpj) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor envie o CPF ou CNPJ do usu\xE1rio.",
            status: 400
          }
        };
      }
      if (typeAccess !== "owner" /* Owner */ && typeAccess !== "developer" /* Developer */ && typeAccess !== "master" /* Master */ && typeAccess !== "admin" /* Admin */ && typeAccess !== "promoter" /* Promoter */ && typeAccess !== "client" /* User */) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, tipo de acesso n\xE3o reconhecido pelo sistema.",
            typesAccessAccepts: [
              "owner" /* Owner */,
              "developer" /* Developer */,
              "master" /* Master */,
              "admin" /* Admin */,
              "promoter" /* Promoter */,
              "client" /* User */
            ],
            status: 404
          }
        };
      }
      const userLoggedExists = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      const userExists = yield prisma_default.users.findFirst({
        where: {
          cpfCnpj
        }
      });
      if (!userLoggedExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, usu\xE1rio responsavel n\xE3o encontrado.",
            status: 400
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, usu\xE1rio n\xE3o encontrado.",
            status: 400
          }
        };
      }
      if ((userLoggedExists == null ? void 0 : userLoggedExists.typeAccess) !== "owner" /* Owner */ && (userLoggedExists == null ? void 0 : userLoggedExists.typeAccess) !== "developer" /* Developer */ && userLoggedExists.typeAccess !== "master" /* Master */) {
        return {
          data: {
            message: "Voc\xEA n\xE3o tem permiss\xE3o de autoriza\xE7\xE3o para esta a\xE7\xE3o.",
            status: 403
          }
        };
      }
      if (userExists.id === id_user_logged) {
        return {
          data: {
            message: "N\xE3o \xE9 poss\xEDvel alterar o pr\xF3prio tipo de acesso, para est\xE1 a\xE7\xE3o entre em contato com o suporte",
            status: 403
          }
        };
      }
      yield prisma_default.users.update({
        where: {
          id: userExists.id
        },
        data: {
          typeAccess: typeAccess ? typeAccess : "client" /* User */
        }
      });
      return {
        data: {
          message: "Permiss\xE3o de autoriza\xE7\xF5es alteradas com sucesso.",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/Permissions/allowAccessUserController.ts
var AllowAccessUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const {
        cpfCnpj,
        typeAccess
      } = req.body;
      const allowAccessUser = new AllowAccessUserService();
      const responseAllowAccessUser = yield allowAccessUser.execute({
        cpfCnpj,
        id_user_logged,
        typeAccess
      });
      return res.status(responseAllowAccessUser.data.status).json(responseAllowAccessUser.data);
    });
  }
};

// src/services/Users/Permissions/allowUpdateTutorialFirstAccessService.ts
var AllowUpdateTutorialFirstAccessService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id_user_logged,
      tutorialFirstAccess
    }) {
      if (!id_user_logged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor envie o id_user_logged do usu\xE1rio.",
            status: 400
          }
        };
      }
      const userLoggedExists = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      if (!userLoggedExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, usu\xE1rio respons\xE1vel n\xE3o encontrado.",
            status: 400
          }
        };
      }
      yield prisma_default.users.update({
        where: {
          id: id_user_logged
        },
        data: {
          tutorialFirstAccess
        }
      });
      return {
        data: {
          message: "Tutorial de primeiro acesso atualizado com sucesso.",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/Permissions/allowUpdateTutorialFirstAccessController.ts
var AllowUpdateTutorialFirstAccessController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const {
        tutorialFirstAccess
      } = req.body;
      const allowUpdateTutorialFirstAccess = new AllowUpdateTutorialFirstAccessService();
      const responseAllowUpdateTutorialFirstAccess = yield allowUpdateTutorialFirstAccess.execute({
        id_user_logged,
        tutorialFirstAccess
      });
      return res.status(responseAllowUpdateTutorialFirstAccess.data.status).json(responseAllowUpdateTutorialFirstAccess.data);
    });
  }
};

// src/services/Users/Permissions/allowUpdateTermsService.ts
var AllowUpdateTermsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id_user_logged,
      termsUsePlatform,
      termsUseLGPD,
      termsPrivacyPolicy,
      termsReceiptNews
    }) {
      if (!id_user_logged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor envie o id_user_logged do usu\xE1rio.",
            status: 400
          }
        };
      }
      const userLoggedExists = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      if (!userLoggedExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, usu\xE1rio respons\xE1vel n\xE3o encontrado.",
            status: 400
          }
        };
      }
      yield prisma_default.users.update({
        where: {
          id: id_user_logged
        },
        data: {
          termsPrivacyPolicy: termsPrivacyPolicy !== null ? termsPrivacyPolicy : userLoggedExists.termsPrivacyPolicy,
          termsUseLGPD: termsUseLGPD !== null ? termsUseLGPD : userLoggedExists.termsUseLGPD,
          termsUsePlatform: termsUsePlatform !== null ? termsUsePlatform : userLoggedExists.termsUsePlatform,
          termsReceiptNews: termsReceiptNews !== null ? termsReceiptNews : userLoggedExists.termsReceiptNews
        }
      });
      return {
        data: {
          message: "Termo(s) atualizado(s) com sucesso.",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/Permissions/allowUpdateTermsController.ts
var AllowUpdateTermsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const {
        termsUsePlatform,
        termsUseLGPD,
        termsPrivacyPolicy,
        termsReceiptNews
      } = req.body;
      const AllowUpdateTerms = new AllowUpdateTermsService();
      const responseAllowAccessUser = yield AllowUpdateTerms.execute({
        id_user_logged,
        termsUsePlatform,
        termsUseLGPD,
        termsPrivacyPolicy,
        termsReceiptNews
      });
      return res.status(responseAllowAccessUser.data.status).json(responseAllowAccessUser.data);
    });
  }
};

// src/services/Users/usersRegisterOtherService.ts
var import_bcryptjs5 = require("bcryptjs");
var import_cloudinary5 = require("cloudinary");
var import_uuid2 = require("uuid");
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
        const passwordHash = yield (0, import_bcryptjs5.hash)(password, 8);
        const dateRegisteredBy = /* @__PURE__ */ new Date();
        const idProfileAvatar = (0, import_uuid2.v6)();
        const resultFile = yield new Promise((resolve2, reject) => {
          import_cloudinary5.v2.uploader.upload_stream(
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
              resolve2(result);
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

// src/services/Bin/binDeleteItemsService.ts
var BinDeleteItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      if (!id) {
        return {
          data: {
            message: "Informe o ID do item na lixeira",
            status: 400
          }
        };
      }
      const itemBinExists = yield prisma_default.bin.findUnique({
        where: {
          id
        }
      });
      if (!itemBinExists) {
        return {
          message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, item n\xE3o encontrado na lixeira",
          status: 404
        };
      }
      try {
        yield prisma_default.bin.delete({
          where: { id }
        });
        return {
          message: "Item deletado permanentemente com sucesso",
          status: 200
        };
      } catch (err) {
        return {
          message: `${"Ocorreu um error durante a exclus\xE3o" /* DeleteMessageError */} ${err}`,
          status: 500
        };
      }
    });
  }
};

// src/controllers/Bin/binDeleteItemsController.ts
var BinDeleteItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id
      } = req.params;
      const binDeleteItemsService = new BinDeleteItemsService();
      const responseBinGetAllItemsService = yield binDeleteItemsService.execute({
        id
      });
      return res.status(responseBinGetAllItemsService.data.status).json(responseBinGetAllItemsService.data);
    });
  }
};

// src/services/Bin/binEditItemsService.ts
var BinEditItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner, tableName, data }) {
      if (!idUserOwner) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, Informe o ID do respons\xE1vel",
            status: 400
          }
        };
      }
      if (!id || !tableName) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, Informe o ID e o nome da tabela",
            status: 400
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const itemBinExists = yield prisma_default.$queryRawUnsafe(
        `SELECT * FROM ${tableName} WHERE id = '${id}'`
      );
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, usu\xE1rio n\xE3o existe",
            status: 400
          }
        };
      }
      if (!itemBinExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, item n\xE3o existe na lixeira",
            status: 400
          }
        };
      }
      try {
        yield prisma_default.bin.update({
          where: {
            id
          },
          data: {
            tableName,
            itemId: id,
            idUserOwner,
            data: JSON.stringify(data)
          }
        });
        return {
          data: {
            message: "Atualiza\xE7\xE3o realizada com sucesso" /* UpdateMessageSuccess */,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a atualiza\xE7\xE3o" /* UpdateMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Bin/binEditItemsController.ts
var BinEditItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id,
        idUserOwner,
        tableName,
        data
      } = req.body;
      const binEditItemsService = new BinEditItemsService();
      const responseBinGetAllItemsService = yield binEditItemsService.execute({
        id,
        idUserOwner,
        tableName,
        data
      });
      return res.status(responseBinGetAllItemsService.data.status).json(responseBinGetAllItemsService.data);
    });
  }
};

// src/controllers/Bin/binRegisterMoveItemsController.ts
var BinRegisterMoveItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const idUserLogged = req.user_id;
      const {
        id,
        tableName
      } = req.body;
      const binRegisterMoveItems = new BinRegisterMoveItemsService();
      const responseBinRegisterMoveItems = yield binRegisterMoveItems.execute({
        id,
        idUserOwner: idUserLogged,
        tableName
      });
      return res.status(responseBinRegisterMoveItems.data.status).json(responseBinRegisterMoveItems.data);
    });
  }
};

// src/services/Bin/binGetDetailsItemsService.ts
var BinGetDetailsItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner }) {
      const where = null;
      if (id) where.id = { contains: id, mode: "insensitive" };
      if (idUserOwner) where.idUserOwner = { contains: idUserOwner, mode: "insensitive" };
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const binExists = yield prisma_default.bin.findFirst({
        where
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, esse usu\xE1rio respons\xE1vel pelo item n\xE3o existe!",
            status: 404
          }
        };
      }
      if (!binExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, o item n\xE3o existe na lixeira!",
            status: 404
          }
        };
      }
      try {
        return {
          data: {
            items: binExists,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca pelo detalhamento" /* GetDetailsMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Bin/binGetDetailsItemsController.ts
var BinGetDetailsItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id = req.query.id;
      const idUserOwner = req.query.idUserOwner;
      const binGetDetailsItems = new BinGetDetailsItemsService();
      const responseBinGetDetailsItems = yield binGetDetailsItems.execute({
        id,
        idUserOwner
      });
      return res.status(responseBinGetDetailsItems.data.status).json(responseBinGetDetailsItems.data);
    });
  }
};

// src/services/Bin/binGetAllItemsService.ts
var BinGetAllItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      tableName,
      idUserOwner,
      page,
      limit
    }) {
      const where = null;
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, o usu\xE1rio n\xE3o existe",
            status: 403
          }
        };
      }
      if (idUserOwner !== userExists.id && (userExists.typeAccess === "client" /* User */ || userExists.typeAccess === "promoter" /* Promoter */ || userExists.typeAccess === "worker" /* Worker */)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, sua conta n\xE3o tem permiss\xE3o para realizar essa a\xE7\xE3o",
            status: 403
          }
        };
      }
      if (tableName) where.tableName = { contains: tableName, mode: "insensitive" };
      if (idUserOwner) where.idUserOwner = { contains: idUserOwner, mode: "insensitive" };
      const shouldPaginate = page !== void 0 || limit !== void 0;
      const skip = shouldPaginate ? (page != null ? page : 1) - 1 + (limit != null ? limit : 10) : void 0;
      const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
      try {
        const binItems = yield prisma_default.bin.findMany({
          where,
          skip,
          take,
          orderBy: { created_At: "desc" },
          select: {
            id: true,
            tableName: true,
            data: true,
            created_At: true,
            updated_At: true,
            itemId: true
          }
        });
        const binItemsCount = yield prisma_default.bin.count();
        const totalPages = shouldPaginate ? Math.ceil(binItemsCount / (limit != null ? limit : 10)) : 1;
        return {
          data: {
            items: binItems,
            totalItems: binItemsCount,
            totalPages,
            currentPage: shouldPaginate ? page != null ? page : 1 : 1,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca por todos os itens" /* GetAllMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Bin/binGetAllItemsController.ts
var BinGetAllItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { tableName, idUserOwner, page, limit } = req.body;
      const binGetAllItemsService = new BinGetAllItemsService();
      const responseBinGetAllItemsService = yield binGetAllItemsService.execute({
        idUserOwner,
        tableName,
        page: Number(page),
        limit: Number(limit)
      });
      return res.status(responseBinGetAllItemsService.data.status).json(responseBinGetAllItemsService.data);
    });
  }
};

// src/services/Bin/binRestoreItemsService.ts
var BinRestoreItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      if (!id) {
        return {
          message: "Informe o ID do item na lixeira",
          status: 400
        };
      }
      const itemBinExists = yield prisma_default.bin.findUnique({
        where: {
          id
        }
      });
      if (!itemBinExists) {
        return {
          message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, item n\xE3o encontrado na lixeira",
          status: 404
        };
      }
      try {
        yield prisma_default.$executeRawUnsafe(`
                INSERT INTO ${itemBinExists.tableName}(${Object.keys(itemBinExists.data).join(", ")})
                VALUES (${Object.values(itemBinExists.data).map((value) => `'${value}`).join(", ")})
                `);
        yield prisma_default.bin.delete({
          where: { id }
        });
        return {
          data: {
            message: "Item restaurado com sucesso",
            status: 200
          }
        };
      } catch (err) {
        return {
          message: `Ocorreu um erro na restaura\xE7\xE3o do item: ${err}`,
          status: 500
        };
      }
    });
  }
};

// src/controllers/Bin/binRestoreItemsController.ts
var BinRestoreItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        id
      } = req.params;
      const binRegisterMoveItems = new BinRestoreItemsService();
      const responseBinRegisterMoveItems = yield binRegisterMoveItems.execute({
        id
      });
      return res.status(responseBinRegisterMoveItems.data.status).json(responseBinRegisterMoveItems.data);
    });
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
var upload = (0, import_multer2.default)(multer_default.upload("./tmp"));
router.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "API dispon\xEDvel e online"
  });
});
router.post("/auth/login", new UsersLoginController().handle);
router.post("/auth/register", new UsersRegisterController().handle);
router.post("/auth/recoverpassword", new RecoverPasswordController().handle);
router.post("/auth/redefinepassword", new RedefinePasswordController().handle);
router.post("/users", new UsersRegisterOtherController().handle);
router.get("/users/list", isLogged, new UsersGetAllListController().handle);
router.get("/users/:id", isLogged, new UsersGetDetailsController().handle);
router.delete("/users/:id", isLogged, new UsersDeleteController().handle);
router.put("/users", isLogged, new UsersEditController().handle);
router.get("/users", isLogged, new UsersGetAllController().handle);
router.put("/users/permissions", isLogged, new AllowAccessUserController().handle);
router.put("/users/firstAcess", isLogged, new AllowUpdateTutorialFirstAccessController().handle);
router.put("/users/terms", isLogged, new AllowUpdateTermsController().handle);
router.post("/bin", isLogged, new BinRegisterMoveItemsController().handle);
router.get("/bin/:id", isLogged, new BinRestoreItemsController().handle);
router.put("/bin", isLogged, new BinEditItemsController().handle);
router.get("/bin", isLogged, new BinGetAllItemsController().handle);
router.get("/bin", isLogged, new BinGetDetailsItemsController().handle);
router.delete("/bin/:id", isLogged, new BinDeleteItemsController().handle);
router.post("/categories", isLogged, new CategoriesRegisterController().handle);
router.get("/categories", isLogged, new CategoriesGetAllController().handle);
router.get("/categories/:id", isLogged, new CategoriesGetDetailsController().handle);
router.put("/categories", isLogged, new CategoriesEditController().handle);
router.delete("/categories/:id", isLogged, new CategoriesDeleteController().handle);
router.post("/eventos", isLogged, new CadastrarEventoController().handle);
router.get("/eventos", isLogged, new ListarTodosEventosController().handle);
router.get("/eventos/:id", isLogged, new ListarEventoIdController().handle);
router.put("/eventos", isLogged, upload.single("bannerEvento"), new EditarEventoController().handle);
router.delete("/eventos/:id", isLogged, new DeletarEventoController().handle);
router.post("/produtos", isLogged, new ProductRegisterController().handle);
router.put("/produtos", isLogged, new ProductsEditController().handle);
router.get("/produtos", isLogged, new ProductGetAllController().handle);
router.get("/produtos/:id", isLogged, new ProductGetDetailsController().handle);
router.delete("/produtos/:id", isLogged, new ProductsDeleteController().handle);

// src/server.ts
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"));
var import_path3 = __toESM(require("path"));
var import_express_fileupload = __toESM(require("express-fileupload"));
var import_cloudinary6 = require("cloudinary");
var app = (0, import_express2.default)();
import_cloudinary6.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
app.use((0, import_cors.default)());
app.use((0, import_express_fileupload.default)({
  limits: {
    fileSize: 50 * 1024 * 1024
  }
}));
app.use(import_express2.default.json());
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      err: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "internal error server"
  });
});
app.use(router);
app.use(
  "/files",
  import_express2.default.static(import_path3.default.resolve(__dirname, "..", "tmp"))
);
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}, () => {
  console.log("Servidor Online");
});
//# sourceMappingURL=server.js.map