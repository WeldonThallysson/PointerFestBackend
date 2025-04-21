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

// src/controllers/Users/PasswordRecover/recoverPasswordUserController.ts
var recoverPasswordUserController_exports = {};
__export(recoverPasswordUserController_exports, {
  RecoverPasswordController: () => RecoverPasswordController
});
module.exports = __toCommonJS(recoverPasswordUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Users/PasswordRecover/recoverPasswordUserService.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/config/nodemailerConfig.ts
var import_nodemailer = __toESM(require("nodemailer"));
var transporter = ({ authEmail, authPassword }) => {
  var _a;
  return import_nodemailer.default.createTransport({
    host: (_a = process.env.SMTP_HOST_NODEMAILER) != null ? _a : "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: authEmail,
      pass: authPassword
    }
  });
};

// src/services/Users/PasswordRecover/recoverPasswordUserService.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));

// src/utils/validators/validatorEmail.ts
var validatorEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(value);
  return isEmail;
};

// src/services/Users/PasswordRecover/recoverPasswordUserService.ts
var RecoverPasswordService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email }) {
      if (!email) {
        return {
          data: {
            message: "Por favor informe seu email para prosseguir.",
            status: 400
          }
        };
      }
      if (!validatorEmail(email)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, E-mail inv\xE1lido.",
            status: 400
          }
        };
      }
      try {
        const userExists = yield prisma_default.users.findFirst({
          where: {
            email
          }
        });
        if (!userExists) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com a a\xE7\xE3o, E-mail do usu\xE1rio n\xE3o encontrado!",
              status: 404
            }
          };
        }
        const tokenRecoverPassword = import_jsonwebtoken.default.sign(
          { userId: userExists.id },
          process.env.JWT_SECRET,
          { expiresIn: "30min" }
        );
        const resetLink = `${process.env.FRONTEND_URL}${process.env.LINK_REDEFINE_PASSWORD_URL}/${tokenRecoverPassword}`;
        const filePath = import_path.default.join(__dirname, "../../../config/templates/templateRecoverPassword.html");
        let htmlContent = import_fs.default.readFileSync(filePath, "utf-8");
        htmlContent = htmlContent.replace("{{resetLink}}", resetLink).replace("{{userName}}", userExists.name.split(" ")[0]);
        const mailOptions = {
          from: `Suporte Up Point <${process.env.EMAIL_USER_RECOVERPASSWORD}>`,
          to: userExists.email,
          subject: "Redefini\xE7\xE3o de Senha",
          html: htmlContent,
          messageId: `<${Date.now()}-${Math.random().toString(36).slice(2)}>`,
          headers: { "X-Entity-Ref-ID": `${Date.now()}` }
        };
        yield transporter({
          authEmail: process.env.EMAIL_USER_RECOVERPASSWORD,
          authPassword: process.env.EMAIL_PASSWORD_RECOVERPASSWORD
        }).sendMail(mailOptions);
        return {
          data: {
            message: "E-mail de recupera\xE7\xE3o enviado, confira sua caixa de entrada.",
            status: 200
          }
        };
      } catch (err) {
        console.log(err);
        return {
          data: {
            err,
            message: "Erro ao enviar e-mail para recupera\xE7\xE3o de senha.",
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Users/PasswordRecover/recoverPasswordUserController.ts
var RecoverPasswordController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const {
        email
      } = req.body;
      const recoverPassword = new RecoverPasswordService();
      const responseRecoverPassword = yield recoverPassword.execute({
        email
      });
      return res.status(responseRecoverPassword.data.status).json(responseRecoverPassword.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecoverPasswordController
});
//# sourceMappingURL=recoverPasswordUserController.js.map