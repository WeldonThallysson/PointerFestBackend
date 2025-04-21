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

// src/services/Users/Permissions/allowAccessUserServices.ts
var allowAccessUserServices_exports = {};
__export(allowAccessUserServices_exports, {
  AllowAccessUserService: () => AllowAccessUserService
});
module.exports = __toCommonJS(allowAccessUserServices_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllowAccessUserService
});
//# sourceMappingURL=allowAccessUserServices.js.map