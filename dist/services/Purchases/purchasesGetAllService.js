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

// src/services/Purchases/purchasesGetAllService.ts
var purchasesGetAllService_exports = {};
__export(purchasesGetAllService_exports, {
  PurchasesGetAllService: () => PurchasesGetAllService
});
module.exports = __toCommonJS(purchasesGetAllService_exports);

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

// src/services/Purchases/purchasesGetAllService.ts
var PurchasesGetAllService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      idUserLogged,
      idOtherUser,
      idMethodPayment,
      codePayment,
      codeVoucher,
      datePayment,
      limit,
      page
    }) {
      const userExists = yield prisma_default.users.findFirst({
        where: { id: idUserLogged }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, usu\xE1rio responsavel n\xE3o existe",
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
            message: "Sua conta n\xE3o tem permiss\xE3o para buscar os vouchers de outro usu\xE1rio.",
            status: 403
          }
        };
      }
      const idUserToQuery = idOtherUser != null ? idOtherUser : idUserLogged;
      const where = { idUser: idUserToQuery };
      if (codeVoucher) where.id = {
        contains: codeVoucher,
        mode: "insensitive"
      };
      if (codePayment)
        where.codePayment = { contains: codePayment, mode: "insensitive" };
      if (datePayment)
        where.datePayment = { contains: datePayment, mode: "insensitive" };
      if (idMethodPayment)
        where.idMethodPayment = {
          contains: idMethodPayment
        };
      const shouldPaginate = page !== void 0 || limit !== void 0;
      const skip = shouldPaginate ? ((page != null ? page : 1) - 1) * (limit != null ? limit : 10) : void 0;
      const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
      try {
        const dataResponseVouchers = yield prisma_default.purchases.findMany({
          skip,
          take,
          where,
          orderBy: { created_At: "desc" },
          select: {
            id: true,
            idUser: true,
            idMethodPayment: true,
            methodsPayments: true,
            codePayment: true,
            codeReferencePayment: true,
            datePayment: true,
            totalPrice: true,
            status: true,
            products: true,
            created_At: true
          }
        });
        const dataFormated = dataResponseVouchers.map((item) => {
          return __spreadProps(__spreadValues({}, item), {
            products: typeof item.products === "string" ? JSON.parse(item.products) : item.products,
            datePayment: formatterDateToIso(item.datePayment)
          });
        });
        const totalPurchases = yield prisma_default.purchases.count({ where });
        const totalPages = shouldPaginate ? Math.ceil(totalPurchases / (limit != null ? limit : 10)) : 1;
        return {
          data: {
            items: dataFormated,
            totalItems: totalPurchases,
            totalPages,
            currentPage: shouldPaginate ? page != null ? page : 1 : 1,
            status: 200
          }
        };
      } catch (error) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca por todos os itens" /* GetAllMessageError */}`,
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
  PurchasesGetAllService
});
//# sourceMappingURL=purchasesGetAllService.js.map