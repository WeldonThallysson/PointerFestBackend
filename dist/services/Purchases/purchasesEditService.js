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

// src/services/Purchases/purchasesEditService.ts
var purchasesEditService_exports = {};
__export(purchasesEditService_exports, {
  PurchasesEditService: () => PurchasesEditService
});
module.exports = __toCommonJS(purchasesEditService_exports);

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

// src/services/Purchases/purchasesEditService.ts
var PurchasesEditService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserLogged,
      typeMethodPayment,
      codeReferencePayment,
      codePayment,
      datePayment,
      products,
      totalPrice
    }) {
      if (!id || !typeMethodPayment || !codePayment || !codeReferencePayment || !datePayment || !products) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, as propriedades est\xE3o incorretas",
            fields: [
              "id",
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
        where: { id: idUserLogged }
      });
      const userLoggedExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserLogged
        }
      });
      const voucherExists = yield prisma_default.purchases.findFirst({
        where: {
          id
          //idUser: idUserLogged
        }
      });
      if (!voucherExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, esse voucher n\xE3o existe!.",
            status: 403
          }
        };
      }
      if (voucherExists.idUser === idUserLogged && (userLoggedExists == null ? void 0 : userLoggedExists.typeAccess) === "admin" /* Admin */) {
        return {
          data: {
            message: "Sua conta n\xE3o possui autoriza\xE7\xE3o para realizar esta a\xE7\xE3o, voc\xEA n\xE3o pode editar seu pr\xF3prio voucher, apenas contas master.",
            status: 403
          }
        };
      }
      if (!userLoggedExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com esta a\xE7\xE3o, o usu\xE1rio respons\xE1vel n\xE3o existe!.",
            status: 403
          }
        };
      }
      if (!userExists) {
        return {
          data: {
            message: "Usu\xE1rio n\xE3o cadastrado no sistema.",
            status: 403
          }
        };
      }
      if ((userLoggedExists == null ? void 0 : userLoggedExists.typeAccess) !== "owner" /* Owner */ && (userLoggedExists == null ? void 0 : userLoggedExists.typeAccess) !== "developer" /* Developer */ && (userLoggedExists == null ? void 0 : userLoggedExists.typeAccess) !== "master" /* Master */) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, sua conta n\xE3o possui permiss\xE3o para esta a\xE7\xE3o apenas contas master!",
            status: 404
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
      try {
        yield prisma_default.purchases.update({
          where: {
            id
          },
          data: {
            products: JSON.stringify(products),
            codePayment,
            codeReferencePayment,
            idUser: userExists.id,
            idMethodPayment: methodPaymentExists.id,
            datePayment: formatterDateToIso(datePayment),
            totalPrice: totalPrice ? totalPrice : voucherExists.totalPrice
          }
        });
        return {
          data: {
            message: "Atualiza\xE7\xE3o realizada com sucesso" /* UpdateMessageSuccess */,
            status: 201
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a atualiza\xE7\xE3o" /* UpdateMessageError */} ${err}`,
            error: err,
            status: 500
          }
        };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PurchasesEditService
});
//# sourceMappingURL=purchasesEditService.js.map