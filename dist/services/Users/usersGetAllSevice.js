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

// src/services/Users/usersGetAllSevice.ts
var usersGetAllSevice_exports = {};
__export(usersGetAllSevice_exports, {
  UsersGetAllService: () => UsersGetAllService
});
module.exports = __toCommonJS(usersGetAllSevice_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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

// src/utils/formatters/formatterCPF.ts
var formatterCPF = (cpf) => {
  const cleanedCPF = cpf.replace(/\D/g, "");
  const formattedCPF = cleanedCPF.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return formattedCPF;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersGetAllService
});
//# sourceMappingURL=usersGetAllSevice.js.map