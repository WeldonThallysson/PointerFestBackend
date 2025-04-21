var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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

// src/controllers/Products/productsGetAllController.ts
var productsGetAllController_exports = {};
__export(productsGetAllController_exports, {
  ProductGetAllController: () => ProductGetAllController
});
module.exports = __toCommonJS(productsGetAllController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Products/productsGetAllService.ts
var ProductsGetAllService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      available,
      idTypeProduct,
      idUserLogged,
      idUserOwner,
      name,
      status,
      page,
      limit
    }) {
      const userIDSend = idUserLogged != null ? idUserLogged : idUserOwner;
      const userExists = yield prisma_default.users.findFirst({
        where: { id: idUserOwner != null ? idUserOwner : idUserLogged }
      });
      const typesProductsExists = yield prisma_default.products.findFirst({
        where: {
          id: idTypeProduct
        }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir, este usu\xE1rio n\xE3o existe!",
            status: 404
          }
        };
      }
      if (!typesProductsExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel prosseguir com est\xE1 a\xE7\xE3o, o tipo do produto n\xE3o existe!",
            status: 404
          }
        };
      }
      const where = {};
      if (name)
        where.id = {
          contains: name,
          mode: "insensitive"
        };
      if (userIDSend) {
        where.idUserOwner = {
          contains: userIDSend,
          mode: "insensitive"
        };
      }
      if (idTypeProduct)
        where.idTypeProduct = { contains: idTypeProduct, mode: "insensitive" };
      if (available)
        where.available = { contains: available, mode: "insensitive" };
      if (status !== null)
        where.status = {
          contains: status
        };
      try {
        const shouldPaginate = page !== void 0 || limit !== void 0;
        const skip = shouldPaginate ? ((page != null ? page : 1) - 1) * (limit != null ? limit : 10) : void 0;
        const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
        const products = yield prisma_default.products.findMany({
          where,
          skip,
          take
        });
        const totalProducts = yield prisma_default.products.count({ where });
        const totalPages = shouldPaginate ? Math.ceil(totalProducts / (limit != null ? limit : 10)) : 1;
        return {
          data: {
            items: products,
            totalItems: totalProducts,
            totalPages,
            currentPage: shouldPaginate ? page != null ? page : 1 : 1,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: "Ocorreu um error durante a busca por todos os itens" /* GetAllMessageError */,
            error: err == null ? void 0 : err.message,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Products/productsGetAllController.ts
var ProductGetAllController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const name = req.query.name;
      const page = req.query.page;
      const limit = req.query.limit;
      const idUserLogged = req.query.idUserLogged;
      const idUserOwner = req.query.idUserOwner;
      const idTypeProduct = req.query.idTypeProduct;
      const available = req.query.available;
      const status = req.query.status;
      const productGetAll = new ProductsGetAllService();
      const responseProductGetAll = yield productGetAll.execute(__spreadValues({
        available,
        idTypeProduct,
        idUserLogged,
        idUserOwner,
        limit: Number(limit),
        name,
        page: Number(page)
      }, status !== null && { status: status !== "false" ? true : false }));
      return res.status(responseProductGetAll.data.status).json(responseProductGetAll.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductGetAllController
});
//# sourceMappingURL=productsGetAllController.js.map