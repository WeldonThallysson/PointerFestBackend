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

// src/controllers/Bin/binGetDetailsItemsController.ts
var binGetDetailsItemsController_exports = {};
__export(binGetDetailsItemsController_exports, {
  BinGetDetailsItemsController: () => BinGetDetailsItemsController
});
module.exports = __toCommonJS(binGetDetailsItemsController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/Bin/binGetDetailsItemsService.ts
var BinGetDetailsItemsService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id, idUserOwner }) {
      const where = null;
      if (id) where.id = { contains: id, mode: "insensitive" };
      if (idUserOwner) where.idUserOwner = { contains: idUserOwner, mode: "insensitive" };
      const userExists = yield prisma_default.users.findFirst({
        where: {
          id: idUserOwner
        }
      });
      const binExists = yield prisma_default.bin.findFirst({
        where
      });
      if (!userExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, esse usu\xE1rio respons\xE1vel pelo item n\xE3o existe!",
            status: 404
          }
        };
      }
      if (!binExists) {
        return {
          data: {
            message: "N\xE3o foi poss\xEDvel realizar essa a\xE7\xE3o, o item n\xE3o existe na lixeira!",
            status: 404
          }
        };
      }
      try {
        return {
          data: {
            items: binExists,
            status: 200
          }
        };
      } catch (err) {
        return {
          data: {
            message: `${"Ocorreu um error durante a busca pelo detalhamento" /* GetDetailsMessageError */} ${err}`,
            status: 500
          }
        };
      }
    });
  }
};

// src/controllers/Bin/binGetDetailsItemsController.ts
var BinGetDetailsItemsController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const id = req.query.id;
      const idUserOwner = req.query.idUserOwner;
      const binGetDetailsItems = new BinGetDetailsItemsService();
      const responseBinGetDetailsItems = yield binGetDetailsItems.execute({
        id,
        idUserOwner
      });
      return res.status(responseBinGetDetailsItems.data.status).json(responseBinGetDetailsItems.data);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BinGetDetailsItemsController
});
//# sourceMappingURL=binGetDetailsItemsController.js.map