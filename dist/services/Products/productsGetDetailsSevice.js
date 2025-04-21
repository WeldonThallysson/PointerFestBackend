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

// src/services/Products/productsGetDetailsSevice.ts
var productsGetDetailsSevice_exports = {};
__export(productsGetDetailsSevice_exports, {
  ProductsGetDetailsSevice: () => ProductsGetDetailsSevice
});
module.exports = __toCommonJS(productsGetDetailsSevice_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Products/productsGetDetailsSevice.ts
var ProductsGetDetailsSevice = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      id,
      idUserLogged,
      idUserOwner
    }) {
      const userIDSend = idUserLogged != null ? idUserLogged : idUserOwner;
      const products = yield prisma_default.products.findFirst({
        where: {
          id,
          idUserOwner: userIDSend
        }
      });
      if (!products) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, o produto n\xE3o existe!",
            status: 404
          }
        };
      }
      try {
        return {
          data: {
            items: products,
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
  ProductsGetDetailsSevice
});
//# sourceMappingURL=productsGetDetailsSevice.js.map