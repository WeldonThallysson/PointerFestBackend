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

// src/services/Categories/categoriesRegisterService.ts
var categoriesRegisterService_exports = {};
__export(categoriesRegisterService_exports, {
  CategoriesRegisterService: () => CategoriesRegisterService
});
module.exports = __toCommonJS(categoriesRegisterService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
        const resultFile = yield new Promise((resolve, reject) => {
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
            resolve(result);
          }).end(icon.data);
        });
        const resultThemeImageUrl = yield new Promise((resolve) => {
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
            resolve(result);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CategoriesRegisterService
});
//# sourceMappingURL=categoriesRegisterService.js.map