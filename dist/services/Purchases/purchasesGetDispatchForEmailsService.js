var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/services/Purchases/purchasesGetDispatchForEmailsService.ts
var purchasesGetDispatchForEmailsService_exports = {};
__export(purchasesGetDispatchForEmailsService_exports, {
  GetDispatchVouchersForEmailsService: () => GetDispatchVouchersForEmailsService
});
module.exports = __toCommonJS(purchasesGetDispatchForEmailsService_exports);
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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

// src/utils/formatters/formatterDate.ts
var import_date_fns = require("date-fns");
var formatterDateToIso = (date) => {
  const dateObject = typeof date === "string" ? (0, import_date_fns.parseISO)(date) : date;
  const formattedBirthDate = (0, import_date_fns.format)(dateObject, "yyyy-MM-dd");
  return formattedBirthDate;
};
var formatterDateToString = (item) => {
  if (item) {
    const [year, month, day] = item.split("-");
    return `${day}/${month}/${year}`;
  }
  return null;
};

// src/utils/validators/validatorPermissions.ts
var validatorPermissions = ({ typeAccess }) => {
  return typeAccess === "owner" /* Owner */ || typeAccess === "developer" /* Developer */ || typeAccess === "master" /* Master */ || typeAccess === "admin" /* Admin */;
};

// src/services/Purchases/purchesesGetDetailsService.ts
var GetDetailsVoucherService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserLogged,
      idOtherUser
    }) {
      if (!id) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, id do voucher n\xE3o informado",
            status: 400
          }
        };
      }
      if (!idUserLogged) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, id do respons\xE1vel n\xE3o informado",
            status: 400
          }
        };
      }
      const voucherExists = yield prisma_default.purchases.findFirst({
        where: { id }
      });
      if (!voucherExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, o voucher n\xE3o foi emitido e n\xE3o existe.",
            status: 404
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: { id: idUserLogged }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, usu\xE1rio respons\xE1vel n\xE3o existe",
            status: 404
          }
        };
      }
      const responseValidation = validatorPermissions({
        typeAccess: userExists.typeAccess
      });
      if (idOtherUser && responseValidation === false) {
        return {
          data: {
            message: "Sua conta n\xE3o tem permiss\xE3o para buscar os detalhes do voucher de outro usu\xE1rio.",
            status: 403
          }
        };
      }
      const idUserToQuery = idOtherUser != null ? idOtherUser : idUserLogged;
      try {
        const dataResponseVoucher = yield prisma_default.purchases.findFirst({
          where: {
            id,
            idUser: idUserToQuery
          },
          select: {
            id: true,
            idUser: true,
            idMethodPayment: true,
            codePayment: true,
            methodsPayments: true,
            codeReferencePayment: true,
            datePayment: true,
            totalPrice: true,
            status: true,
            products: true,
            created_At: true
          }
        });
        if (!dataResponseVoucher) {
          return {
            data: {
              message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, essa compra n\xE3o existe!",
              status: 404
            }
          };
        }
        const dataDetailsVoucherFormated = __spreadProps(__spreadValues({}, dataResponseVoucher), {
          products: typeof (dataResponseVoucher == null ? void 0 : dataResponseVoucher.products) === "string" ? JSON.parse(dataResponseVoucher.products) : dataResponseVoucher.products,
          datePayment: formatterDateToIso(dataResponseVoucher.datePayment)
        });
        return {
          data: {
            items: {
              dataDetailsVoucherFormated
            },
            status: 200
          }
        };
      } catch (error) {
        return {
          data: {
            message: "Ocorreu um error durante a busca pelo detalhamento" /* GetDetailsMessageError */,
            error: error == null ? void 0 : error.message,
            status: 500
          }
        };
      }
    });
  }
};

// src/utils/formatters/formatterPrice.ts
var formatterCurrency = (value) => {
  if (value !== null && value !== void 0) {
    const currency = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value / 100);
    return currency;
  }
  return "R$ 0,00";
};

// src/utils/formatters/formatterCPF.ts
var formatterCPF = (cpf) => {
  const cleanedCPF = cpf.replace(/\D/g, "");
  const formattedCPF = cleanedCPF.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return formattedCPF;
};

// src/services/Purchases/purchasesGetDispatchForEmailsService.ts
var GetDispatchVouchersForEmailsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ idUserLogged, idVoucher, idOtherUser }) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
      if (!idVoucher || !idUserLogged) {
        return {
          data: {
            message: !idVoucher ? "N\xE3o foi poss\xEDvel prosseguir, o id do voucher n\xE3o foi informado." : "N\xE3o foi poss\xEDvel prosseguir, o id do respons\xE1vel n\xE3o foi informado.",
            status: 400
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserLogged
        }
      });
      const purchasesExists = yield prisma_default.purchases.findFirst({
        where: {
          id: idVoucher
          //idUser: idUserLogged
        }
      });
      if (!purchasesExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, o voucher da compra n\xE3o foi emitido e n\xE3o existe.",
            status: 404
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, o usu\xE1rio respons\xE1vel n\xE3o existe.",
            status: 404
          }
        };
      }
      const getDetailsVoucher = new GetDetailsVoucherService();
      const dataResponseDetailsVoucher = yield getDetailsVoucher.execute({
        id: idVoucher,
        idUserLogged,
        idOtherUser
      });
      const seeMyPurchasesLink = `${process.env.FRONTEND_URL}${process.env.LINK_SEE_MY_PURCHASES_URL}`;
      const templatePathClient = import_path.default.join(__dirname, "../../constants/templates/templateVoucherClient.html");
      const templatePathAdminResort = import_path.default.join(__dirname, "../../constants/templates/templateVoucherAdminResort.html");
      const readTemplate = (templatePath, replacements2) => {
        let content = import_fs.default.readFileSync(templatePath, "utf-8");
        for (const [key, value] of Object.entries(replacements2)) {
          if (value) content = content.replace(`{{${key}}}`, value);
        }
        return content;
      };
      const replacements = __spreadProps(__spreadValues({
        seeMyPurchasesLink,
        userName: userExists.name.split(" ")[0],
        idUser: userExists.id,
        name: userExists.name,
        methodPayment: dataResponseDetailsVoucher.data.items.dataDetailsVoucherFormated.methodsPayments.name
      }, userExists.typePerson === "PF" /* Fisic */ ? { cpf: formatterCPF(userExists.cpfCnpj) } : { cnpj: formatterCPF(userExists.cpfCnpj) }), {
        datePayment: formatterDateToString((_c = (_b = (_a = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _a.items) == null ? void 0 : _b.dataDetailsVoucherFormated) == null ? void 0 : _c.datePayment),
        totalPrice: formatterCurrency((_f = (_e = (_d = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _d.items) == null ? void 0 : _e.dataDetailsVoucherFormated) == null ? void 0 : _f.totalPrice),
        codeVoucher: (_i = (_h = (_g = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _g.items) == null ? void 0 : _h.dataDetailsVoucherFormated) == null ? void 0 : _i.id,
        codePayment: (_l = (_k = (_j = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _j.items) == null ? void 0 : _k.dataDetailsVoucherFormated) == null ? void 0 : _l.codePayment,
        codeReferencePayment: (_o = (_n = (_m = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _m.items) == null ? void 0 : _n.dataDetailsVoucherFormated) == null ? void 0 : _o.codeReferencePayment,
        products: typeof ((_r = (_q = (_p = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _p.items) == null ? void 0 : _q.dataDetailsVoucherFormated) == null ? void 0 : _r.products) === "string" ? JSON.parse((_u = (_t = (_s = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _s.items) == null ? void 0 : _t.dataDetailsVoucherFormated) == null ? void 0 : _u.products) : (_x = (_w = (_v = dataResponseDetailsVoucher == null ? void 0 : dataResponseDetailsVoucher.data) == null ? void 0 : _v.items) == null ? void 0 : _w.dataDetailsVoucherFormated) == null ? void 0 : _x.products
      });
      const htmlContentBuyClient = readTemplate(templatePathClient, replacements);
      const htmlContentResortAdmin = readTemplate(templatePathAdminResort, replacements);
      const mailOptions = [
        {
          from: `"Up Point" <${process.env.EMAIL_USER_PASSPORT}>`,
          to: userExists.email,
          subject: "\u{1F389} Parab\xE9ns pela compra! Confira seu comprovante!",
          html: htmlContentBuyClient,
          messageId: `<${Date.now()}-${Math.random().toString(36).slice(2)}>`,
          headers: { "X-Entity-Ref-ID": `${Date.now()}` }
        },
        {
          from: `"Up Point" <${process.env.EMAIL_USER_PASSPORT}>`,
          to: process.env.EMAIL_USER_PASSPORT,
          subject: `Confirma\xE7\xE3o de compra para o cliente ${userExists.name}`,
          html: htmlContentResortAdmin,
          messageId: `<${Date.now()}-${Math.random().toString(36).slice(2)}>`,
          headers: { "X-Entity-Ref-ID": `${Date.now()}` }
        }
      ];
      try {
        yield Promise.all(mailOptions.map((options) => transporter({
          authEmail: process.env.EMAIL_USER_PASSPORT,
          authPassword: process.env.EMAIL_PASSWORD_PASSPORT
        }).sendMail(options)));
        return {
          data: {
            message: "Email de confirma\xE7\xE3o de compra enviado para o cliente e o Up Point!",
            status: 200
          }
        };
      } catch (err) {
        console.error(err);
        return {
          data: {
            message: "Erro ao enviar email de confirma\xE7\xE3o de compra.",
            status: 500
          }
        };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetDispatchVouchersForEmailsService
});
//# sourceMappingURL=purchasesGetDispatchForEmailsService.js.map