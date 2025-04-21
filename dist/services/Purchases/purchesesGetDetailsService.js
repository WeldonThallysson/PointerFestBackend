var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/services/Purchases/purchesesGetDetailsService.ts
var purchesesGetDetailsService_exports = {};
__export(purchesesGetDetailsService_exports, {
  GetDetailsVoucherService: () => GetDetailsVoucherService
});
module.exports = __toCommonJS(purchesesGetDetailsService_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetDetailsVoucherService
});
//# sourceMappingURL=purchesesGetDetailsService.js.map