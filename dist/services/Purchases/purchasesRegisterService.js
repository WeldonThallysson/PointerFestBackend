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

// src/services/Purchases/purchasesRegisterService.ts
var purchasesRegisterService_exports = {};
__export(purchasesRegisterService_exports, {
  RegisterVoucherService: () => RegisterVoucherService
});
module.exports = __toCommonJS(purchasesRegisterService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/utils/formatters/formatterDate.ts
var import_date_fns = require("date-fns");
var formatterDateToIso = (date) => {
  const dateObject = typeof date === "string" ? (0, import_date_fns.parseISO)(date) : date;
  const formattedBirthDate = (0, import_date_fns.format)(dateObject, "yyyy-MM-dd");
  return formattedBirthDate;
};

// src/utils/formatters/formatterToday.ts
var import_luxon = require("luxon");
var today = /* @__PURE__ */ new Date();
var todayFormatted = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Sao_Paulo"
  // Garante o horário do Brasil
}).format(today).split("/").reverse().join("-");
var todayWithTime = () => {
  const now = import_luxon.DateTime.now().setZone("America/Sao_Paulo");
  return now.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};

// src/services/Purchases/purchasesRegisterService.ts
var RegisterVoucherService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      cpfCnpj,
      typeMethodPayment,
      codeReferencePayment,
      codePayment,
      datePayment,
      products,
      totalPrice
    }) {
      if (!cpfCnpj || !typeMethodPayment || !codePayment || !codeReferencePayment || !datePayment || !products) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, as propriedades est\xE3o incorretas",
            fields: [
              "cpfUser",
              "typeMethodPayment",
              "codePayment",
              "codeReferencePayment",
              "datePayment",
              "products"
            ],
            status: 400
          }
        };
      }
      const userExists = yield prisma_default.users.findFirst({
        where: { cpfCnpj }
      });
      if (!userExists) {
        return {
          data: {
            message: "Usu\xE1rio n\xE3o cadastrado no sistema.",
            status: 403
          }
        };
      }
      let paymentMethod;
      switch (typeMethodPayment) {
        case "AVISTA" /* AVISTA */:
        case "avista" /* AVISTA */:
          paymentMethod = "avista";
          break;
        case "PIX" /* PIX */:
        case "pix" /* Pix */:
          paymentMethod = "pix";
          break;
        case "CREDIT_CARD" /* CREDIT_CARD */:
        case "credito" /* Credit */:
          paymentMethod = "credito";
          break;
        case "DEBIT_CARD" /* DEBIT_CARD */:
        case "debito" /* Debit */:
          paymentMethod = "debito";
          break;
        default:
          return {
            data: {
              message: "M\xE9todo de pagamento inv\xE1lido.",
              status: 400
            }
          };
      }
      const methodPaymentExists = yield prisma_default.methodsPayments.findFirst({
        where: { typeMethodPayment: paymentMethod }
      });
      if (!methodPaymentExists) {
        return {
          data: {
            message: "M\xE9todo de pagamento n\xE3o encontrado.",
            status: 404
          }
        };
      }
      const todayAt = todayWithTime();
      try {
        const responseVoucher = yield prisma_default.purchases.create({
          data: {
            products: JSON.stringify(products),
            codePayment,
            codeReferencePayment,
            idUser: userExists.id,
            idMethodPayment: methodPaymentExists.id,
            datePayment: formatterDateToIso(datePayment),
            totalPrice: totalPrice ? totalPrice : null,
            created_At: todayAt
          }
        });
        return {
          data: {
            message: "Cadastro realizado com sucesso" /* RegisterMessageSuccess */,
            id: responseVoucher.id,
            userId: userExists.id,
            status: 201
          }
        };
      } catch (error) {
        return {
          data: {
            message: `${"Ocorreu um error durante o cadastro" /* RegisterMessageError */} ${error}`,
            error: error == null ? void 0 : error.message,
            status: 500
          }
        };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterVoucherService
});
//# sourceMappingURL=purchasesRegisterService.js.map