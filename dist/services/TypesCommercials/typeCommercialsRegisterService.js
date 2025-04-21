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

// src/services/TypesCommercials/typeCommercialsRegisterService.ts
var typeCommercialsRegisterService_exports = {};
__export(typeCommercialsRegisterService_exports, {
  TypeCommercialsRegisterService: () => TypeCommercialsRegisterService
});
module.exports = __toCommonJS(typeCommercialsRegisterService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/validationsServices/validationsTypeCommercials.ts
var validationsTypeCommercialsService = ({
  name,
  idUserOwner,
  position
}) => {
  if (!idUserOwner) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o id do usu\xE1rio respons\xE1vel",
        status: 400
      }
    };
  }
  if (!name) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome do tipo do comercial.",
        status: 400
      }
    };
  }
  if (!position) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor informe a possi\xE7\xE3o do tipo do comercial",
        status: 400
      }
    };
  }
};

// src/services/TypesCommercials/typeCommercialsRegisterService.ts
var TypeCommercialsRegisterService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      idUserOwner,
      name,
      position
    }) {
      const validationsCommercials = validationsTypeCommercialsService({
        idUserOwner,
        name,
        position
      });
      if (validationsCommercials) {
        return validationsCommercials;
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const typeCommercialExists = yield prisma_default.typesCommercials.findFirst({
        where: {
          name
        }
      });
      if (!typeCommercialExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, este tipo do comercial n\xE3o existe",
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
        yield prisma_default.typesCommercials.create({
          data: {
            idUserOwner,
            name,
            position: position ? position : null
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeCommercialsRegisterService
});
//# sourceMappingURL=typeCommercialsRegisterService.js.map