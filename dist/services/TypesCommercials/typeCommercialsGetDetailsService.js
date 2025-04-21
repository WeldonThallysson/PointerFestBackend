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

// src/services/TypesCommercials/typeCommercialsGetDetailsService.ts
var typeCommercialsGetDetailsService_exports = {};
__export(typeCommercialsGetDetailsService_exports, {
  TypeCommercialGetDetailsService: () => TypeCommercialGetDetailsService
});
module.exports = __toCommonJS(typeCommercialsGetDetailsService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/TypesCommercials/typeCommercialsGetDetailsService.ts
var TypeCommercialGetDetailsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner }) {
      try {
        if (!id) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id do tipo do comercial para prosseguir",
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
        const typeCommercialExists = yield prisma_default.typesCommercials.findFirst({
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
        if (!typeCommercialExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, esse tipo do comercial n\xE3o existe",
              status: 404
            }
          };
        }
        return {
          data: {
            item: typeCommercialExists,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeCommercialGetDetailsService
});
//# sourceMappingURL=typeCommercialsGetDetailsService.js.map