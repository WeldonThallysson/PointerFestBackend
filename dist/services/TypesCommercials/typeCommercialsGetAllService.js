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

// src/services/TypesCommercials/typeCommercialsGetAllService.ts
var typeCommercialsGetAllService_exports = {};
__export(typeCommercialsGetAllService_exports, {
  TypeCommercialGetAllService: () => TypeCommercialGetAllService
});
module.exports = __toCommonJS(typeCommercialsGetAllService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/TypesCommercials/typeCommercialsGetAllService.ts
var TypeCommercialGetAllService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, position, page, limit }) {
      try {
        const where = "";
        if (name) where.name = { contains: name, mode: "insensitive" };
        if (position)
          where.description = { contains: position, mode: "insensitive" };
        const shouldPaginate = page !== void 0 || limit !== void 0;
        const skip = shouldPaginate ? ((page != null ? page : 1) - 1) * (limit != null ? limit : 10) : void 0;
        const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
        const typeCommercials = yield prisma_default.typesCommercials.findMany({
          where,
          skip,
          take,
          orderBy: { created_At: "desc" }
        });
        const totalTypeCommercials = yield prisma_default.typesCommercials.count();
        const totalPages = shouldPaginate ? Math.ceil(totalTypeCommercials / (limit != null ? limit : 10)) : 1;
        return {
          items: typeCommercials,
          totalItems: totalTypeCommercials,
          totalPages,
          currentPage: shouldPaginate ? page != null ? page : 1 : 1,
          status: 200
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca por todos os itens" /* GetAllMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeCommercialGetAllService
});
//# sourceMappingURL=typeCommercialsGetAllService.js.map