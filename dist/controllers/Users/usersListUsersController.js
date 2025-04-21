var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/controllers/Users/usersListUsersController.ts
var usersListUsersController_exports = {};
__export(usersListUsersController_exports, {
  UsersGetAllListController: () => UsersGetAllListController
});
module.exports = __toCommonJS(usersListUsersController_exports);

// src/utils/desformatter/index.ts
var deformatter = (item) => {
  return item.replace(/\D/g, "");
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

// src/utils/formatters/formatterCPF.ts
var formatterCPF = (cpf) => {
  const cleanedCPF = cpf.replace(/\D/g, "");
  const formattedCPF = cleanedCPF.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return formattedCPF;
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

// src/utils/validators/validatorPermissions.ts
var validatorPermissions = ({ typeAccess }) => {
  return typeAccess === "owner" /* Owner */ || typeAccess === "developer" /* Developer */ || typeAccess === "master" /* Master */ || typeAccess === "admin" /* Admin */;
};

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/formatters/formatterCNPJ.ts
var formatterCNPJ = (cnpj) => {
  const cleanedCNPJ = cnpj.replace(/\D/g, "");
  const formattedCNPJ = cleanedCNPJ.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d{2})$/, "$1-$2");
  return formattedCNPJ;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersGetAllListController
});
//# sourceMappingURL=usersListUsersController.js.map