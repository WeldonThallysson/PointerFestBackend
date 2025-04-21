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

// src/services/Commercials/commercialsEditService.ts
var commercialsEditService_exports = {};
__export(commercialsEditService_exports, {
  CommercialsEditService: () => CommercialsEditService
});
module.exports = __toCommonJS(commercialsEditService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Commercials/commercialsEditService.ts
var import_cloudinary = require("cloudinary");

// src/utils/validationsServices/validationsCommercials.ts
var validationsCommercialsService = ({
  name,
  idUserOwner,
  urlImageCommercial,
  urlSocialMediaCommercial
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
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome do comercial.",
        status: 400
      }
    };
  }
  if (!urlImageCommercial) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor envie a sua imagem comercial.",
        status: 400
      }
    };
  }
  if (!urlSocialMediaCommercial) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor envie a sua url de midia para vinculo com comercial",
        status: 400
      }
    };
  }
};

// src/services/Commercials/commercialsEditService.ts
var CommercialsEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserOwner,
      name,
      description,
      positionOrder,
      idTypeCommercial,
      urlImageCommercial,
      urlSocialMediaCommercial,
      status
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, por favor envio o id do comercial para prosseguir",
            status: 403
          }
        };
      }
      const validationsCommercials = validationsCommercialsService({
        idUserOwner,
        name,
        urlImageCommercial,
        urlSocialMediaCommercial
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
          id: idTypeCommercial
        }
      });
      const commercialsExists = yield prisma_default.commercials.findFirst({
        where: {
          id
        }
      });
      if (status !== null && (userExists.typeAccess === "worker" /* Worker */ || userExists.typeAccess === "client" /* User */ || userExists.typeAccess === "promoter" /* Promoter */)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, voc\xEA n\xE3o tem permiss\xE3o para alterar o status do comercial",
            status: 403
          }
        };
      }
      if (!commercialsExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, este comercial n\xE3o existe",
            status: 403
          }
        };
      }
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
        const idUrlImageCommercial = commercialsExists.idUrlImageCommercial;
        const resultFile = yield new Promise(
          (resolve, reject) => {
            import_cloudinary.v2.uploader.upload_stream(
              {
                public_id: `commercials/${idUrlImageCommercial}`,
                overwrite: true,
                folder: "commercials"
              },
              (err, result) => {
                if (err) {
                  return {
                    data: {
                      message: err,
                      status: 500
                    }
                  };
                }
                resolve(result);
              }
            ).end(urlImageCommercial.data);
          }
        );
        yield prisma_default.commercials.update({
          where: {
            id
          },
          data: {
            idUserOwner,
            name,
            description: description ? description : null,
            idTypeCommercial: typeCommercialExists.id,
            positionOrder: positionOrder ? positionOrder : null,
            idUrlImageCommercial: idUrlImageCommercial ? idUrlImageCommercial : null,
            urlImageCommercial: resultFile.url ? resultFile.url : null,
            urlSocialMediaCommercial: resultFile ? resultFile.url : null
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
  CommercialsEditService
});
//# sourceMappingURL=commercialsEditService.js.map