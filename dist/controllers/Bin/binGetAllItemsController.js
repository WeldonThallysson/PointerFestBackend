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

// src/controllers/Bin/binGetAllItemsController.ts
var binGetAllItemsController_exports = {};
__export(binGetAllItemsController_exports, {
  BinGetAllItemsController: () => BinGetAllItemsController
});
module.exports = __toCommonJS(binGetAllItemsController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Bin/binGetAllItemsService.ts
var BinGetAllItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      tableName,
      idUserOwner,
      page,
      limit
    }) {
      const where = null;
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, o usu\xE1rio n\xE3o existe",
            status: 403
          }
        };
      }
      if (idUserOwner !== userExists.id && (userExists.typeAccess === "client" /* User */ || userExists.typeAccess === "promoter" /* Promoter */ || userExists.typeAccess === "worker" /* Worker */)) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, sua conta n\xE3o tem permiss\xE3o para realizar essa a\xE7\xE3o",
            status: 403
          }
        };
      }
      if (tableName) where.tableName = { contains: tableName, mode: "insensitive" };
      if (idUserOwner) where.idUserOwner = { contains: idUserOwner, mode: "insensitive" };
      const shouldPaginate = page !== void 0 || limit !== void 0;
      const skip = shouldPaginate ? (page != null ? page : 1) - 1 + (limit != null ? limit : 10) : void 0;
      const take = shouldPaginate ? limit != null ? limit : 10 : void 0;
      try {
        const binItems = yield prisma_default.bin.findMany({
          where,
          skip,
          take,
          orderBy: { created_At: "desc" },
          select: {
            id: true,
            tableName: true,
            data: true,
            created_At: true,
            updated_At: true,
            itemId: true
          }
        });
        const binItemsCount = yield prisma_default.bin.count();
        const totalPages = shouldPaginate ? Math.ceil(binItemsCount / (limit != null ? limit : 10)) : 1;
        return {
          data: {
            items: binItems,
            totalItems: binItemsCount,
            totalPages,
            currentPage: shouldPaginate ? page != null ? page : 1 : 1,
            status: 200
          }
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

// src/controllers/Bin/binGetAllItemsController.ts
var BinGetAllItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { tableName, idUserOwner, page, limit } = req.body;
      const binGetAllItemsService = new BinGetAllItemsService();
      const responseBinGetAllItemsService = yield binGetAllItemsService.execute({
        idUserOwner,
        tableName,
        page: Number(page),
        limit: Number(limit)
      });
      return res.status(responseBinGetAllItemsService.data.status).json(responseBinGetAllItemsService.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinGetAllItemsController
});
//# sourceMappingURL=binGetAllItemsController.js.map