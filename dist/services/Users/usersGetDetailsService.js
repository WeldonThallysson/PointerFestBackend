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

// src/services/Users/usersGetDetailsService.ts
var usersGetDetailsService_exports = {};
__export(usersGetDetailsService_exports, {
  UsersGetDetailsService: () => UsersGetDetailsService
});
module.exports = __toCommonJS(usersGetDetailsService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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

// src/utils/formatters/formatterDate.ts
var import_date_fns = require("date-fns");
var formatterDateToIso = (date) => {
  const dateObject = typeof date === "string" ? (0, import_date_fns.parseISO)(date) : date;
  const formattedBirthDate = (0, import_date_fns.format)(dateObject, "yyyy-MM-dd");
  return formattedBirthDate;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersGetDetailsService
});
//# sourceMappingURL=usersGetDetailsService.js.map