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

// src/controllers/Users/Permissions/allowUpdateTutorialFirstAccessController.ts
var allowUpdateTutorialFirstAccessController_exports = {};
__export(allowUpdateTutorialFirstAccessController_exports, {
  AllowUpdateTutorialFirstAccessController: () => AllowUpdateTutorialFirstAccessController
});
module.exports = __toCommonJS(allowUpdateTutorialFirstAccessController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Users/Permissions/allowUpdateTutorialFirstAccessService.ts
var AllowUpdateTutorialFirstAccessService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id_user_logged,
      tutorialFirstAccess
    }) {
      if (!id_user_logged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, por favor envie o id_user_logged do usu\xE1rio.",
            status: 400
          }
        };
      }
      const userLoggedExists = yield prisma_default.users.findFirst({
        where: {
          id: id_user_logged
        }
      });
      if (!userLoggedExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, usu\xE1rio respons\xE1vel n\xE3o encontrado.",
            status: 400
          }
        };
      }
      yield prisma_default.users.update({
        where: {
          id: id_user_logged
        },
        data: {
          tutorialFirstAccess
        }
      });
      return {
        data: {
          message: "Tutorial de primeiro acesso atualizado com sucesso.",
          status: 200
        }
      };
    });
  }
};

// src/controllers/Users/Permissions/allowUpdateTutorialFirstAccessController.ts
var AllowUpdateTutorialFirstAccessController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id_user_logged = req.user_id;
      const {
        tutorialFirstAccess
      } = req.body;
      const allowUpdateTutorialFirstAccess = new AllowUpdateTutorialFirstAccessService();
      const responseAllowUpdateTutorialFirstAccess = yield allowUpdateTutorialFirstAccess.execute({
        id_user_logged,
        tutorialFirstAccess
      });
      return res.status(responseAllowUpdateTutorialFirstAccess.data.status).json(responseAllowUpdateTutorialFirstAccess.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllowUpdateTutorialFirstAccessController
});
//# sourceMappingURL=allowUpdateTutorialFirstAccessController.js.map