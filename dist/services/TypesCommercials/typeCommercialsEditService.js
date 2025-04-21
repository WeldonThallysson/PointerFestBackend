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

// src/services/TypesCommercials/typeCommercialsEditService.ts
var typeCommercialsEditService_exports = {};
__export(typeCommercialsEditService_exports, {
  TypeCommercialsEditService: () => TypeCommercialsEditService
});
module.exports = __toCommonJS(typeCommercialsEditService_exports);

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

// src/services/TypesCommercials/typeCommercialsEditService.ts
var TypeCommercialsEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner,
      name,
      position,
      status
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id do tipo do comercial para prosseguir",
            status: 403
          }
        };
      }
      const validationsTypeCommercials = validationsTypeCommercialsService({
        idUserOwner,
        name,
        position
      });
      if (validationsTypeCommercials) {
        return validationsTypeCommercials;
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const typeCommercialExists = yield prisma_default.typesCommercials.findFirst({
        where: {
          id
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
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 403
          }
        };
      }
      try {
        yield prisma_default.typesCommercials.update({
          where: {
            id
          },
          data: {
            idUserOwner,
            name,
            position: position ? position : null,
            status: status ? status : null
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeCommercialsEditService
});
//# sourceMappingURL=typeCommercialsEditService.js.map