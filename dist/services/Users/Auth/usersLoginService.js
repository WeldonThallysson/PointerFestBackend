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

// src/services/Users/Auth/usersLoginService.ts
var usersLoginService_exports = {};
__export(usersLoginService_exports, {
  UsersLoginService: () => UsersLoginService
});
module.exports = __toCommonJS(usersLoginService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Users/Auth/usersLoginService.ts
var import_bcryptjs = require("bcryptjs");
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
      const verifyPassword = yield (0, import_bcryptjs.compare)(password, users.password);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersLoginService
});
//# sourceMappingURL=usersLoginService.js.map