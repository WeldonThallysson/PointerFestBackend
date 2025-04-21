var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/controllers/Users/PasswordRecover/redefinePasswordUserController.ts
var redefinePasswordUserController_exports = {};
__export(redefinePasswordUserController_exports, {
  RedefinePasswordController: () => RedefinePasswordController
});
module.exports = __toCommonJS(redefinePasswordUserController_exports);

// src/services/Users/PasswordRecover/redefinePasswordUserService.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Users/PasswordRecover/redefinePasswordUserService.ts
var import_bcryptjs = require("bcryptjs");
var RedefinePasswordService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ tokenPassword, newPassword, confirmPassword }) {
      if (!tokenPassword) {
        return {
          data: {
            message: "Por favor informe o token de recupera\xE7\xE3o de senha enviado no seu email",
            status: 400
          }
        };
      }
      if (!newPassword) {
        return {
          data: {
            message: "Por favor informe sua nova senha para prosseguir.",
            status: 400
          }
        };
      }
      if (newPassword.length < 8) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a.",
            status: 400
          }
        };
      }
      if (newPassword.length > 14) {
        return {
          data: {
            message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a. voc\xEA ultrapassou o limite de caracteres",
            status: 400
          }
        };
      }
      if (newPassword !== confirmPassword) {
        return {
          data: {
            message: "As credenciais informadas n\xE3o coincidem. Confirme a senha corretamente para continuar",
            status: 400
          }
        };
      }
      try {
        const decoded = import_jsonwebtoken.default.verify(
          tokenPassword,
          process.env.JWT_SECRET
        );
        const { userId } = decoded;
        const userExists = yield prisma_default.users.findFirst({
          where: {
            id: userId
          }
        });
        if (!userExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, dados do token inv\xE1lidos.",
              status: 404
            }
          };
        }
        const newPasswordHash = yield (0, import_bcryptjs.hash)(newPassword, 8);
        yield prisma_default.users.update({
          where: {
            id: userExists.id
          },
          data: {
            password: newPasswordHash
          }
        });
        return {
          data: {
            message: "Sua senha foi redefinida com sucesso",
            status: 200
          }
        };
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return {
            data: {
              message: "Link para redefini\xE7\xE3o de senha expirado (token).",
              status: 401
            }
          };
        }
        return {
          data: {
            message: "Erro ao redefinir senha",
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Users/PasswordRecover/redefinePasswordUserController.ts
var RedefinePasswordController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        tokenPassword,
        newPassword,
        confirmPassword
      } = req.body;
      const recoverPassword = new RedefinePasswordService();
      const responseRecoverPassword = yield recoverPassword.execute({
        tokenPassword,
        newPassword,
        confirmPassword
      });
      return res.status(responseRecoverPassword.data.status).json(responseRecoverPassword.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedefinePasswordController
});
//# sourceMappingURL=redefinePasswordUserController.js.map